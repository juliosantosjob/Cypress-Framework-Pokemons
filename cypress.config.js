const { defineConfig } = require('cypress');
const { rmdir } = require('fs');
const fs = require('fs');
require('dotenv').config();

module.exports = defineConfig({
    modifyObstructiveCode: true,
    e2e: {
        setupNodeEvents(on, config) {
            config.baseUrl = process.env.BASE_URL;

            on('task', {
                deleteFolder(pathFiles) {
                    if (fs.existsSync(pathFiles)) {
                        return new Promise((resolve, reject) => {
                            rmdir(pathFiles, { recursive: true }, (err) => {
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