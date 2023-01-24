const { defineConfig } = require('cypress');
const _ = require('lodash');
const { rmdir } = require('fs');
const fs = require('fs');

require('dotenv').config();

module.exports = defineConfig({
    modifyObstructiveCode: true,
    fixturesFolder: false,
    e2e: {
        setupNodeEvents(on, config) {
            config.baseUrl = process.env.BASE_URL;

            on('task', {
                deleteFolder(path) {
                    if (fs.existsSync(path)) {
                        return new Promise((resolve, reject) => {
                            rmdir(path, { recursive: true }, (err) => {
                                if (err) {
                                    return reject(err);;
                                }
                                resolve(null);
                            });
                        });
                    }
                    return null;
                }
            });

            return config;
        },
    },
});