const assert = require('assert');

const battleship = require('../battleship');

describe('Ship', () => {

    describe('hit', () => {
        it('should not hit a ship with a bad shot', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 0);
            let ship = new battleship.Ship(start, end);
            let shot = new battleship.Shot(0, 1);
            assert(!ship.hit(shot));
        });
        it('should hit a ship with a good shot', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 0);
            let ship = new battleship.Ship(start, end);
            let shot = new battleship.Shot(0, 0);
            assert(ship.hit(shot));
        });
    });

    describe('size', () => {
        it('should calculate size one correctly', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 0);
            let ship = new battleship.Ship(start, end);
            assert.equal(ship.size, 1);
        });
        it('should calculate width one correctly', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 1);
            let ship = new battleship.Ship(start, end);
            assert.equal(ship.size, 2);
        });
        it('should calculate width two correctly', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(1, 1);
            let ship = new battleship.Ship(start, end);
            assert.equal(ship.size, 4);
        });
    });

    describe('sunk', () => {
        it('should not sink a ship with no hits', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 1);
            let ship = new battleship.Ship(start, end);
            assert(!ship.sunk);
        });
        it('should not sink a ship with some hits', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 1);
            let ship = new battleship.Ship(start, end);
            let shot = new battleship.Shot(0, 0);
            ship.hit(shot);
            assert(!ship.sunk);
        });
        it('should sink a ship with all hits', () => {
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

    describe('valid', () => {
        it('should validate a valid ship', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 1);
            let ship = new battleship.Ship(start, end);
            assert(ship.valid);
        });
        it('should invalidate a ship that is too wide', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(1, 1);
            let ship = new battleship.Ship(start, end);
            assert(!ship.valid);
        });
        it('should invalidate a ship that is not integral', () => {
            let start = new battleship.Coordinate(0, 0);
            let end = new battleship.Coordinate(0, 1.5);
            let ship = new battleship.Ship(start, end);
            assert(!ship.valid);
        });
        it('should invalidate a ship that is outside the board', () => {
            let start = new battleship.Coordinate(-1, 0);
            let end = new battleship.Coordinate(-1, 1);
            let ship = new battleship.Ship(start, end);
            assert(!ship.valid);
        });
        it('should invalidate a ship that is not numeric', () => {
            let start = new battleship.Coordinate(null, null);
            let end = new battleship.Coordinate(null, null);
            let ship = new battleship.Ship(start, end);
            assert(!ship.valid);
        });
    });

});
