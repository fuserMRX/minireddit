import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        video: false,
        screenshotOnRunFailure: false,
        screenshotsFolder: 'cypress/screenshots',
        testIsolation: false,
        experimentalRunAllSpecs: true,
        experimentalModifyObstructiveThirdPartyCode: true,
        experimentalCspAllowList: true,
        setupNodeEvents(on, config) {
            on('before:browser:launch', (browser, launchOptions) => {
                if (browser.name === 'chrome' || browser.name === 'chromium') {
                    launchOptions.args.push('--disable-dev-shm-usage');
                }
                return launchOptions;
            });

            return config;
        },
    },
    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
        viewportWidth: 1280,
        viewportHeight: 720,
        specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
        video: false,
        screenshotOnRunFailure: false,
        screenshotsFolder: false,
    },
});
