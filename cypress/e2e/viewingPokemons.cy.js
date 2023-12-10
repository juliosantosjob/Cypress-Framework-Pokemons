import { randomPokemons } from '../support/randomMass';

describe('Visualizando pokémons', () => {
    const pokemon = randomPokemons();
    let numCards = 9;

    it('Ao clicar em "Load more Pokémons" deve exibir 9 cards a mais', () => {
        while (numCards !== 36) {
            cy.get('[class*="card"]').should('have.length', numCards).as('initialCards');
            cy.get('#js-show-more').as('btnShowMore');

            cy.get('@btnShowMore').scrollIntoView();
            cy.get('@btnShowMore').click();

            cy.get('@initialCards').should('have.length', numCards);
            numCards += 9;
            cy.get('[class*="card"]').should('have.length', numCards);
        }
    });

    context('Dada a busca por um pokemon', () => {
        beforeEach(() => {
            cy.searchPokemon(pokemon);
        });

        it('Deve visualizar as informações de um pokemon', () => {
            const field = 'ul.info li:nth-child';

            cy.get('.card-pokemon').first().click();
            cy.get('.box').should('contain', pokemon);

            cy.get(`${field}(1)`).should('contain', 'Height');
            cy.get(`${field}(2)`).should('contain', 'Weight');
            cy.get(`${field}(3)`).should('contain', 'Abilities');
            cy.screenshot();
        });

        it('Deve ser possível finalizar um card de informações de um pokemon', () => {
            cy.get('.card-pokemon').first().click();

            cy.get('[class="box"]')
                .should('be.visible')
                .and('have.length', 1);

            cy.get('[title="Close"]').click();
            cy.get('[class="box"]')
                .should('not.be.visible')
                .screenshot();
        });
    });
});