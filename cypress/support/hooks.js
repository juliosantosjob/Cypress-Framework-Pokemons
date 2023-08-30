beforeEach(function () { 
    cy.log('Start');
    cy.goTo();
});

afterEach(function () {
    cy.log('Finish');
});