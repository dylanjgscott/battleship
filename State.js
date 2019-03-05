const Ship = require('./Ship.js');

class State {

    constructor(state) {
        // Clone an existing state
        if(state) {
            this.board = Array.from(state.board, row => Array.from(row));
            this.ships = Array.from(state.ships);
        }
        // Create a new state
        else {
            this.board = Array(10).fill().map(() => Array(10).fill('ocean'));
            this.ships = Object.keys(Ship.SHIPS);
        }
    }

}
module.exports = State;
