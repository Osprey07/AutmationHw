const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config); // Allure'u etkinleştir
      return config;
    },
    baseUrl: 'https://magento.softwaretestingboard.com/', // kendi baseUrl'in neyse
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js'
  },
});
