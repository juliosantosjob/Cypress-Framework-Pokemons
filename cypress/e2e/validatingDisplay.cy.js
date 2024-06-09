import { randomPokemons } from '../support/randomMass';

describe('Validando a exibição', () => {
    
    afterEach(() => cy.screenshot());

    it('Validando que ao clicar em "Load more Pokémons", sejam exibidos 9 cards adicionais', () => {
        let numCards = 9;
        
        while (numCards !== 36) {
            cy.get('.card-pokemon').should('have.length', numCards)
                .as('initialCards');
            cy.get('#js-show-more').as('btnShowMore');

            cy.get('@btnShowMore').scrollIntoView();
            cy.get('@btnShowMore').click();

            cy.get('@initialCards').should('have.length', numCards);
            numCards += 9;            
            cy.get('.card-pokemon').should('have.length', numCards);
        }
    });

    context('Dada a pesquisa por um pokémon', () => {
        const pokemon = randomPokemons();
        
        beforeEach(() => cy.searchPokemon(pokemon));

        it('Deve exibir as informações de um pokemon', () => {
            cy.get('.card-pokemon').first().click();
            cy.contains('.box', pokemon).should('be.visible');

            cy.get('ul.info li:nth-child(1)').should('contain', 'Height');
            cy.get('ul.info li:nth-child(2)').should('contain', 'Weight');
            cy.get('ul.info li:nth-child(3)').should('contain', 'Abilities');
        });

        it('Deve ser possível finalizar o card de informações de um pokemon', () => {
            cy.get('.card-pokemon').first().click();
            cy.get('[class="box"]').should('be.visible')
                .and('have.length', 1);

            cy.get('[title="Close"]').click();
            cy.get('[class="box"]').should('not.be.visible');
        });
    });
});