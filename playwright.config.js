// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for visual regression testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './src/test',
  
  // Only run visual test files
  testMatch: /.*\.visual\.spec\.js$/,
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: 'html',
  
  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:3000',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Screenshot comparison options
    screenshot: 'only-on-failure',
    
    // Viewport settings
    viewport: { width: 1280, height: 720 },
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    // Mobile viewports
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Run local dev server before starting the tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  
  // Snapshot configuration for visual regression
  snapshotPathTemplate: '{testDir}/__snapshots__/{testFilePath}/{arg}{ext}',
  
  // Expect configuration for visual comparisons
  expect: {
    toHaveScreenshot: {
      // Maximum accepted pixel difference ratio (0.2%)
      maxDiffPixelRatio: 0.002,
      // Threshold for pixel comparison
      threshold: 0.2,
      // Animate screenshots
      animations: 'disabled',
    },
    timeout: 10000,
  },
});
