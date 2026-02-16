import { test as base, expect } from '@playwright/test';

const test = base.extend({

  sharedData: [
    async ({}, use) => {
      const data = new Map();
      await use(data);
    },
    { scope: 'worker' },
  ],

  sharedBrowser: [
    async ({ browser }, use) => {
      const context = await browser.newContext();
      await use(context);
      await context.close();
    },
    { scope: 'worker' },
  ],

  sharedPage: [
    async ({ sharedBrowser }, use) => {
      const page = await sharedBrowser.newPage();
      await use(page);
      await page.close();
    },
    { scope: 'worker' },
  ],

});

export { test, expect };
