---
name: security-auditor
description: Perform security audits, vulnerability scanning, and code security reviews. Use when auditing dependencies, reviewing code for security issues, or ensuring OWASP compliance.
---

# Security Auditor

Perform comprehensive security audits and vulnerability assessments.

## When to use

- Auditing npm/pip dependencies for vulnerabilities
- Reviewing code for security issues (SQL injection, XSS, etc.)
- Checking for OWASP Top 10 compliance
- Analyzing authentication and authorization implementations
- Reviewing API security configurations
- Scanning for secrets in code

## When NOT to use

- For general debugging (use debug mode instead)
- For performance optimization (use performance-optimizer instead)
- For API functional testing (use api-tester instead)

## Inputs required

- Codebase or specific files to audit
- Dependency manifest files (package.json, requirements.txt, etc.)
- Security requirements or compliance standards

## Workflow

1. **Dependency audit**
   - Run npm audit / pip-audit / similar
   - Identify vulnerable packages
   - Suggest updates or alternatives

2. **Static code analysis**
   - Scan for common vulnerabilities
   - Check for hardcoded secrets
   - Review input validation

3. **Security pattern review**
   - Authentication implementation
   - Authorization checks
   - Data sanitization
   - Error handling

4. **Generate report**
   - Document findings with severity
   - Provide remediation steps
   - Prioritize fixes

## Examples

### Running dependency audit

```bash
# Node.js
npm audit
npm audit fix

# Python
pip-audit

# Ruby
bundle audit
```

### Checking for secrets in code

```bash
# Using git-secrets
git secrets --scan

# Using truffleHog
trufflehog filesystem .
```

## Common Vulnerabilities to Check

- **Injection** (SQL, NoSQL, Command)
- **Broken Authentication**
- **Sensitive Data Exposure**
- **XML External Entities (XXE)**
- **Broken Access Control**
- **Security Misconfiguration**
- **Cross-Site Scripting (XSS)**
- **Insecure Deserialization**

## Files

- `references/owasp_top10.md` - OWASP Top 10 reference
- `scripts/dependency_scanner.py` - Dependency vulnerability scanner