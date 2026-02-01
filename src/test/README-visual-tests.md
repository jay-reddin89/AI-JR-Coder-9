# Panel Component Visual Regression Tests

This directory contains visual regression tests for the Panel components using Playwright.

## Overview

Visual regression tests capture screenshots of panel components in various configurations and compare them against baseline images to detect unintended visual changes.

## Test Files

- [`Panel.visual.spec.js`](Panel.visual.spec.js) - Main visual test specifications
- [`__snapshots__/`](__snapshots__/) - Baseline screenshot directory (auto-generated)

## Running Tests

### Prerequisites

Install Playwright browsers (one-time setup):

```bash
npx playwright install
```

### Run Visual Tests

```bash
# Run all visual tests
npm run test:visual

# Update baseline screenshots
npm run test:visual:update

# View HTML report
npm run test:visual:report
```

## Test Coverage

### PanelComponent Tests

| Test | Description | Screenshot Name |
|------|-------------|-----------------|
| `panel-complete` | Single panel with header, body, footer | `panel-complete.png` |
| `panel-no-header` | Panel without header | `panel-no-header.png` |
| `panel-no-footer` | Panel without footer | `panel-no-footer.png` |
| `panel-with-actions` | Panel with header actions | `panel-with-actions.png` |
| `panel-multiple-actions` | Panel with multiple action buttons | `panel-multiple-actions.png` |
| `panel-empty-state` | Empty panel state | `panel-empty-state.png` |
| `panel-long-title` | Panel with long title (text truncation) | `panel-long-title.png` |
| `panel-scrolling-content` | Panel with scrolling body content | `panel-scrolling-content.png` |
| `panel-custom-styling` | Panel with custom styling | `panel-custom-styling.png` |

### PanelContainer Tests

| Test | Description | Screenshot Name |
|------|-------------|-----------------|
| `container-horizontal` | Multiple panels in horizontal layout | `container-horizontal.png` |
| `container-vertical` | Multiple panels in vertical layout | `container-vertical.png` |
| `container-gap-none` | Gap size: none (edge-to-edge) | `container-gap-none.png` |
| `container-gap-small` | Gap size: small | `container-gap-small.png` |
| `container-gap-medium` | Gap size: medium | `container-gap-medium.png` |
| `container-gap-large` | Gap size: large | `container-gap-large.png` |
| `container-edge-to-edge` | Edge-to-edge panels | `container-edge-to-edge.png` |
| `panel-nested` | Nested panels | `panel-nested.png` |
| `container-complex-nested` | Complex nested layout | `container-complex-nested.png` |

### Responsive Breakpoint Tests

Tests are run at 5 breakpoints:

| Breakpoint | Width | Height | Screenshot Pattern |
|------------|-------|--------|-------------------|
| mobile | 320px | 568px | `*-responsive-mobile.png` |
| small | 576px | 768px | `*-responsive-small.png` |
| medium | 768px | 1024px | `*-responsive-medium.png` |
| large | 1024px | 768px | `*-responsive-large.png` |
| xlarge | 1440px | 900px | `*-responsive-xlarge.png` |

## Configuration

### Playwright Configuration

The [`playwright.config.js`](../../playwright.config.js) file contains:

- **Pixel difference threshold**: 0.2% (`maxDiffPixelRatio: 0.002`)
- **Screenshot comparison threshold**: 0.2
- **Browsers tested**: Chromium, Firefox, WebKit
- **Mobile viewports**: Pixel 5, iPhone 12

### Updating Snapshots

When intentional visual changes are made:

```bash
npm run test:visual:update
```

This will update all baseline screenshots to match the current component appearance.

## Snapshot Directory Structure

```
src/test/__snapshots__/
└── Panel.visual.spec.js/
    ├── panel-complete-chromium-linux.png
    ├── panel-complete-firefox-linux.png
    ├── panel-complete-webkit-linux.png
    ├── container-horizontal-chromium-linux.png
    └── ...
```

## Best Practices

1. **Always review visual diffs** before accepting changes
2. **Run tests in CI** to catch unintended visual regressions
3. **Update snapshots intentionally** using `--update-snapshots` flag
4. **Test across browsers** to ensure cross-browser consistency
5. **Use consistent viewport sizes** for reproducible results

## Troubleshooting

### Tests failing due to font rendering differences

Font rendering can vary between systems. The threshold is set to 0.2% to accommodate minor differences.

### Tests failing due to animations

Animations are disabled in visual tests via the `animations: 'disabled'` configuration.

### Tests failing in CI but passing locally

This can be due to:
- Different operating systems (Linux vs macOS/Windows)
- Different browser versions
- Font availability differences

Use the CI-specific snapshots or increase the threshold slightly if needed.
