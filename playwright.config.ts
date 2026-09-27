import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end + accessibility tests run against the production build (`astro preview`).
 * Run `npm run build` first.
 *
 * Browsers: the locally installed Google Chrome and Microsoft Edge are used (Chrome/Edge on Windows),
 * plus Chrome with Android phone emulation. Safari/WebKit is not covered by this suite.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: 0,
  workers: 4,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npx astro preview --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321/he/',
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    { name: 'msedge', use: { ...devices['Desktop Edge'], channel: 'msedge' }, testIgnore: /keyboard|form|a11y-tree/ },
    { name: 'android-chrome', use: { ...devices['Pixel 7'], channel: 'chrome' }, testMatch: /a11y\.spec|responsive|form/ },
  ],
});
