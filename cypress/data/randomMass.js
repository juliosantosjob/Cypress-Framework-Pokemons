
module.exports = {
    getNamePok() {
        const namePok = ['Wartortle', 'Blastoise', 'Charmander', 'Charizard', 'Squirtle', 'Pidgeotto', 'Butterfree', 'Pikachu', 'Clefairy'];
        const random = Math.floor(Math.random() * namePok.length);
        return random, namePok[random];
    }
};
