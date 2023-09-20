import { randomPokemons } from '../support/randomMass';

describe('Selecionando Pokémons', () => {
    const pokemon = randomPokemons();
    let numCards = 9;

    it('Ao clicar em "Load more Pokémons" deve exibir 9 cards a mais', () => {
        while (numCards !== 36) {
            cy.get('button[class*="card"]').should('have.length', numCards).as('initialCards');
            cy.get('#js-show-more').scrollIntoView().click();

            cy.get('@initialCards').should('have.length', numCards);
            numCards += 9;
            cy.get('button[class*="card"]').should('have.length', numCards);
        }
    });

    it('Deve visualizar as informações de um pokemon', () => {
        cy.searchPokemon(pokemon);
        cy.get('.card-pokemon').first().click();
        cy.get('.box').should('contain', pokemon);

        cy.get('ul[class="info"]').children().first().should('contain', 'Height');
        cy.get('ul[class="info"]').children().last().prev().should('contain', 'Weight');
        cy.get('ul[class="info"]').children().last().should('contain', 'Abilities');
        cy.screenshot();
    });

    it('Visualizando a opção "ver mais" nas descrições de um pokemon', () => {
        cy.searchPokemon('blastoise');
        cy.get('.card-pokemon').first().click();
        cy.get('#js-show-more-abilities').click();

        cy.get('#js-ballon-abilities')
            .should('exist')
            .and('have.text', 'Rain-dish')
            .screenshot();
    });

    it('Deve ser possível finalizar um card de informações de um pokemon', () => {
        cy.searchPokemon(pokemon);
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