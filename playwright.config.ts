import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  timeout: 60 * 1000,
  retries: 0,
  testDir: 'tests/e2e',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10 * 1000,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  globalSetup: require.resolve('./globalSetup'),
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
      grepInvert: /@visual/,
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
      grepInvert: /@visual/,
    },
    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
      grepInvert: /@visual/,
    },
    {
      name: 'visual',
      use: {browserName: 'chromium', headless: false},
      grep: /@visual/,
    }
  ],
}

export default config
