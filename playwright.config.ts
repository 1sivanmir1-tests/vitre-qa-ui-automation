import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Run tests sequentially for demo visibility
  fullyParallel: false,
  workers: 1,

  forbidOnly: !!process.env.CI,
  retries: 1,

  reporter: [['html', { open: 'always' }]],

  use: {
    headless: false,
    launchOptions: {
      slowMo: 300,
    },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'edge',
      // Run only tests tagged with @sanity
      grep: /@sanity/,
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },
  ],
});
