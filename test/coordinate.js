const assert = require('assert');
const coordinate = require('../coordinate');

describe('Coordinate', () => {

    describe('#constructor()', () => {

        it('works with valid properties', () => {
            let x = 0;
            let y = 0;
            let c = new coordinate.Coordinate({ x: x, y: y });
            assert.equal(c.x, x);
            assert.equal(c.y, y);
        });

        it('fails on non-numeric properties', () => {
            assert.throws(() => new coordinate.Coordinate({ x: 'a', y: 0 }));
            assert.throws(() => new coordinate.Coordinate({ x: 0, y: 'a' }));
        });

        it('fails on non-integral properties', () => {
            assert.throws(() => new coordinate.Coordinate({ x: 0.5, y: 0 }));
            assert.throws(() => new coordinate.Coordinate({ x: 0, y: 0.5 }));
        });

        it('fails on missing properties', () => {
            assert.throws(() => new coordinate.Coordinate({}));
            assert.throws(() => new coordinate.Coordinate({ x: 0 }));
            assert.throws(() => new coordinate.Coordinate({ y: 0 }));
        });

        it('fails on null properties', () => {
            assert.throws(() => new coordinate.Coordinate({ x: null, y: 0 }));
            assert.throws(() => new coordinate.Coordinate({ x: 0, y: null }));
        });

        it('fails on coordinates outside the board', () => {
            assert.throws(() => new coordinate.Coordinate({ x: 10, y: 0 }));
            assert.throws(() => new coordinate.Coordinate({ x: 0, y: 10 }));
            assert.throws(() => new coordinate.Coordinate({ x: -1, y: 0 }));
            assert.throws(() => new coordinate.Coordinate({ x: 0, y: -1 }));
        });

    });

});
