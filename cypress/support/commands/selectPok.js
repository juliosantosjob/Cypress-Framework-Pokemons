/// <reference types='cypress' />

Cypress.Commands.add('searchPokemon', (pok) => {
    const endpoint = `**/pokemon/${pok}`;

    cy.intercept(endpoint.toLowerCase()).as('pokemon');
    cy.get('#js-input-search').scrollIntoView().type(`${pok}{enter}`, { delay: 80 });
    cy.wait('@pokemon');
});

Cypress.Commands.add('goTo', () => {
    cy.intercept('**/v2/type').as('pokeapi');
    cy.visit('/projetos/pokeapi');

    cy.wait('@pokeapi');
    cy.get('p').should('contain', 
        'The perfect guide for those who want to hunt Pokémons around the world');
});