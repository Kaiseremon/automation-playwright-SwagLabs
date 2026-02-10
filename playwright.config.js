// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/specs',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 1,
  timeout :  30 * 1000,
  expect  : {timeout: 5000},
  reporter: [['html'], ['allure-playwright']],
  use: {
    baseURL   : 'https://www.saucedemo.com/',
    trace     : 'on-first-retry',
    screenshot: "only-on-failure", 
    video     : "retain-on-failure"
  },
  fullyParallel: true,
  //workers: process.env.CI ? 1 : undefined,
  workers: process.env.CI ? 1 : 1,
  projects: [
    {name: 'Chromium', use: { browserName: 'chromium' },},
    //{name: 'Firefox', use: { browserName: 'firefox' },},
    //{name: 'webkit', use: { ...devices['Desktop Safari'] },},

    //{ name: 'chromium', use: { ...devices['Desktop Chrome'] },},
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] },},
    /* Test against mobile viewports. */
    // {name: 'Mobile Chrome', use: { ...devices['Pixel 5'] },},
    // {name: 'Mobile Safari', use: { ...devices['iPhone 12'] },},
    /* Test against branded browsers. */
    // {name: 'Microsoft Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' },},
    // {name: 'Google Chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' },},
  ],
  /* Run your local dev server before starting the tests */
  //webServer: { command: 'npm run start', url: 'http://localhost:3000', reuseExistingServer: !process.env.CI,},
});

