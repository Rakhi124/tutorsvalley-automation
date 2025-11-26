const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://beta.tutorsvalley.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // add plugins / reporters if needed
      return config
    },
    viewportWidth: 1366,
    viewportHeight: 768,
    video: true,
    screenshotsFolder: 'cypress/screenshots',
  },
  env: {
    adminUrl: 'https://staging.tutorsvalley.com/cryptlogger'
  }
})
