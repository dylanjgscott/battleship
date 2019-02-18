const assert = require('assert');
const player = require('../player');

describe('Player', () => {

    describe('#constructor()', () => {

        it('sets the name correctly', () => {
            let p = new player.Player('test/players/', 'valid.js');
            assert.equal(p.name, 'Valid');
        });

        it('sets the score to zero', () => {
            let p = new player.Player('test/players/', 'valid.js');
            assert.equal(p.score, 0);
        });

        it('sets the filename', () => {
            let p = new player.Player('test/players/', 'valid.js');
            assert.equal(p.filename, 'valid.js');
        });

    });

});
