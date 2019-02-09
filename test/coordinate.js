const assert = require('assert');

const battleship = require('../battleship');

describe('Coordinate', () => {

    describe('#valid', () => {
        it('validates a valid coordinate', () => {
            let coordinate = new battleship.Coordinate(0, 0);
            assert(coordinate.valid);
        });
        it('invalidates a non-numerical coordinate', () => {
            let coordinate = new battleship.Coordinate('a', 0);
            assert(!coordinate.valid);
        });
        it('invalidates a non-integral coordinate', () => {
            let coordinate = new battleship.Coordinate(0.5, 0);
            assert(!coordinate.valid);
        });
        it('invalidates a coordinate outside the board', () => {
            let coordinate = new battleship.Coordinate(10, 0);
            assert(!coordinate.valid);
        });
    });

});
