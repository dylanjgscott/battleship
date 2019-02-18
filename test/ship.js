const assert = require('assert');
const coordinate = require('../coordinate');
const ship = require('../ship');

describe('Ship', () => {

    describe('#loadShips()', () => {

        it('loads all the ships', () => {
            let ships = ship.Ship.loadShips({
                carrier: { bow: { x: 0, y: 0 }, stern: { x: 0, y: 4 } },
                battleship: { bow: { x: 1, y: 0 }, stern: { x: 1, y: 3 } },
                cruiser: { bow: { x: 2, y: 0 }, stern: { x: 2, y: 2 } },
                submarine: { bow: { x: 3, y: 0 }, stern: { x: 3, y: 2 }, },
                destroyer: { bow: { x: 4, y: 0 }, stern: { x: 4, y: 1 } },
            });
            Object.keys(ship.SHIPS).forEach(shipName => assert.equal(ship.SHIPS[shipName], ships[shipName].size));
        });

        it('fails when the ships overlap', () => {
            assert.throws(() => {
                ship.Ship.loadShips({
                    carrier: { bow: { x: 0, y: 0 }, stern: { x: 0, y: 4 } },
                    battleship: { bow: { x: 1, y: 0 }, stern: { x: 1, y: 3 } },
                    cruiser: { bow: { x: 2, y: 0 }, stern: { x: 2, y: 2 } },
                    submarine: { bow: { x: 3, y: 0 }, stern: { x: 3, y: 2 }, },
                    destroyer: { bow: { x: 3, y: 2 }, stern: { x: 3, y: 3 } },
                });
            });
        });

        it('fails when the ships are missing', () => {
            assert.throws(() => {
                ship.Ship.loadShips({});
            });
        });

        it('fails when some ships are missing', () => {
            assert.throws(() => {
                ship.Ship.loadShips({
                    carrier: { bow: { x: 0, y: 0 }, stern: { x: 0, y: 4 } },
                    battleship: { bow: { x: 1, y: 0 }, stern: { x: 1, y: 3 } },
                    cruiser: { bow: { x: 2, y: 0 }, stern: { x: 2, y: 2 } },
                    submarine: { bow: { x: 3, y: 0 }, stern: { x: 3, y: 2 }, },
                });
            });
        });

        it('fails when some ships are null', () => {
            assert.throws(() => {
                ship.Ship.loadShips({
                    carrier: { bow: { x: 0, y: 0 }, stern: { x: 0, y: 4 } },
                    battleship: { bow: { x: 1, y: 0 }, stern: { x: 1, y: 3 } },
                    cruiser: { bow: { x: 2, y: 0 }, stern: { x: 2, y: 2 } },
                    submarine: { bow: { x: 3, y: 0 }, stern: { x: 3, y: 2 }, },
                    destroyer: null,
                });
            });
        });

        it('fails when some ships are the wrong size', () => {
            assert.throws(() => {
                ship.Ship.loadShips({
                    carrier: { bow: { x: 0, y: 0 }, stern: { x: 0, y: 4 } },
                    battleship: { bow: { x: 1, y: 0 }, stern: { x: 1, y: 3 } },
                    cruiser: { bow: { x: 2, y: 0 }, stern: { x: 2, y: 2 } },
                    submarine: { bow: { x: 3, y: 0 }, stern: { x: 3, y: 2 }, },
                    destroyer: { bow: { x: 4, y: 0 }, stern: { x: 4, y: 4 } },
                });
            });
        });

    });

    describe('#constructor()', () => {

        it('works with valid coordinates', () => {
            let bow = { x: 0, y: 0 };
            let stern = { x: 0, y: 1 };
            let s = new ship.Ship({ bow: bow, stern: stern });
            assert.equal(s.bow.x, bow.x);
            assert.equal(s.bow.y, bow.y);
            assert.equal(s.stern.x, stern.x);
            assert.equal(s.stern.y, stern.y);
        });

        it('fails when a ship is too wide', () => {
            let bow = { x: 0, y: 0 };
            let stern = { x: 1, y: 1 };
            assert.throws(() => { new ship.Ship({ bow: bow, stern: stern })});
        });

        it('fails when a ship is not integral', () => {
            let bow = { x: 0.5, y: 0 };
            let stern = { x: 0.5, y: 1 };
            assert.throws(() => { new ship.Ship({ bow: bow, stern: stern })});
        });

        it('fails when a ship is outside the board', () => {
            let bow = { x: -1, y: 0 };
            let stern = { x: -1, y: 1 };
            assert.throws(() => { new ship.Ship({ bow: bow, stern: stern })});
        });

        it('fails when a ship that is not numeric', () => {
            let bow = { x: 'a', y: 0 };
            let stern = { x: 'a', y: 1 };
            assert.throws(() => { new ship.Ship({ bow: bow, stern: stern })});
        });

    });

    describe('#collides()', () => {
        it('does not collide ships which do not overlap', () => {
            let s1 = new ship.Ship({ bow: { x: 0, y: 0 }, stern: { x: 0, y: 1 } });
            let s2 = new ship.Ship({ bow: { x: 1, y: 0 }, stern: { x: 1, y: 1 } });
            assert(!s1.collides(s2));
            assert(!s2.collides(s1));
        });
        it('collides ships which do overlap', () => {
            let s1 = new ship.Ship({ bow: { x: 0, y: 0 }, stern: { x: 0, y: 1 } });
            let s2 = new ship.Ship({ bow: { x: 0, y: 1 }, stern: { x: 0, y: 2 } });
            assert(s1.collides(s2));
            assert(s2.collides(s1));
        });
    });

    describe('#hit()', () => {

        it('does not hit with a bad shot', () => {
            let s = new ship.Ship({ bow: { x: 0, y: 0 }, stern: { x: 0, y: 1 } });
            let shot = new coordinate.Coordinate({ x: 1, y: 1});
            assert(!s.hit(shot));
        });

        it('does hit with a good shot', () => {
            let s = new ship.Ship({ bow: { x: 0, y: 0 }, stern: { x: 0, y: 1 } });
            let shot = new coordinate.Coordinate({ x: 0, y: 0});
            assert(s.hit(shot));
        });

    });

    describe('#size', () => {

        it('calculates size 2 ships correctly', () => {
            let bow = { x: 0, y: 0 };
            let stern = { x: 0, y: 1 };
            let s = new ship.Ship({ bow: bow, stern: stern });
            assert.equal(s.size, 2);
        });

        it('calculates size 5 ships correctly', () => {
            let bow = { x: 0, y: 0 };
            let stern = { x: 0, y: 4 };
            let s = new ship.Ship({ bow: bow, stern: stern });
            assert.equal(s.size, 5);
        });

        it('calculates backwards ship sizes correctly', () => {
            let bow = { x: 0, y: 4 };
            let stern = { x: 0, y: 0 };
            let s = new ship.Ship({ bow: bow, stern: stern });
            assert.equal(s.size, 5);
        });

        it('calculates vertial ships correctly', () => {
            let bow = { x: 0, y: 0 };
            let stern = { x: 4, y: 0 };
            let s = new ship.Ship({ bow: bow, stern: stern });
            assert.equal(s.size, 5);
        });

    });

    describe('#sunk', () => {

        it('does not sink a ship with no hits', () => {
            let s = new ship.Ship({ bow: { x: 0, y: 0 }, stern: { x: 0, y: 1 } });
            assert(!s.sunk);
        });

        it('does not sink a ship with some hits', () => {
            let s = new ship.Ship({ bow: { x: 0, y: 0 }, stern: { x: 0, y: 1 } });
            let shot = new coordinate.Coordinate({ x: 0, y: 0 });
            assert(s.hit(shot));
            assert(!s.sunk);
        });

        it('does sink a ship with all hits', () => {
            let s = new ship.Ship({ bow: { x: 0, y: 0 }, stern: { x: 0, y: 1 } });
            let shot1 = new coordinate.Coordinate({ x: 0, y: 0 });
            assert(s.hit(shot1));
            let shot2 = new coordinate.Coordinate({ x: 0, y: 1 });
            assert(s.hit(shot2));
            assert(s.sunk);
        });

    });


});
