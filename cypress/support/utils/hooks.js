before(function () {    
    // cy.task('deleteFolder', 'cypress/screenshots');
    cy.task('deleteFolder', 'cypress/downloads');
});

beforeEach(function () { 
    cy.log('Start');
});

beforeEach(function () { 
    cy.log('Finish');
});
