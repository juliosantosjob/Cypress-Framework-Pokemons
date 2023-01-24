import './commands/selectPok';
import './utils/hooks';
import 'cypress-plugin-api';

const origLog = Cypress.log;
Cypress.log = function (opts, ...other) {
    if (opts.displayName === 'script' || opts.name === 'request') { return; }
    return origLog(opts, ...other);
};