module.exports = {
    getRandomPok() {
        const namePok = [
            'Wartortle', 'Blastoise', 'Charmander',
            'Charizard', 'Squirtle', 'Pidgeotto',
            'Butterfree', 'Pikachu', 'Clefairy',
            'Sandshrew', 'Nidoqueen', 'Venonat',
            'Psyduck', 'Poliwrath', 'Primeape'
        ];
        const random = Math.floor(Math.random() * namePok.length);
        return namePok[random];
    }
};