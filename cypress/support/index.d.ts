/// <reference types="cypress" />
declare namespace Cypress {
    interface Chainable {

        /**
         * Custom command to search for a pokemon using its name as an argument.
         * @example cy.searchPokemon('greeting');
         */
        searchPokemon(value: string): Chainable<String>;

        /**
        * Personalized command to access the app from the app.
        * @example cy.goTo();
        */
        goTo(): Chainable<Element>;
    }
}