import { defineConfig } from 'cypress';
import { resolve } from 'path';
import webpackPreprocessor from '@cypress/webpack-preprocessor';

export default defineConfig({
    e2e: {
        baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        video: false,
        screenshotOnRunFailure: false,
        screenshotsFolder: false,
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

            // @cypress/webpack-preprocessor for handling @ imports
            on(
                'file:preprocessor',
                webpackPreprocessor({
                    webpackOptions: {
                        resolve: {
                            alias: {
                                '@': resolve(__dirname, './'),
                            },
                        },
                    },
                })
            );

            return config;
        },
    },
    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
            // @cypress/webpack-preprocessor for handling @ imports
            webpackConfig: {
                resolve: {
                    alias: {
                        '@': resolve(__dirname, './'),
                    },
                },
            },
        },
        viewportWidth: 1280,
        viewportHeight: 720,
        specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
        video: false,
        screenshotOnRunFailure: false,
        screenshotsFolder: false,
    },
});
