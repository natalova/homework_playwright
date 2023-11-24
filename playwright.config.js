import path from 'path';

// @ts-check
const { defineConfig, devices } = require('@playwright/test');
export const STORAGE_STATE = path.join(__dirname, 'some_data/auth/user.json')

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './e2e',
  //timeout:15000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],
             ['list'],
             ['json', {outputFile: 'results-21-11.json'}]],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    viewport: { width: 1280, height: 720 },
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
       baseURL: 'https://www.guru99.com',
      //  baseURL: process.env.ENV_URL,
    //  baseURL: process.env.URL === '1' ? 'https://www.test.guru99.com' : 'https://www.guru99.com',
      //  locale:'de-DE',
       timezoneId: 'Europe/London',
      //  geolocation: { longitude: 12.492507, latitude: 41.889938  },
      //  permissions: ['geolocation'],

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'log_in',
      testMatch: 'login.setup.js'
    },
    
    {
      name: 'logged in',
      testMatch: 'newborn.spec.js',
      dependencies: ['log_in'],
      use: {storageState: STORAGE_STATE},
    },

    {
      name: 'chromium',
      // dependencies: ['log_in'],
      use: { ...devices['Desktop Chrome'],
      // storageState: STORAGE_STATE,
    },
      
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

