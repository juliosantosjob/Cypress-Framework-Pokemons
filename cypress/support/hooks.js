beforeEach(function () { 
    cy.log('Start');
    cy.goApp();
});

afterEach(function () {
    cy.log('Finish');
});