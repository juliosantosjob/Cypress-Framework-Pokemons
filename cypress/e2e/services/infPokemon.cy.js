/// <reference types='cypress' />

describe('Informações de um pokemon', { log: false }, function () {

    it.only('Deve retornar 200 o GET de informações de um pokemon', function () {
        cy.api({
            method: 'GET',
            url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur'
        }).then((response) => {
            console.log(response.body);
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq('bulbasaur');
        });
    });

    it('Deve retornar 400 um pokemon inexististe', function () {
    });

    it('Deve retornar 200 a busca por um pokemon', function () {
    });

    it('Validar informações de um Pokemon', function () {
    });
});