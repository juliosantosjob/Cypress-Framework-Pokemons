beforeEach(function () { 
    cy.log('Start');
    cy.go();
});

afterEach(function () {
    cy.log('Finish');
});