Cypress.Commands.add('searchPokemon', (pokemonName) => {
    const endpoint = `**/pokemon/${pokemonName}`;

    cy.intercept(endpoint.toLowerCase()).as('pokemon');
    cy.get('#js-input-search').as('search');
    cy.get('@search').scrollIntoView();
    cy.get('@search').type(`${pokemonName}{enter}`, { delay: 80 });
    cy.wait('@pokemon');

    cy.get('[class*="card"]')
        .should('contain', pokemonName)
        .and('be.visible');
});

Cypress.Commands.add('goApp', () => {
    cy.intercept('**/v2/type').as('pokeapi');
    cy.visit('/projetos/pokeapi');

    cy.wait('@pokeapi');
    cy.get('p').should('contain',
        'The perfect guide for those who want to hunt Pokémons around the world');
});