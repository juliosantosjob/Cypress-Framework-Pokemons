const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
    modifyObstructiveCode: true,
    fixturesFolder: false,
    reporter: 'cypress-mochawesome-reporter',
    e2e: {
        setupNodeEvents(on, config) {
            config.baseUrl = process.env.BASE_URL;
            require('cypress-mochawesome-reporter/plugin')(on);

            return config;
        }
    }
});
