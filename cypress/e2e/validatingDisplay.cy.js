import { randomPokemons } from '../support/randomMass';

describe('Validando a exibição', () => {
    const pokemon = randomPokemons();
    let numCards = 9;

    it('Validando que ao clicar em "Load more Pokémons", sejam exibidos 9 cards adicionais', () => {
        while (numCards !== 36) {
            cy.get('.card-pokemon').should('have.length', numCards).as('initialCards');
            cy.get('#js-show-more').as('btnShowMore');

            cy.get('@btnShowMore').scrollIntoView();
            cy.get('@btnShowMore').click();

            cy.get('@initialCards').should('have.length', numCards);
            numCards += 9;            
            cy.get('.card-pokemon').should('have.length', numCards);
        }
        cy.screenshot();
    });

    context('Dada a pesquisa por um pokémon', () => {
        beforeEach(() => { 
            cy.searchPokemon(pokemon); 
        });

        it('Deve exibir as informações de um pokemon', () => {
            const fld = 'ul.info li:nth-child';

            cy.get('.card-pokemon').first().click();
            cy.get('.box').should('contain', pokemon);

            cy.get(`${fld}(1)`).should('contain', 'Height');
            cy.get(`${fld}(2)`).should('contain', 'Weight');
            cy.get(`${fld}(3)`).should('contain', 'Abilities');
            cy.screenshot();
        });

        it('Deve ser possível finalizar o card de informações de um pokemon', () => {
            cy.get('.card-pokemon').first().click();
            cy.get('[class="box"]').should('be.visible').and('have.length', 1);

            cy.get('[title="Close"]').click();
            cy.get('[class="box"]').should('not.be.visible');
            cy.screenshot();
        });
    });
});
