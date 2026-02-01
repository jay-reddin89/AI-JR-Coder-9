# Performance Metrics Reference

## Web Vitals (Core)

### Largest Contentful Paint (LCP)
- **Target**: < 2.5 seconds
- **Measures**: Loading performance
- **Optimization**: Optimize images, preload critical resources, improve server response time

### First Input Delay (FID) / Interaction to Next Paint (INP)
- **Target**: < 100ms (FID) / < 200ms (INP)
- **Measures**: Interactivity
- **Optimization**: Reduce JavaScript execution time, break up long tasks

### Cumulative Layout Shift (CLS)
- **Target**: < 0.1
- **Measures**: Visual stability
- **Optimization**: Set image dimensions, reserve space for dynamic content

## Frontend Metrics

### Time to First Byte (TTFB)
- **Target**: < 600ms
- **Measures**: Server response time

### First Contentful Paint (FCP)
- **Target**: < 1.8 seconds
- **Measures**: Time until first content appears

### Time to Interactive (TTI)
- **Target**: < 3.8 seconds
- **Measures**: Time until page is fully interactive

### Total Blocking Time (TBT)
- **Target**: < 200ms
- **Measures**: Time between FCP and TTI where main thread was blocked

## Bundle Size Guidelines

| Resource Type | Target Size |
|--------------|-------------|
| JavaScript (gzipped) | < 170KB |
| CSS (gzipped) | < 20KB |
| Images (per image) | < 100KB |
| Web Fonts | < 50KB total |

## Backend Metrics

### API Response Time
- **Target**: < 200ms (p50), < 500ms (p95)
- **Measures**: Server processing time

### Database Query Time
- **Target**: < 50ms for simple queries
- **Target**: < 200ms for complex queries

### Throughput
- **Target**: Handle expected peak load with < 70% CPU utilization

## Memory Usage

### Browser
- **Target**: < 100MB for typical web app
- **Watch for**: Memory leaks in SPAs

### Node.js Server
- **Target**: < 512MB for typical API server
- **Monitor**: Heap usage growth over time