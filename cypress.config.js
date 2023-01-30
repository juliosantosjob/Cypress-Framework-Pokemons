const { defineConfig } = require('cypress');
const { rmdir } = require('fs');
const fs = require('fs');

require('dotenv').config();

module.exports = defineConfig({
    modifyObstructiveCode: true,
    fixturesFolder: false,
    reporter: 'cypress-mochawesome-reporter',
    e2e: {
        setupNodeEvents(on, config) {
            config.baseUrl = process.env.BASE_URL;
            config.env.API_POK = process.env.API_POK;
            require('cypress-mochawesome-reporter/plugin')(on);

            return config;
        },
    },
});