#!/usr/bin/env python3
"""
Bundle Size Analyzer
Analyzes JavaScript bundle composition and identifies optimization opportunities
"""

import json
import os
from pathlib import Path
from collections import defaultdict


def analyze_webpack_stats(stats_path="dist/stats.json"):
    """Analyze webpack bundle stats"""
    if not Path(stats_path).exists():
        return None
    
    with open(stats_path) as f:
        stats = json.load(f)
    
    assets = stats.get("assets", [])
    chunks = stats.get("chunks", [])
    modules = stats.get("modules", [])
    
    analysis = {
        "total_size": sum(a.get("size", 0) for a in assets),
        "assets": [],
        "large_modules": [],
        "duplicate_modules": []
    }
    
    # Analyze assets
    for asset in assets:
        analysis["assets"].append({
            "name": asset.get("name"),
            "size": asset.get("size"),
            "size_mb": round(asset.get("size", 0) / (1024 * 1024), 2)
        })
    
    # Find large modules (>100KB)
    for module in modules:
        size = module.get("size", 0)
        if size > 100 * 1024:
            analysis["large_modules"].append({
                "name": module.get("name", "unknown"),
                "size": size,
                "size_kb": round(size / 1024, 2)
            })
    
    # Sort by size
    analysis["large_modules"].sort(key=lambda x: x["size"], reverse=True)
    
    return analysis


def analyze_package_json():
    """Analyze package.json for heavy dependencies"""
    if not Path("package.json").exists():
        return None
    
    with open("package.json") as f:
        package = json.load(f)
    
    dependencies = {
        **package.get("dependencies", {}),
        **package.get("devDependencies", {})
    }
    
    # Known heavy packages
    heavy_packages = {
        "lodash": "Consider using lodash-es or specific imports",
        "moment": "Consider using date-fns or dayjs",
        "jquery": "Consider vanilla JS alternatives",
        "bootstrap": "Consider Tailwind CSS or custom CSS",
        "@material-ui/core": "Consider @mui/material (v5+)",
        "@mui/material": "Use tree-shaking with named imports"
    }
    
    findings = []
    for dep in dependencies:
        if dep in heavy_packages:
            findings.append({
                "package": dep,
                "suggestion": heavy_packages[dep]
            })
    
    return findings


def check_code_splitting():
    """Check for code splitting opportunities"""
    findings = []
    
    # Check for large route files
    src_dir = Path("src")
    if src_dir.exists():
        for file in src_dir.rglob("*.js"):
            if file.stat().st_size > 50 * 1024:  # >50KB
                findings.append({
                    "file": str(file),
                    "size_kb": round(file.stat().st_size / 1024, 2),
                    "suggestion": "Consider lazy loading this component"
                })
    
    return findings


def print_report():
    """Generate and print performance report"""
    print("Bundle Performance Analysis")
    print("=" * 50)
    
    # Webpack stats
    stats = analyze_webpack_stats()
    if stats:
        print(f"\n📦 Total Bundle Size: {round(stats['total_size'] / (1024 * 1024), 2)} MB")
        print("\nAssets:")
        for asset in stats["assets"][:5]:
            print(f"  {asset['name']}: {asset['size_mb']} MB")
        
        if stats["large_modules"]:
            print("\n⚠️  Large Modules:")
            for mod in stats["large_modules"][:5]:
                print(f"  {mod['name']}: {mod['size_kb']} KB")
    
    # Package analysis
    packages = analyze_package_json()
    if packages:
        print("\n📋 Dependency Optimization Suggestions:")
        for pkg in packages:
            print(f"  {pkg['package']}: {pkg['suggestion']}")
    
    # Code splitting
    splitting = check_code_splitting()
    if splitting:
        print("\n🔀 Code Splitting Opportunities:")
        for item in splitting[:5]:
            print(f"  {item['file']}: {item['size_kb']} KB - {item['suggestion']}")
    
    print("\n💡 General Recommendations:")
    print("  - Enable gzip/brotli compression on server")
    print("  - Use tree-shaking for ES modules")
    print("  - Implement lazy loading for routes")
    print("  - Optimize images (WebP, responsive)")
    print("  - Use CDN for static assets")


if __name__ == "__main__":
    print_report()