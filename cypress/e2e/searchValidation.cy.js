import { randomPokemons } from '../support/randomMass';

describe('Validação de busca', () => {
    const pokemon = randomPokemons();
    const nonExistentPokemon = 'non-existent_pokemon';

    it('Confirmando que o pokémon procurado é exibido corretamente', () => {
        cy.intercept(`**/pokemon/${pokemon.toLowerCase()}`).as('wtdPokemon');

        cy.get('#js-input-search').as('search');
        cy.get('@search').scrollIntoView();
        cy.get('@search').type(`${pokemon}{enter}`, { delay: 80 });

        cy.wait('@wtdPokemon');

        cy.get('[class*="card"]')
            .should('have.length', 1)
            .and('be.visible')
            .and('contain', pokemon)
            .screenshot();
    });

    it('Verificando a busca por um pokémon inexistente', () => {
        cy.get('#js-input-search').as('search');
        cy.get('@search').scrollIntoView();
        cy.get('@search').type(`${nonExistentPokemon}{enter}`, { delay: 80 });
        cy.get('strong.js-count-pokemons')
            .should('not.be.empty')
            .and('have.text', '0');

        cy.get('.card-pokemon').should('not.exist');
        cy.screenshot();
    });
});
