#!/usr/bin/env python3
"""
Dependency Vulnerability Scanner
Scans package.json and requirements.txt for known vulnerabilities
"""

import json
import subprocess
import sys
from pathlib import Path


def scan_npm_dependencies():
    """Scan Node.js dependencies using npm audit"""
    package_json = Path("package.json")
    if not package_json.exists():
        return None
    
    try:
        result = subprocess.run(
            ["npm", "audit", "--json"],
            capture_output=True,
            text=True
        )
        audit_data = json.loads(result.stdout)
        
        vulnerabilities = audit_data.get("vulnerabilities", {})
        summary = {
            "total": len(vulnerabilities),
            "critical": 0,
            "high": 0,
            "moderate": 0,
            "low": 0
        }
        
        for pkg, info in vulnerabilities.items():
            severity = info.get("severity", "low")
            summary[severity] = summary.get(severity, 0) + 1
        
        return summary
    except Exception as e:
        return {"error": str(e)}


def scan_python_dependencies():
    """Scan Python dependencies using pip-audit"""
    requirements = Path("requirements.txt")
    if not requirements.exists():
        return None
    
    try:
        result = subprocess.run(
            ["pip-audit", "--format=json"],
            capture_output=True,
            text=True
        )
        audit_data = json.loads(result.stdout)
        
        return {
            "total": len(audit_data.get("dependencies", [])),
            "vulnerable": len([d for d in audit_data.get("dependencies", []) 
                             if d.get("vulns")])
        }
    except Exception as e:
        return {"error": str(e)}


def check_for_secrets():
    """Check for common secrets patterns in code"""
    secret_patterns = [
        (r'password\s*=\s*["\'][^"\']+["\']', "Hardcoded password"),
        (r'api_key\s*=\s*["\'][^"\']+["\']', "Hardcoded API key"),
        (r'secret\s*=\s*["\'][^"\']+["\']', "Hardcoded secret"),
        (r'private_key', "Private key reference"),
    ]
    
    import re
    findings = []
    
    for pattern, description in secret_patterns:
        for file_path in Path(".").rglob("*"):
            if file_path.is_file() and file_path.suffix in ['.js', '.py', '.ts', '.env', '.yaml', '.yml']:
                try:
                    content = file_path.read_text()
                    matches = re.finditer(pattern, content, re.IGNORECASE)
                    for match in matches:
                        findings.append({
                            "file": str(file_path),
                            "description": description,
                            "line": content[:match.start()].count('\n') + 1
                        })
                except:
                    continue
    
    return findings


def main():
    print("Security Audit Report")
    print("=" * 50)
    
    # Scan npm dependencies
    npm_results = scan_npm_dependencies()
    if npm_results:
        print("\n📦 Node.js Dependencies:")
        if "error" in npm_results:
            print(f"  Error: {npm_results['error']}")
        else:
            print(f"  Total vulnerabilities: {npm_results.get('total', 0)}")
            print(f"  Critical: {npm_results.get('critical', 0)}")
            print(f"  High: {npm_results.get('high', 0)}")
            print(f"  Moderate: {npm_results.get('moderate', 0)}")
            print(f"  Low: {npm_results.get('low', 0)}")
    
    # Scan Python dependencies
    python_results = scan_python_dependencies()
    if python_results:
        print("\n🐍 Python Dependencies:")
        if "error" in python_results:
            print(f"  Error: {python_results['error']}")
        else:
            print(f"  Total packages: {python_results.get('total', 0)}")
            print(f"  Vulnerable: {python_results.get('vulnerable', 0)}")
    
    # Check for secrets
    secrets = check_for_secrets()
    if secrets:
        print("\n🔑 Potential Secrets Found:")
        for finding in secrets[:10]:  # Limit output
            print(f"  {finding['file']}:{finding['line']} - {finding['description']}")
        if len(secrets) > 10:
            print(f"  ... and {len(secrets) - 10} more")
    else:
        print("\n✅ No obvious secrets found")


if __name__ == "__main__":
    main()