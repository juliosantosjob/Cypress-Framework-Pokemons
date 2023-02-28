/// <reference types='cypress' />

import data from '../../data/randomMass';

describe('Pesquisando Pokemons', function () {
    const wantedPokemon = data.getRandomPok();

    it('Buscando um pokemon aleatório na barra de busca', function () {
        cy.intercept(`**/pokemon/${wantedPokemon.toLowerCase()}`).as('wtdPokemon');
        cy.get('#js-input-search').scrollIntoView().type(`${wantedPokemon}{enter}`, { delay: 80 });

        cy.wait('@wtdPokemon');
        cy.get('button[class*="card"]')
            .should('have.length', 1)
            .and('be.visible')
            .and('contain', wantedPokemon)
            .screenshot();
    });

    it('Procurando um pokemon que não existe', function () {
        cy.searchPokemon('its_not_pokemon');
        cy.get('strong[class="js-count-pokemons"]')
            .should('have.value', '')
            .and('not.be.empty');

        cy.get('[class*="card-pokemon"]').should('not.exist');
        cy.screenshot();
    });
});