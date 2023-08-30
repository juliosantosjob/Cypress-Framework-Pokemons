Cypress.Commands.add('searchPokemon', (pokemonName) => {
    const endpoint = `**/pokemon/${pokemonName}`;

    cy.intercept(endpoint.toLowerCase()).as('pokemon');
    cy.get('#js-input-search')
        .scrollIntoView()
        .type(`${pokemonName}{enter}`, { delay: 80 });
    
    cy.wait('@pokemon');
});

Cypress.Commands.add('goTo', () => {
    const pokeApiEndpoint = '**/v2/type';

    cy.intercept(pokeApiEndpoint).as('pokeapi');
    cy.visit('/projetos/pokeapi');

    cy.wait('@pokeapi');
    cy.get('p').should('contain', 
        'The perfect guide for those who want to hunt Pokémons around the world');
});