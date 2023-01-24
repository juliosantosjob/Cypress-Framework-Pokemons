Cypress.Commands.add('searchPokemon', (pok) => {
    const endpoint = `**/pokemon/${pok}`;

    cy.intercept(endpoint.toLowerCase()).as('pokemon');
    cy.get('#js-input-search').scrollIntoView().type(`${pok}{enter}`, { delay: 80 });
    cy.wait('@pokemon');
});