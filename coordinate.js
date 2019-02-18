const assert = require('assert');

class Coordinate {

    constructor(options) {
        // No cheeky real numbers
        assert(options.x === Math.floor(options.x));
        assert(options.y === Math.floor(options.y));
        // No cheeky coordinates off the board
        assert(options.x >= 0 && options.x <= 9);
        assert(options.y >= 0 && options.y <= 9);
        // Seems ok
        this.x = options.x;
        this.y = options.y;
    }

}
exports.Coordinate = Coordinate;
