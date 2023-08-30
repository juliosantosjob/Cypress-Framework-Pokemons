describe('Informações de um pokemon', function () {
    const urlPok = Cypress.env('API_POK');

    it('Deve retornar 200 no GET de forms-pokemons', function () {
        cy.api({
            method: 'GET',
            url: urlPok + '/pokemon-form'
        }).should(function (response) {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.not.null;
            expect(response.body.results[1].name).to.eq('ivysaur');
            expect(response.body.results[1].url).to.eq(urlPok + 'pokemon-form/2/');
        });
    });

    it('Deve retornar 404 para um pokemon inexististe', function () {
        cy.api({
            method: 'GET',
            url: urlPok + '/pokemon/non_existent_pokemon',
            failOnStatusCode: false
        }).should(function (response) {
            expect(response.status).to.eq(404);
            expect(response.statusText).to.equal('Not Found');
        });
    });

    it('Deve retornar 200 ao buscar pela lista de pokemons', function () {
        cy.api({
            method: 'GET',
            url: urlPok,
        }).should(function (response) {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.not.null;
        });
    });
});