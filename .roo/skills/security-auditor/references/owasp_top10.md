# OWASP Top 10 (2021)

## A01:2021 - Broken Access Control
- Violation of least privilege
- Bypassing access control checks
- Insecure direct object references
- **Prevention**: Deny by default, validate server-side, use access control lists

## A02:2021 - Cryptographic Failures
- Weak encryption algorithms
- Hardcoded secrets
- Insufficient key management
- **Prevention**: Use strong algorithms, encrypt data at rest and in transit

## A03:2021 - Injection
- SQL, NoSQL, OS command injection
- LDAP injection
- **Prevention**: Parameterized queries, input validation, ORM usage

## A04:2021 - Insecure Design
- Missing security controls in design
- Business logic flaws
- **Prevention**: Threat modeling, secure design patterns

## A05:2021 - Security Misconfiguration
- Default configurations
- Incomplete configurations
- Verbose error messages
- **Prevention**: Harden configurations, minimal features, automated scanning

## A06:2021 - Vulnerable and Outdated Components
- Known vulnerabilities in dependencies
- Unsupported software versions
- **Prevention**: Dependency scanning, regular updates

## A07:2021 - Identification and Authentication Failures
- Weak password policies
- Session management issues
- Credential stuffing
- **Prevention**: Multi-factor auth, strong session management

## A08:2021 - Software and Data Integrity Failures
- Insecure deserialization
- Unsigned updates
- **Prevention**: Digital signatures, integrity checks

## A09:2021 - Security Logging and Monitoring Failures
- Insufficient logging
- No real-time monitoring
- **Prevention**: Comprehensive logging, real-time alerting

## A10:2021 - Server-Side Request Forgery (SSRF)
- Unauthorized requests from server
- Access to internal resources
- **Prevention**: URL validation, network segmentation