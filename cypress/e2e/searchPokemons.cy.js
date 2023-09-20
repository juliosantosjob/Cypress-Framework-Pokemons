import { randomPokemons } from '../support/randomMass';

describe('Pesquisando Pokemons', () => {
    const pokemon = randomPokemons();

    it('Buscando um pokemon aleatório na barra de busca', () => {
        cy.intercept(`**/pokemon/${pokemon.toLowerCase()}`).as('wtdPokemon');

        cy.get('#js-input-search').as('search');
        cy.get('@search').scrollIntoView();
        cy.get('@search').type(`${pokemon}{enter}`, { delay: 80 });

        cy.wait('@wtdPokemon');

        cy.get('button[class*="card"]')
            .should('have.length', 1)
            .and('be.visible')
            .and('contain', pokemon)
            .screenshot();
    });

    it('Procurando um pokemon que não existe', () => {
        const nonExistentPokemon = 'its_not_pokemon';

        cy.searchPokemon(nonExistentPokemon);
        cy.get('strong.js-count-pokemons')
            .should('not.be.empty')
            .and('have.text', '0');

        cy.get('.card-pokemon').should('not.exist');
        cy.screenshot();
    });
});