const assert = require('assert');
const Coordinate = require('../Coordinate');

describe('Coordinate', () => {

    describe('#constructor()', () => {

        it('works with valid properties', () => {
            let x = 0;
            let y = 0;
            let c = new Coordinate({ x: x, y: y });
            assert.equal(c.x, x);
            assert.equal(c.y, y);
        });

        it('fails on non-numeric properties', () => {
            assert.throws(() => new Coordinate({ x: 'a', y: 0 }));
            assert.throws(() => new Coordinate({ x: 0, y: 'a' }));
        });

        it('fails on non-integral properties', () => {
            assert.throws(() => new Coordinate({ x: 0.5, y: 0 }));
            assert.throws(() => new Coordinate({ x: 0, y: 0.5 }));
        });

        it('fails on missing properties', () => {
            assert.throws(() => new Coordinate({}));
            assert.throws(() => new Coordinate({ x: 0 }));
            assert.throws(() => new Coordinate({ y: 0 }));
        });

        it('fails on null properties', () => {
            assert.throws(() => new Coordinate({ x: null, y: 0 }));
            assert.throws(() => new Coordinate({ x: 0, y: null }));
        });

        it('fails on coordinates outside the board', () => {
            assert.throws(() => new Coordinate({ x: 10, y: 0 }));
            assert.throws(() => new Coordinate({ x: 0, y: 10 }));
            assert.throws(() => new Coordinate({ x: -1, y: 0 }));
            assert.throws(() => new Coordinate({ x: 0, y: -1 }));
        });

    });

});
