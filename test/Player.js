const assert = require('assert');
const Player = require('../Player');

describe('Player', () => {

    describe('#constructor()', () => {

        it('sets the name correctly', async () => {
            let player = await Player.loadFromFile('test/players/Valid.js');
            assert.equal(player.name, 'Valid');
        });

    });

});
