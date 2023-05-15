/// <reference types='cypress' />

import data from '../../data/randomMass';

describe('Selecionando Pokémons', function () {
    const wantedPokemon = data.getRandomPok();
    let numberCards = 9;

    it('Ao clicar em "Load more Pokémons" deve exibir 9 cards a mais', function () {
        cy.get('button[class*="card"]')
            .should('have.length', numberCards).as('numberOk');

        for (let i = 0; i < 5; i++) {
            cy.get('#js-show-more').scrollIntoView().click();
            if (cy.get('@numberOk')) numberCards += 9;
            cy.get('button[class*="card"]').should('have.length', numberCards);
        };
        cy.screenshot();
    });

    it('Deve visualizar as informações de um pokemon', function () {
        cy.searchPokemon(wantedPokemon);
        cy.get('.card-pokemon').first().click();
        cy.get('.box').should('contain', wantedPokemon);

        cy.get('ul[class="info"]').children().first().should('contain', 'Height');
        cy.get('ul[class="info"]').children().last().prev().should('contain', 'Weight');
        cy.get('ul[class="info"]').children().last().should('contain', 'Abilities');
        cy.screenshot();
    });

    it('Visualizando a opção "ver mais" nas descrições de um pokemon', function () {
        cy.searchPokemon('blastoise');
        cy.get('.card-pokemon').first().click();
        cy.get('#js-show-more-abilities').click();

        cy.get('#js-ballon-abilities')
            .should('exist')
            .and('have.text', 'Rain-dish')
            .screenshot();
    });

    it('Deve ser possível fechar um card de informações de um pokemon', function () {
        cy.searchPokemon(wantedPokemon);
        cy.get('.card-pokemon').first().click();
        cy.get('[class="box"]')
            .should('exist')
            .and('be.visible');

        cy.get('[title="Close"]').click();
        cy.get('[class="box"]')
            .should('exist')
            .and('not.be.visible')
            .screenshot();
    });
});
