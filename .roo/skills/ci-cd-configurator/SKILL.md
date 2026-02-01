---
name: ci-cd-configurator
description: Configure CI/CD pipelines, GitHub Actions, deployment scripts, and infrastructure automation. Use when setting up continuous integration, deployment workflows, or environment configurations.
---

# CI/CD Configurator

Set up and configure continuous integration and deployment pipelines.

## When to use

- Setting up GitHub Actions workflows
- Configuring deployment pipelines
- Setting up automated testing in CI
- Configuring environment variables and secrets
- Setting up Docker containerization
- Configuring infrastructure as code (Terraform, CloudFormation)

## When NOT to use

- For application code development (use code mode instead)
- For debugging build issues (use debug mode instead)
- For security audits (use security-auditor instead)

## Inputs required

- Repository platform (GitHub, GitLab, etc.)
- Deployment target (AWS, Vercel, Netlify, etc.)
- Build/test requirements
- Environment configuration needs

## Workflow

1. **Analyze requirements**
   - Identify build steps needed
   - Determine test requirements
   - Define deployment stages

2. **Create CI configuration**
   - Set up workflow triggers
   - Configure build steps
   - Add test execution

3. **Configure deployment**
   - Set up deployment targets
   - Configure environment variables
   - Add rollback procedures

4. **Add automation**
   - Automated testing
   - Security scanning
   - Notifications

## Examples

### Basic GitHub Actions workflow

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
```

### Docker configuration

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

## Common Patterns

- **Matrix builds**: Test across multiple Node.js versions
- **Caching**: Cache dependencies for faster builds
- **Artifacts**: Store build outputs
- **Secrets**: Use repository secrets for sensitive data
- **Environments**: Separate staging and production deployments

## Files

- `assets/github_action_template.yml` - GitHub Actions workflow template
- `references/deployment_patterns.md` - Deployment best practices