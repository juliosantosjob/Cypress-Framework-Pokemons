import { randomPokemons } from '../support/randomMass';

describe('Validação de busca', () => {
    
    afterEach(() => cy.screenshot());

    it('Confirmando que o pokémon procurado é exibido corretamente', () => {
        const pokemon = randomPokemons();
        
        cy.intercept(`**/pokemon/${pokemon.toLowerCase()}`)
            .as('wtdPokemon');
        cy.get('#js-input-search').type(`${pokemon}{enter}`, { delay: 80 });
        cy.wait('@wtdPokemon');

        cy.contains('.card-pokemon', pokemon)
            .should('be.visible')
            .and('have.length', 1);
    });

    it('Verificando a busca por um pokémon inexistente', () => {
        cy.get('#js-input-search')
            .type('non_existent_pokemon{enter}', { delay: 80 });
            
        cy.get('strong.js-count-pokemons')
            .should('not.be.empty')
            .and('have.text', '0');
            
        cy.get('.card-pokemon')
            .should('not.exist');
    });
});
