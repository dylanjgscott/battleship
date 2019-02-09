// example battleship player class
//
// general info:
// - battleships!
// - provide javascript functions below to place your ships and shoot the enemy
// - winner takes all
// - the playing field is a 10 by 10 grid starting at (0,0) and finishing at (9,9)
// - the battleship module is loaded for you
// - all coordinate values must be integers (0,1,2,3,4,5,6,7,8,9)
// - all coordinates must be within the board
// - throwing an exception will lose the match
// - taking more than 1000ms will lose the match
// - run the server locally for testing your players if you want `node server.js`

class Player {

    // set your players name here
    get name() {
        return 'Example';
    }

    // the opponent name will be set at the start of each match
    set opponent(opponent) {
        this._opponent = opponent;
    }

    // use this function to place your ships at the start of each round
    //
    // ship placement rules:
    // - ships must be entirely within the board
    // - ships can't overlap
    // - all ships must be present
    // - no extra ships can be present
    // - ships must not be more than one wide
    // - carrier must be 5 long
    // - battleship must be 4 long
    // - cruiser must be 3 long
    // - submarine must be 3 long
    // - destroyer must be 2 long
    get ships() {
        return {
            carrier: new battleship.Ship(new battleship.Coordinate(4, 0), new battleship.Coordinate(4, 4)),
            battleship: new battleship.Ship(new battleship.Coordinate(3, 0), new battleship.Coordinate(3, 3)),
            cruiser: new battleship.Ship(new battleship.Coordinate(1, 0), new battleship.Coordinate(1, 2)),
            submarine: new battleship.Ship(new battleship.Coordinate(2, 0), new battleship.Coordinate(2, 2)),
            destroyer: new battleship.Ship(new battleship.Coordinate(0, 0), new battleship.Coordinate(0, 1)),
        };
    }

    // use this function to shoot the enemy ships
    //
    // shot rules:
    // - shooting a square twice will lose you the match
    //
    // state.board is a 10 by 10 array which can be one of 3 values:
    // - 'ocean': a square you have not shot
    // - 'hit': a square you have shot and hit a ship
    // - 'miss': a square you have shot but no ship is present
    //
    // state.ships is an array of ship names which the opponent still has in play
    // the possible values in the array are:
    // - carrier
    // - battleship
    // - cruiser
    // - submarine
    // - destroyer
    shoot(state) {
        for(let x = 0; x < 10; x++) {
            for(let y = 0; y < 10; y++) {
                if(state.board[x][y] === 'ocean') {
                    return new battleship.Shot(x, y);
                }
            }
        }
    }

}
