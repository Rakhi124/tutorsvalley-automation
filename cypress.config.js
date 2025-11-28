const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://beta.tutorsvalley.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      // register allure
      allureWriter(on, config);
      return config;
    },

   viewportWidth: 1366,
    viewportHeight: 768,
    video: true,
    screenshotsFolder: 'cypress/screenshots',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'TutorsValley Automation Report',
      embeddedScreenshots: true,
      inlineAssets: true
    },

    webpackConfig: {
      resolve: {
        alias: {
          "@pages": "cypress/pages",
        },
      },
    },
  },

    env: {
      allureResultsPath: 'allure-results',
      allureReuseAfterSpec: true,
      adminUrl: 'https://staging.tutorsvalley.com/cryptlogger'
    },

    // Webpack alias
    webpackConfig: {
      resolve: {
        alias: {
          '@pages': 'cypress/pages'
        }
      }
    }
  }
)
