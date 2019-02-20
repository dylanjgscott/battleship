const assert = require('assert');
const coordinate = require('./coordinate');

const SHIPS = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
}
exports.SHIPS = SHIPS;

class Ship {

    // Load ships from player
    static loadShips(playerShips) {
        // Make sure the right number of ships are present
        assert.equal(Object.keys(SHIPS).length, Object.keys(playerShips).length);
        // Load the ships
        let ships = {};
        Object.keys(SHIPS).forEach(shipName => ships[shipName] = new Ship(playerShips[shipName]));
        // Make sure none of the ships collide
        Object.keys(SHIPS).forEach(shipName1 => {
            Object.keys(SHIPS).forEach(shipName2 => {
                if(shipName1 !== shipName2) {
                    assert(!ships[shipName1].collides(ships[shipName2]));
                }
            });
        });
        // Make sure the ship sizes are correct
        Object.keys(SHIPS).forEach(shipName => assert.equal(SHIPS[shipName], ships[shipName].size));
        return ships;
    }

    constructor(options) {
        // Ship must only be 1 cell wide
        assert(options.bow.x === options.stern.x || options.bow.y === options.stern.y);
        // Swap x, if needed
        if(options.bow.x > options.stern.x) {
            [options.bow.x, options.stern.x] = [options.stern.x, options.bow.x];
        }
        // Swap y, if needed
        if(options.bow.y > options.stern.y) {
            [options.bow.y, options.stern.y] = [options.stern.y, options.bow.y];
        }
        // Create coordinates for ship
        this.bow = new coordinate.Coordinate(options.bow);
        this.stern = new coordinate.Coordinate(options.stern);
        // Initialise hit counter
        this.hits = [];
    }

    // Check if ship collides with another ship
    collides(ship) {
        // ships too far on x
        if(this.bow.x > ship.stern.x || ship.bow.x > this.stern.x) {
            return false;
        }
        // ships too far on y
        if(this.bow.y > ship.stern.y || ship.bow.y > this.stern.y) {
            return false;
        }
        // ships collide
        return true;
    }

    // check if a shot hits or not
    hit(shot) {
        // x too wide
        if(shot.x < this.bow.x || shot.x > this.stern.x) {
            return false;
        }
        // y too wide
        if(shot.y < this.bow.y || shot.y > this.stern.y) {
            return false;
        }
        // already hit there
        if(this.hits.some(hit => hit.x === shot.x && hit.y === shot.y)) {
            return false;
        }
        // ok it was a hit so remember where
        this.hits.push(shot);
        return true;
    }

    // number of cells occupied by ship
    get size() {
        return (this.stern.x - this.bow.x + 1) * (this.stern.y - this.bow.y + 1);
    }

    // ship status
    get sunk() {
        return this.hits.length >= this.size;
    }

}
exports.Ship = Ship;
