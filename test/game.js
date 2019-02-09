const assert = require('assert');

const battleship = require('../battleship');
const tournament = require('../tournament');

describe('Game', () => {

    describe('#shipsSunk()', () => {
        beforeEach(() => {
            this.ships = {
                carrier: new battleship.Ship(new battleship.Coordinate(4, 0), new battleship.Coordinate(4, 4)),
                battleship: new battleship.Ship(new battleship.Coordinate(3, 0), new battleship.Coordinate(3, 3)),
                cruiser: new battleship.Ship(new battleship.Coordinate(1, 0), new battleship.Coordinate(1, 2)),
                submarine: new battleship.Ship(new battleship.Coordinate(2, 0), new battleship.Coordinate(2, 2)),
                destroyer: new battleship.Ship(new battleship.Coordinate(0, 0), new battleship.Coordinate(0, 1)),
            };
        });
        it('works with no sunk ships', () => {
            assert(!battleship.Game.shipsSunk(this.ships));
        });
        it('works with some sunk ships', () => {
            this.ships.destroyer.hit(new battleship.Shot(0, 0));
            this.ships.destroyer.hit(new battleship.Shot(0, 1));
            assert(this.ships.destroyer.sunk);
            assert(!battleship.Game.shipsSunk(this.ships));
        });
        it('works with all sunk ships', () => {
            delete this.ships.carrier;
            delete this.ships.battleship;
            delete this.ships.cruiser;
            this.ships.submarine.hit(new battleship.Shot(2, 0));
            this.ships.submarine.hit(new battleship.Shot(2, 1));
            this.ships.submarine.hit(new battleship.Shot(2, 2));
            this.ships.destroyer.hit(new battleship.Shot(0, 0));
            this.ships.destroyer.hit(new battleship.Shot(0, 1));
            assert(this.ships.submarine.sunk);
            assert(this.ships.destroyer.sunk);
            assert(battleship.Game.shipsSunk(this.ships));
        });
    });

    describe('#shipsValid()', () => {
        beforeEach(() => {
            this.ships = {
                carrier: new battleship.Ship(new battleship.Coordinate(4, 0), new battleship.Coordinate(4, 4)),
                battleship: new battleship.Ship(new battleship.Coordinate(3, 0), new battleship.Coordinate(3, 3)),
                cruiser: new battleship.Ship(new battleship.Coordinate(1, 0), new battleship.Coordinate(1, 2)),
                submarine: new battleship.Ship(new battleship.Coordinate(2, 0), new battleship.Coordinate(2, 2)),
                destroyer: new battleship.Ship(new battleship.Coordinate(0, 0), new battleship.Coordinate(0, 1)),
            };
        });
        it('validates valid ships', () => {
            assert(battleship.Game.shipsValid(this.ships));
        });
        it('invalidates colliding ships', () => {
            this.ships.destroyer = new battleship.Ship(new battleship.Coordinate(4, 0), new battleship.Coordinate(4, 1)),
            assert(!battleship.Game.shipsValid(this.ships));
        });
        it('invalidates missing ships', () => {
            delete this.ships.battleship;
            assert(!battleship.Game.shipsValid(this.ships));
        });
        it('invalidates extra ships', () => {
            this.ships.dreadnought = new battleship.Ship(new battleship.Coordinate(5, 0), new battleship.Coordinate(5, 1)),
            assert(!battleship.Game.shipsValid(this.ships));
        });
        it('invalidates wrong ship sizes', () => {
            this.ships.destroyer = new battleship.Ship(new battleship.Coordinate(0, 0), new battleship.Coordinate(0, 0)),
            assert(!battleship.Game.shipsValid(this.ships));
        });
        it('invalidates invalid ships', () => {
            this.ships.destroyer = new battleship.Ship(new battleship.Coordinate(9, 9), new battleship.Coordinate(9, 10)),
            assert(!this.ships.destroyer.valid);
            assert(!battleship.Game.shipsValid(this.ships));
        });
        it('invalidates non-ships', () => {
            this.ships.destroyer = null;
            assert(!battleship.Game.shipsValid(this.ships));
        });
    });

    describe('#shoot()', () => {
        it('exists', () => {
        });
    });

    describe('#gameover()', () => {
        it('exists', () => {
        });
    });

    describe('#winner()', () => {
        it('exists', () => {
        });
    });

});
