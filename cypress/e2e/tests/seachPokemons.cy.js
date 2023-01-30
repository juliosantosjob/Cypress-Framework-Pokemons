/// <reference types='cypress' />

import data from '../../data/randomMass';

describe('Pesquisas por Pokemons', function () {
    beforeEach(function () {
        cy.intercept('**/v2/type').as('pokeapi');
        cy.visit('/projetos/pokeapi');

        cy.wait('@pokeapi');
        cy.get('p').should('contain',
            'The perfect guide for those who want to hunt Pokémons around the world');
    });

    it('Buscando um pokemon aleatório na barra de busca', function () {
        let wantedPokemon = data.getRandomPok();

        cy.intercept(`**/pokemon/${wantedPokemon.toLowerCase()}`).as('wtdPokemon');
        cy.get('#js-input-search').scrollIntoView().type(`${wantedPokemon}{enter}`, { delay: 80 });

        cy.wait('@wtdPokemon');
        cy.get('button[class*="card"]')
            .should('have.length', 1)
            .and('be.visible')
            .and('contain', wantedPokemon)
            .screenshot();
    });

    it('Buscando pokemons voadores', function () {
        let randomNumb = Math.floor(Math.random() * 90);

        cy.get('button[code-type="3"]').first().click();
        cy.get('[class*="card-pokemon"]').eq(randomNumb).click();

        cy.get('div[class="box"]')
            .should('contain', 'Flying')
            .and('be.visible')
            .screenshot();
    });

    it('Procurando um pokemon que não existe', function () {
        cy.searchPokemon('its_not_pokemon');
        cy.get('strong[class="js-count-pokemons"]')
            .should('have.value', '')
            .and('not.be.empty');

        cy.get('[class*="card-pokemon"]')
            .should('not.exist');
        cy.screenshot();
    });
});