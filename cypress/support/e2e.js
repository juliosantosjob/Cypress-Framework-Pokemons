// plugins support
import './hooks';
import './commands_helper';
import 'cypress-mochawesome-reporter/register';

// Help hiding requests in command logs
const origLog = Cypress.log;
Cypress.log = function (opts, ...other) {
    if (opts.displayName === 'script' || opts.name === 'request') { return; }
    return origLog(opts, ...other);
};