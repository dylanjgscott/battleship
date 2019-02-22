const assert = require('assert');
const Player = require('../Player');

describe('Player', () => {

    describe('#constructor()', () => {

        it('sets the name correctly', () => {
            let player = Player.loadFromFile('test/players/valid.js');
            assert.equal(player.name, 'Valid');
        });

    });

});
