/// <reference types='cypress' /> 

describe('Selecionado Pokémons', function () {

    beforeEach(function () {
        cy.intercept('**/v2/type').as('pokeapi');
        cy.visit('/projetos/pokeapi');

        cy.wait('@pokeapi');
        cy.get('p').should('contain', 'The perfect guide for those who want to hunt Pokémons around the world');
    });

    it.skip('Buscando um pokemon na barra de busca', function () {
        cy.intercept('**/pokemon/bulbasaur').as('wtdPokemon');

        cy.fixture('dataTest').then(function (pok) {
            const wantedPokemon = pok.pokBySearch;

            cy.get('#js-input-search').scrollIntoView()
                .type(`${wantedPokemon}{enter}`, { delay: 80 });

            cy.wait('@wtdPokemon');
            cy.get('button[class*="card"]')
                .should('have.length', 1)
                .and('be.visible')
                .and('contain', `${wantedPokemon}`)
                .screenshot();
        });
    });

    it.skip('Ao clicar em "Load more Pokémons" deve exibir 9 cards a mais', function () {
        let numberCards = 9;
        cy.get('button[class*="card"]').should('have.length', numberCards).as('numberOk');

        for (let i = 0; i < 4; i++) {
            cy.get('#js-show-more').scrollIntoView().click();
            if (cy.get('@numberOk')) numberCards = numberCards + 9;
            cy.get('button[class*="card"]').should('have.length', numberCards);
        };
        cy.screenshot();
    });
});