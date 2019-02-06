const battleship = require('../battleship');

class Player {

    constructor() {
        throw 'test 1';
    }

    get name() {
        throw 'test 2';
    }

    get opponent() {
        throw 'test 3';
    }

    set opponent(opponent) {
        throw 'test 4';
    }

    get ships() {
        throw 'test 5';
    }

    shoot(state) {
        throw 'test 6';
    }

}

exports.Player = Player;
