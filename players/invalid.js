const battleship = require("../battleship");

class Player {

    static get name() {
        return "Invalid";
    }

    get ships() {
        return [
            new battleship.Ship(new battleship.Coordinate(0, 0), new battleship.Coordinate(0, 1)),
            new battleship.Ship(new battleship.Coordinate(1, 0), new battleship.Coordinate(1, 2)),
            new battleship.Ship(new battleship.Coordinate(2, 0), new battleship.Coordinate(2, 2)),
            new battleship.Ship(new battleship.Coordinate(3, 0), new battleship.Coordinate(3, 3)),
            new battleship.Ship(new battleship.Coordinate(4, 0), new battleship.Coordinate(4, 4)),
        ];
    }

    shoot(state) {
        throw "I don't know what to do";
    }

}

exports.Player = Player;