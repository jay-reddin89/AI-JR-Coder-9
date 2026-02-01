// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Panel Components
 * 
 * These tests capture screenshots of panel components in various configurations
 * and compare them against baseline images to detect unintended visual changes.
 */

// ============================================
// Shared CSS for all tests
// ============================================
const sharedCSS = `
  :root {
    --spacing-none: 0;
    --spacing-small: 8px;
    --spacing-medium: 16px;
    --spacing-large: 24px;
    --panel-header-height: 48px;
    --panel-padding: 16px;
    --panel-border-radius: 12px;
    --panel-background: #f0f0f0;
    --bg-color: #e8e8e8;
    --bg-secondary: #f0f0f0;
    --text-color: #1a1a1a;
    --text-secondary: #666;
    --border-color: #d1d1d1;
    --neu-shadow-1: #c5c5c5;
    --neu-shadow-2: #ffffff;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  
  .panel {
    display: flex;
    flex-direction: column;
    background: var(--panel-background);
    border-radius: var(--panel-border-radius);
    overflow: hidden;
    box-shadow: 8px 8px 16px var(--neu-shadow-1), -8px -8px 16px var(--neu-shadow-2);
    flex: 1;
  }
  
  .panel__header {
    flex-shrink: 0;
    height: var(--panel-header-height);
    min-height: var(--panel-header-height);
    max-height: var(--panel-header-height);
    padding: 0 var(--panel-padding);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-color);
    box-sizing: border-box;
  }
  
  .panel__header-content {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }
  
  .panel__header-title {
    font-weight: 600;
    font-size: 14px;
    color: var(--text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
  }
  
  .panel__header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    margin-left: auto;
  }
  
  .panel__header-actions button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border: none;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.15s ease;
    font-size: 12px;
  }
  
  .panel__header-actions button:hover {
    background: var(--bg-secondary);
    color: var(--text-color);
  }
  
  .panel__body {
    flex: 1 1 auto;
    padding: var(--panel-padding);
    overflow-y: auto;
    min-height: 100px;
  }
  
  .panel__body--empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
  }
  
  .panel__empty-text {
    color: var(--text-secondary);
    font-style: italic;
    font-size: 14px;
    text-align: center;
  }
  
  .panel__footer {
    flex-shrink: 0;
    padding: calc(var(--panel-padding) / 2) var(--panel-padding);
    border-top: 1px solid var(--border-color);
    background: var(--bg-color);
    display: flex;
    align-items: center;
  }
  
  .panel-container {
    display: flex;
    width: 100%;
  }
  
  .panel-container--horizontal { flex-direction: row; }
  .panel-container--vertical { flex-direction: column; }
  .panel-container--gap-none { gap: var(--spacing-none); }
  .panel-container--gap-small { gap: var(--spacing-small); }
  .panel-container--gap-medium { gap: var(--spacing-medium); }
  .panel-container--gap-large { gap: var(--spacing-large); }
  .panel-container--width-auto { width: auto; }
  .panel-container--width-full { width: 100%; }
  .panel-container--align-start { align-items: flex-start; }
  .panel-container--align-center { align-items: center; }
  .panel-container--align-end { align-items: flex-end; }
  .panel-container--align-stretch { align-items: stretch; }
  
  /* Responsive styles */
  .panel-container--responsive {
    transition: flex-direction 300ms ease, gap 300ms ease, padding 300ms ease;
  }
  
  @media (max-width: 575px) {
    .panel-container--responsive {
      flex-direction: column !important;
    }
    .panel-container--responsive > .panel {
      width: 100%;
      flex: 1 1 auto;
    }
  }
`;

// ============================================
// PanelComponent Visual Tests
// ============================================
test.describe('PanelComponent Visual Regression', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.addStyleTag({ content: sharedCSS });
  });

  test('single panel with header, body, and footer', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8; min-height: 400px;">
        <div class="panel" data-testid="panel-component">
          <div class="panel__header" data-testid="panel-header">
            <div class="panel__header-content">
              <span class="panel__header-title" data-testid="panel-header-title">Panel Title</span>
            </div>
          </div>
          <div class="panel__body" data-testid="panel-body">
            <div>Body content goes here</div>
          </div>
          <div class="panel__footer" data-testid="panel-footer">
            <span>Footer content</span>
          </div>
        </div>
      </div>
    `);
    
    const panel = await page.locator('[data-testid="panel-component"]');
    await expect(panel).toHaveScreenshot('panel-complete.png');
  });

  test('panel without header', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8; min-height: 400px;">
        <div class="panel" data-testid="panel-component">
          <div class="panel__body" data-testid="panel-body">
            <div>Panel without header - only body content</div>
          </div>
          <div class="panel__footer" data-testid="panel-footer">
            <span>Footer content</span>
          </div>
        </div>
      </div>
    `);
    
    const panel = await page.locator('[data-testid="panel-component"]');
    await expect(panel).toHaveScreenshot('panel-no-header.png');
  });

  test('panel without footer', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8; min-height: 400px;">
        <div class="panel" data-testid="panel-component">
          <div class="panel__header" data-testid="panel-header">
            <div class="panel__header-content">
              <span class="panel__header-title" data-testid="panel-header-title">Panel Title</span>
            </div>
          </div>
          <div class="panel__body" data-testid="panel-body">
            <div>Panel without footer - header and body only</div>
          </div>
        </div>
      </div>
    `);
    
    const panel = await page.locator('[data-testid="panel-component"]');
    await expect(panel).toHaveScreenshot('panel-no-footer.png');
  });

  test('panel with header actions', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8; min-height: 400px;">
        <div class="panel" data-testid="panel-component">
          <div class="panel__header" data-testid="panel-header">
            <div class="panel__header-content">
              <span class="panel__header-title" data-testid="panel-header-title">Panel with Actions</span>
            </div>
            <div class="panel__header-actions" data-testid="panel-header-actions">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
          <div class="panel__body" data-testid="panel-body">
            <div>Panel with header actions</div>
          </div>
        </div>
      </div>
    `);
    
    const panel = await page.locator('[data-testid="panel-component"]');
    await expect(panel).toHaveScreenshot('panel-with-actions.png');
  });

  test('panel with multiple action buttons', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8; min-height: 400px;">
        <div class="panel" data-testid="panel-component">
          <div class="panel__header" data-testid="panel-header">
            <div class="panel__header-content">
              <span class="panel__header-title" data-testid="panel-header-title">Multiple Actions</span>
            </div>
            <div class="panel__header-actions" data-testid="panel-header-actions">
              <button>+</button>
              <button>Edit</button>
              <button>Share</button>
              <button>More...</button>
            </div>
          </div>
          <div class="panel__body" data-testid="panel-body">
            <div>Panel with multiple header actions</div>
          </div>
        </div>
      </div>
    `);
    
    const panel = await page.locator('[data-testid="panel-component"]');
    await expect(panel).toHaveScreenshot('panel-multiple-actions.png');
  });

  test('empty panel state', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8; min-height: 400px;">
        <div class="panel" data-testid="panel-component">
          <div class="panel__header" data-testid="panel-header">
            <div class="panel__header-content">
              <span class="panel__header-title" data-testid="panel-header-title">Empty Panel</span>
            </div>
          </div>
          <div class="panel__body panel__body--empty" data-testid="panel-body">
            <span class="panel__empty-text">No content provided</span>
          </div>
        </div>
      </div>
    `);
    
    const panel = await page.locator('[data-testid="panel-component"]');
    await expect(panel).toHaveScreenshot('panel-empty-state.png');
  });

  test('panel with long title - text truncation', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8; min-height: 400px; max-width: 400px;">
        <div class="panel" data-testid="panel-component">
          <div class="panel__header" data-testid="panel-header">
            <div class="panel__header-content">
              <span class="panel__header-title" data-testid="panel-header-title">This is a very long panel title that should be truncated with ellipsis</span>
            </div>
            <div class="panel__header-actions" data-testid="panel-header-actions">
              <button>Action</button>
            </div>
          </div>
          <div class="panel__body" data-testid="panel-body">
            <div>Panel with long title showing text truncation</div>
          </div>
        </div>
      </div>
    `);
    
    const panel = await page.locator('[data-testid="panel-component"]');
    await expect(panel).toHaveScreenshot('panel-long-title.png');
  });

  test('panel with long body content - scrolling', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8; min-height: 400px;">
        <div class="panel" data-testid="panel-component" style="max-height: 300px;">
          <div class="panel__header" data-testid="panel-header">
            <div class="panel__header-content">
              <span class="panel__header-title" data-testid="panel-header-title">Scrolling Content</span>
            </div>
          </div>
          <div class="panel__body" data-testid="panel-body" style="max-height: 200px; overflow-y: auto;">
            <p>This is paragraph 1 with some content.</p>
            <p>This is paragraph 2 with more content.</p>
            <p>This is paragraph 3 with additional content.</p>
            <p>This is paragraph 4 with extra content.</p>
            <p>This is paragraph 5 with further content.</p>
            <p>This is paragraph 6 with even more content.</p>
            <p>This is paragraph 7 with lots of content.</p>
            <p>This is paragraph 8 with plenty of content.</p>
            <p>This is paragraph 9 with abundant content.</p>
            <p>This is paragraph 10 with extensive content.</p>
          </div>
        </div>
      </div>
    `);
    
    const panel = await page.locator('[data-testid="panel-component"]');
    await expect(panel).toHaveScreenshot('panel-scrolling-content.png');
  });

  test('panel with custom styling', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8; min-height: 400px;">
        <div class="panel custom-panel" data-testid="panel-component" style="border: 2px solid #0010d9; box-shadow: 0 0 20px rgba(0, 16, 217, 0.3);">
          <div class="panel__header" data-testid="panel-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
            <div class="panel__header-content">
              <span class="panel__header-title" data-testid="panel-header-title" style="color: white;">Custom Styled Panel</span>
            </div>
          </div>
          <div class="panel__body" data-testid="panel-body">
            <div>Panel with custom styling applied</div>
          </div>
        </div>
      </div>
    `);
    
    const panel = await page.locator('[data-testid="panel-component"]');
    await expect(panel).toHaveScreenshot('panel-custom-styling.png');
  });
});

// ============================================
// PanelContainer Visual Tests
// ============================================
test.describe('PanelContainer Visual Regression', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.addStyleTag({ content: sharedCSS });
  });

  test('multiple panels in horizontal layout', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8;">
        <div class="panel-container panel-container--horizontal panel-container--gap-medium" data-testid="panel-container">
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel 1</span></div>
            <div class="panel__body">Content 1</div>
          </div>
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel 2</span></div>
            <div class="panel__body">Content 2</div>
          </div>
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel 3</span></div>
            <div class="panel__body">Content 3</div>
          </div>
        </div>
      </div>
    `);
    
    const container = await page.locator('[data-testid="panel-container"]');
    await expect(container).toHaveScreenshot('container-horizontal.png');
  });

  test('multiple panels in vertical layout', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8;">
        <div class="panel-container panel-container--vertical panel-container--gap-medium" data-testid="panel-container">
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel 1</span></div>
            <div class="panel__body">Content 1</div>
          </div>
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel 2</span></div>
            <div class="panel__body">Content 2</div>
          </div>
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel 3</span></div>
            <div class="panel__body">Content 3</div>
          </div>
        </div>
      </div>
    `);
    
    const container = await page.locator('[data-testid="panel-container"]');
    await expect(container).toHaveScreenshot('container-vertical.png');
  });

  test('gap size - none', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8;">
        <div class="panel-container panel-container--horizontal panel-container--gap-none" data-testid="panel-container">
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel A</span></div>
            <div class="panel__body">Content A</div>
          </div>
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel B</span></div>
            <div class="panel__body">Content B</div>
          </div>
        </div>
      </div>
    `);
    
    const container = await page.locator('[data-testid="panel-container"]');
    await expect(container).toHaveScreenshot('container-gap-none.png');
  });

  test('gap size - small', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8;">
        <div class="panel-container panel-container--horizontal panel-container--gap-small" data-testid="panel-container">
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel A</span></div>
            <div class="panel__body">Content A</div>
          </div>
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel B</span></div>
            <div class="panel__body">Content B</div>
          </div>
        </div>
      </div>
    `);
    
    const container = await page.locator('[data-testid="panel-container"]');
    await expect(container).toHaveScreenshot('container-gap-small.png');
  });

  test('gap size - medium', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8;">
        <div class="panel-container panel-container--horizontal panel-container--gap-medium" data-testid="panel-container">
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel A</span></div>
            <div class="panel__body">Content A</div>
          </div>
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel B</span></div>
            <div class="panel__body">Content B</div>
          </div>
        </div>
      </div>
    `);
    
    const container = await page.locator('[data-testid="panel-container"]');
    await expect(container).toHaveScreenshot('container-gap-medium.png');
  });

  test('gap size - large', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8;">
        <div class="panel-container panel-container--horizontal panel-container--gap-large" data-testid="panel-container">
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel A</span></div>
            <div class="panel__body">Content A</div>
          </div>
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Panel B</span></div>
            <div class="panel__body">Content B</div>
          </div>
        </div>
      </div>
    `);
    
    const container = await page.locator('[data-testid="panel-container"]');
    await expect(container).toHaveScreenshot('container-gap-large.png');
  });

  test('edge-to-edge panels - gap none', async ({ page }) => {
    await page.setContent(`
      <div style="background: #e8e8e8;">
        <div class="panel-container panel-container--horizontal panel-container--gap-none" data-testid="panel-container">
          <div class="panel" style="border-radius: 0;">
            <div class="panel__header" style="border-radius: 0;"><span class="panel__header-title">Edge Panel 1</span></div>
            <div class="panel__body">Content 1</div>
          </div>
          <div class="panel" style="border-radius: 0;">
            <div class="panel__header" style="border-radius: 0;"><span class="panel__header-title">Edge Panel 2</span></div>
            <div class="panel__body">Content 2</div>
          </div>
          <div class="panel" style="border-radius: 0;">
            <div class="panel__header" style="border-radius: 0;"><span class="panel__header-title">Edge Panel 3</span></div>
            <div class="panel__body">Content 3</div>
          </div>
        </div>
      </div>
    `);
    
    const container = await page.locator('[data-testid="panel-container"]');
    await expect(container).toHaveScreenshot('container-edge-to-edge.png');
  });

  test('nested panels', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8;">
        <div class="panel" data-testid="outer-panel">
          <div class="panel__header"><span class="panel__header-title">Outer Panel</span></div>
          <div class="panel__body">
            <div class="panel-container panel-container--vertical panel-container--gap-small">
              <div class="panel">
                <div class="panel__header"><span class="panel__header-title">Nested 1</span></div>
                <div class="panel__body">Nested content 1</div>
              </div>
              <div class="panel">
                <div class="panel__header"><span class="panel__header-title">Nested 2</span></div>
                <div class="panel__body">Nested content 2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
    
    const outerPanel = await page.locator('[data-testid="outer-panel"]');
    await expect(outerPanel).toHaveScreenshot('panel-nested.png');
  });

  test('complex nested layout', async ({ page }) => {
    await page.setContent(`
      <div style="padding: 20px; background: #e8e8e8;">
        <div class="panel-container panel-container--horizontal panel-container--gap-medium" data-testid="panel-container">
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Left Column</span></div>
            <div class="panel__body">
              <div class="panel-container panel-container--vertical panel-container--gap-small">
                <div class="panel">
                  <div class="panel__header"><span class="panel__header-title">Nested A</span></div>
                  <div class="panel__body">Content A</div>
                </div>
                <div class="panel">
                  <div class="panel__header"><span class="panel__header-title">Nested B</span></div>
                  <div class="panel__body">Content B</div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel">
            <div class="panel__header"><span class="panel__header-title">Right Column</span></div>
            <div class="panel__body">Simple content</div>
          </div>
        </div>
      </div>
    `);
    
    const container = await page.locator('[data-testid="panel-container"]');
    await expect(container).toHaveScreenshot('container-complex-nested.png');
  });
});

// ============================================
// Responsive Breakpoint Visual Tests
// ============================================
test.describe('Panel Responsive Breakpoints Visual Regression', () => {
  
  const breakpoints = [
    { name: 'mobile', width: 320, height: 568 },
    { name: 'small', width: 576, height: 768 },
    { name: 'medium', width: 768, height: 1024 },
    { name: 'large', width: 1024, height: 768 },
    { name: 'xlarge', width: 1440, height: 900 },
  ];

  test.beforeEach(async ({ page }) => {
    await page.addStyleTag({ content: sharedCSS });
  });

  for (const breakpoint of breakpoints) {
    test(`responsive PanelContainer at ${breakpoint.name} (${breakpoint.width}px)`, async ({ page }) => {
      // Set viewport size
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      
      await page.setContent(`
        <div style="padding: 20px; background: #e8e8e8;">
          <div class="panel-container panel-container--horizontal panel-container--gap-medium panel-container--responsive" data-testid="panel-container">
            <div class="panel">
              <div class="panel__header"><span class="panel__header-title">Panel 1</span></div>
              <div class="panel__body">Content 1</div>
            </div>
            <div class="panel">
              <div class="panel__header"><span class="panel__header-title">Panel 2</span></div>
              <div class="panel__body">Content 2</div>
            </div>
            <div class="panel">
              <div class="panel__header"><span class="panel__header-title">Panel 3</span></div>
              <div class="panel__body">Content 3</div>
            </div>
          </div>
        </div>
      `);
      
      const container = await page.locator('[data-testid="panel-container"]');
      await expect(container).toHaveScreenshot(`container-responsive-${breakpoint.name}.png`);
    });
  }

  for (const breakpoint of breakpoints) {
    test(`responsive single panel at ${breakpoint.name} (${breakpoint.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      
      await page.setContent(`
        <div style="padding: 20px; background: #e8e8e8;">
          <div class="panel" data-testid="panel-component">
            <div class="panel__header" data-testid="panel-header">
              <div class="panel__header-content">
                <span class="panel__header-title" data-testid="panel-header-title">Responsive Panel</span>
              </div>
              <div class="panel__header-actions" data-testid="panel-header-actions">
                <button>Action</button>
              </div>
            </div>
            <div class="panel__body" data-testid="panel-body">
              <div>Panel content that adapts to viewport</div>
            </div>
            <div class="panel__footer" data-testid="panel-footer">
              <span>Footer</span>
            </div>
          </div>
        </div>
      `);
      
      const panel = await page.locator('[data-testid="panel-component"]');
      await expect(panel).toHaveScreenshot(`panel-responsive-${breakpoint.name}.png`);
    });
  }
});

// ============================================
// Visual Test Utilities and Documentation
// ============================================
test.describe('Visual Test Documentation', () => {
  
  test('screenshot naming convention', async ({ page }) => {
    // This test documents the naming convention for screenshots
    const namingConvention = {
      panel: 'panel-{variant}.png',
      container: 'container-{layout}-{variant}.png',
      responsive: '{component}-responsive-{breakpoint}.png',
    };
    
    expect(namingConvention).toBeDefined();
  });

  test('baseline screenshot directory structure', async ({ page }) => {
    // This test documents the expected directory structure
    const directoryStructure = {
      base: 'src/test/__snapshots__/',
      browsers: ['chromium', 'firefox', 'webkit'],
      platforms: ['linux', 'darwin', 'win32'],
    };
    
    expect(directoryStructure).toBeDefined();
  });
});
