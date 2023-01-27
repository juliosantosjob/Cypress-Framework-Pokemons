// Commands import
import './commands/selectPok';
import './utils/hooks';

// plugins support
import 'cypress-plugin-api';
import 'cypress-mochawesome-reporter/register';

// Help hiding requests in command logs
const origLog = Cypress.log;
Cypress.log = function (opts, ...other) {
    if (opts.displayName === 'script' || opts.name === 'request') { return; }
    return origLog(opts, ...other);
};