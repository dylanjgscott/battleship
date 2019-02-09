const assert = require('assert');

const battleship = require('../battleship');

describe('Ship', () => {

    describe('#collides()', () => {
        it('does not collide ships which do not overlap', () => {
            let ship1 = new battleship.Ship(
                new battleship.Coordinate(0, 0),
                new battleship.Coordinate(0, 1),
            );
            let ship2 = new battleship.Ship(
                new battleship.Coordinate(1, 0),
                new battleship.Coordinate(1, 1),
            );
            assert(!ship1.collides(ship2));
        });
        it('collides ships which do overlap', () => {
            let ship1 = new battleship.Ship(
                new battleship.Coordinate(0, 0),
                new battleship.Coordinate(0, 1),
            );
            let ship2 = new battleship.Ship(
                new battleship.Coordinate(0, 1),
                new battleship.Coordinate(1, 1),
            );
            assert(ship1.collides(ship2));
        });
    });

    describe('#hit()', () => {
        it('does not hit with a bad shot', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 0);
            let ship = new battleship.Ship(start, end);
            let shot = new battleship.Shot(0, 1);
            assert(!ship.hit(shot));
        });
        it('does hit with a good shot', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 0);
            let ship = new battleship.Ship(start, end);
            let shot = new battleship.Shot(0, 0);
            assert(ship.hit(shot));
        });
    });

    describe('#size', () => {
        it('calculates size one correctly', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 0);
            let ship = new battleship.Ship(start, end);
            assert.equal(ship.size, 1);
        });
        it('calculates width one correctly', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 1);
            let ship = new battleship.Ship(start, end);
            assert.equal(ship.size, 2);
        });
        it('calculates width two correctly', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(1, 1);
            let ship = new battleship.Ship(start, end);
            assert.equal(ship.size, 4);
        });
    });

    describe('#sunk', () => {
        it('does not sink a ship with no hits', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 1);
            let ship = new battleship.Ship(start, end);
            assert(!ship.sunk);
        });
        it('does not sink a ship with some hits', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 1);
            let ship = new battleship.Ship(start, end);
            let shot = new battleship.Shot(0, 0);
            ship.hit(shot);
            assert(!ship.sunk);
        });
        it('does sink a ship with all hits', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 1);
            let ship = new battleship.Ship(start, end);
            let shot1 = new battleship.Shot(0, 0);
            let shot2 = new battleship.Shot(0, 1);
            ship.hit(shot1);
            ship.hit(shot2);
            assert(ship.sunk);
        });
    });

    describe('#valid', () => {
        it('validates a valid ship', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 1);
            let ship = new battleship.Ship(start, end);
            assert(ship.valid);
        });
        it('invalidates a ship that is too wide', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(1, 1);
            let ship = new battleship.Ship(start, end);
            assert(!ship.valid);
        });
        it('invalidates a ship that is not integral', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 1.5);
            let ship = new battleship.Ship(start, end);
            assert(!ship.valid);
        });
        it('invalidates a ship that is outside the board', () => {
            let start = new battleship.Coordinate(-1, 0);
            let end = new battleship.Coordinate(-1, 1);
            let ship = new battleship.Ship(start, end);
            assert(!ship.valid);
        });
        it('invalidates a ship that is not numeric', () => {
            let start = new battleship.Coordinate(null, null);
            let end = new battleship.Coordinate(null, null);
            let ship = new battleship.Ship(start, end);
            assert(!ship.valid);
        });
    });

});
