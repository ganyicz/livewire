import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 10000, // 10 seconds per test
  globalTimeout: 900000, // 15 minutes for the entire test run
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './playwright',

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 0 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 2 : undefined,

  // Reporter to use
  reporter: 'html',

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'http://127.0.0.1:3000',

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',

    locale: 'en-US', // Set browser locale

    timezoneId: 'America/New_York', // Set browser timezone
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Run your local dev server before starting the tests.
  webServer: {
    command: 'composer run serve',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
