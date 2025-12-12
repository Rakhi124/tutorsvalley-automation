const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://beta.tutorsvalley.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',

    viewportWidth: 1366,
    viewportHeight: 768,

    video: true,
    screenshotsFolder: 'cypress/screenshots',

    // -------------------------
    // ⭐ Correct Mochawesome config
    // -------------------------
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports/mochawesome',  // FIXED
      charts: true,
      reportPageTitle: 'TutorsValley Automation Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveJson: true,  // FIXED
    },

    setupNodeEvents(on, config) {

      // === 1) Clear old Allure ===
      const allureFolder = path.join(__dirname, 'allure-results');
      if (fs.existsSync(allureFolder)) {
        fs.rmSync(allureFolder, { recursive: true, force: true });
        console.log("✔ Old Allure results removed");
      }

      // === 2) Enable Allure plugin ===
      allureWriter(on, config);

      // === 3) Rename screenshots with timestamp ===
      on('after:screenshot', (details) => {
        const newPath = path.join(
          path.dirname(details.path),
          `${path.basename(details.path, path.extname(details.path))}-${Date.now()}${path.extname(details.path)}`
        );

        return new Promise((resolve, reject) => {
          fs.rename(details.path, newPath, (err) => {
            if (err) return reject(err);
            resolve({ path: newPath });
          });
        });
      });

      // === 4) Rename videos with timestamp ===
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          const newVideoPath = path.join(
            path.dirname(results.video),
            `${path.basename(results.video, path.extname(results.video))}-${Date.now()}${path.extname(results.video)}`
          );
          fs.renameSync(results.video, newVideoPath);
          results.video = newVideoPath;
        }
      });

      // === 5) Generate Mochawesome + Allure after run ===
      on('after:run', () => {
        console.log("📊 Generating Mochawesome HTML...");
        exec(
          'npx mochawesome-report-generator cypress/reports/mochawesome/*.json -o cypress/reports/mochawesome',
          () => {}
        );

        console.log("📑 Generating Allure HTML...");
        exec('allure generate allure-results --clean', () => {});
      });

      return config;
    },
  },

  env: {
    allureResultsPath: 'allure-results',
    allureReuseAfterSpec: false,
    adminUrl: 'https://staging.tutorsvalley.com/cryptlogger',
  },
});
