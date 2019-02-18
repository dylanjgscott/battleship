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
            carrier: {
                bow: { x: 0, y: 0 },
                stern: { x: 0, y: 4 },
            },
            battleship: {
                bow: { x: 1, y: 0 },
                stern: { x: 1, y: 3 },
            },
            cruiser: {
                bow: { x: 2, y: 0 },
                stern: { x: 2, y: 2 },
            },
            submarine: {
                bow: { x: 3, y: 0 },
                stern: { x: 3, y: 2 },
            },
            destroyer: {
                bow: { x: 4, y: 0 },
                stern: { x: 4, y: 1 },
            },
        };
    }

    // use this function to shoot the enemy ships
    //
    // shot rules:
    // - shooting a square twice will lose you the match
    //
    // the current state of the game will be provided
    //
    // state.board is a 10 by 10 array which can be one of 3 values:
    // - 'ocean': a square you have not shot
    // - 'miss': a square you have shot but no ship is present
    // - 'hit': a square you have shot and hit a ship but the ship is still afloat
    // - 'sunk': a square you have shot and hit and the ship has sunk
    //
    // state.ships is an array of ship names which the opponent still has in play
    // the possible values in the array are:
    // - carrier
    // - battleship
    // - cruiser
    // - submarine
    // - destroyer
    shoot(state) {
        let shot;
        state.board.forEach((row, x) => {
            row.forEach((cell, y) => {
                if(cell === 'ocean') {
                    shot = {x: x, y: y};
                }
            });
        });
        return shot;
    }

}
