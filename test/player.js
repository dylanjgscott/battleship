const assert = require('assert');
const Player = require('../Player');

describe('Player', () => {

    describe('#constructor()', () => {

        it('sets the name correctly', () => {
            let p = new Player('test/players/', 'valid.js');
            assert.equal(p.name, 'Valid');
        });

        it('sets the score to zero', () => {
            let p = new Player('test/players/', 'valid.js');
            assert.equal(p.score, 0);
        });

        it('sets the filename', () => {
            let p = new Player('test/players/', 'valid.js');
            assert.equal(p.filename, 'valid.js');
        });

    });

});
