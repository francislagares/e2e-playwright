import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 40000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5000,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium', ...devices['Pixel 4'] },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Webkit',
      use: { browserName: 'webkit', ...devices['Pixel 4'] },
    },
  ],
  reporter: [
    [process.env.CI ? 'github' : 'list'],
    ['html', { outputFolder: './tests/**/reports', open: 'on-failure' }],
  ],
};

export default config;
