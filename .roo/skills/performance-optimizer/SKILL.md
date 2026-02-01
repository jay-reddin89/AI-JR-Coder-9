---
name: performance-optimizer
description: Profile and optimize application performance including bundle analysis, memory profiling, and query optimization. Use when diagnosing slow applications, optimizing bundles, or fixing memory leaks.
---

# Performance Optimizer

Profile and optimize application performance across frontend, backend, and databases.

## When to use

- Analyzing JavaScript bundle sizes
- Profiling memory usage and detecting leaks
- Optimizing slow database queries
- Improving API response times
- Analyzing render performance in React/Vue apps
- Optimizing image loading and caching

## When NOT to use

- For functional debugging (use debug mode instead)
- For security audits (use security-auditor instead)
- For general coding (use code mode instead)

## Inputs required

- Application type (frontend/backend/full-stack)
- Performance issue description
- Bundle/build configuration files
- Database queries (if optimizing SQL)

## Workflow

1. **Identify bottlenecks**
   - Analyze bundle size (frontend)
   - Profile API response times (backend)
   - Check query execution plans (database)

2. **Measure current performance**
   - Use profiling tools
   - Record baseline metrics
   - Identify hotspots

3. **Implement optimizations**
   - Code splitting (frontend)
   - Caching strategies (backend)
   - Index optimization (database)

4. **Verify improvements**
   - Re-measure performance
   - Compare with baseline
   - Document gains

## Examples

### Analyzing bundle size

```bash
# Webpack Bundle Analyzer
npx webpack-bundle-analyzer dist/stats.json

# Vite Bundle Visualizer
npx vite-bundle-visualizer
```

### Profiling React performance

```javascript
// Use React DevTools Profiler
// Wrap components with Profiler API
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Component:', id);
  console.log('Render phase:', phase);
  console.log('Actual duration:', actualDuration);
}
```

### Database query optimization

```sql
-- Analyze query execution
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM users 
WHERE email = 'test@example.com';

-- Add index for frequently queried column
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
```

## Common Optimizations

- **Code splitting**: Lazy load routes and components
- **Memoization**: Use React.memo, useMemo, useCallback
- **Image optimization**: Use WebP, lazy loading, proper sizing
- **Caching**: Implement Redis caching for API responses
- **Database indexing**: Add indexes for WHERE/JOIN columns
- **CDN**: Serve static assets from CDN

## Files

- `references/performance_metrics.md` - Key performance metrics reference
- `scripts/bundle_analyzer.py` - Bundle size analysis script