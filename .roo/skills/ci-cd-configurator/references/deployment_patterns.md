# Deployment Patterns and Best Practices

## Deployment Strategies

### Blue-Green Deployment
- Run two identical production environments
- Switch traffic from blue to green
- Instant rollback capability
- **Best for**: Zero-downtime deployments

### Canary Deployment
- Deploy to small subset of users
- Gradually increase traffic
- Monitor for issues
- **Best for**: Risk mitigation

### Rolling Deployment
- Replace instances one by one
- Maintain capacity during deployment
- Slower but safer
- **Best for**: Stateful applications

## Environment Management

### Environment Types
- **Development**: Local development
- **Staging**: Pre-production testing
- **Production**: Live environment

### Configuration Management
- Use environment variables
- Separate secrets from config
- Version control environment configs

## Security Best Practices

### Secrets Management
- Never commit secrets to git
- Use platform secret stores
- Rotate secrets regularly
- Use least privilege access

### Access Control
- Restrict deployment permissions
- Use deployment keys
- Enable audit logging

## Monitoring and Rollback

### Health Checks
- Implement readiness probes
- Implement liveness probes
- Check dependencies health

### Rollback Procedures
- Keep previous version ready
- Automated rollback triggers
- Database migration rollback plans

## Platform-Specific Notes

### Vercel
- Automatic deployments from git
- Preview deployments for PRs
- Environment variables in dashboard

### AWS
- Use CodePipeline for orchestration
- S3 + CloudFront for static sites
- ECS/EKS for containers

### Netlify
- Git-based deployments
- Branch previews
- Build hooks for external triggers