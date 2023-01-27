
declare namespace Cypress {
    interface Chainable {
        /**
         * Custom command to search for a pokemon using its name as an argument.
         * @example cy.searchPokemon('greeting');
         */
        searchPokemon(value: string): Chainable<String>;
    }
}