const SHIPS = {
    carrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2,
}

class Coordinate {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get valid() {
        // must be integral
        if(this.x !== Math.floor(this.x) ||
           this.y !== Math.floor(this.y)) {
            return false;
        }
        // must be on board
        if(this.x < 0 || this.x > 9 ||
           this.y < 0 || this.y > 9) {
            return false;
        }
        // i guess it's ok
        return true
    }
}

class Game {

    static shipsSunk(ships) {
        // return true if all ships sunk
        return Object.values(ships).every(ship => ship.sunk);
    }

    static shipsValid(ships) {
        try {
            // check number of ships
            if(Object.keys(ships).length !== Object.keys(SHIPS).length) {
                return false;
            }
            // make sure ship sizes are correct
            for(let i in Object.keys(SHIPS)) {
                let key = Object.keys(SHIPS)[i];
                if(SHIPS[key] !== ships[key].size) {
                    return false;
                }
            }
            // make sure ships are valid
            if(!Object.values(ships).every(ship => ship.valid)) {
                return false;
            }
            // make sure ships don't collide
            for(let i = 0; i < Object.values(ships).length-1; i++) {
                for(let j = i+1; j < Object.values(ships).length; j++) {
                    if(Object.values(ships)[i].collides(Object.values(ships)[j])) {
                        return false;
                    }
                }
            }
        }
        // throwing an error is not valid
        catch(error) {
            return false;
        }
        // i guess it's ok
        return true;
    }

    constructor(player1, player2) {
        // Prepare player 1
        this.player1 = {};
        try {
            this.player1.player = player1;
            this.player1.ships = player1.vm.run('player.ships');
            this.player1.state = player1.vm.run('state = new battleship.State()');
            this.player1.vm = player1.vm;
            if(!Game.shipsValid(this.player1.ships)) {
                throw 'invalid ships';
            }
        }
        catch(error) {
            this.player1.ships = {};
        }
        // Prepare player 2
        this.player2 = {};
        try {
            this.player2.player = player2;
            this.player2.ships = player2.vm.run('player.ships');
            this.player2.state = player2.vm.run('state = new battleship.State()');
            this.player2.vm = player2.vm;
            if(!Game.shipsValid(this.player2.ships)) {
                throw 'invalid ships';
            }
        }
        catch(error) {
            this.player2.ships = {};
        }
        this.currentPlayer = this.player1;
        this.nextPlayer = this.player2;
    }

    turn(shot) {
        try {
            // make sure the shot is valid and hits ocean
            if(!shot.valid || this.currentPlayer.state.board[shot.x][shot.y] !== 'ocean') {
                throw 'invalid shot';
            }
            // shot hits
            if(Object.values(this.nextPlayer.ships).some(ship => ship.hit(shot))) {
                // update board state
                this.currentPlayer.state.board[shot.x][shot.y] = 'hit';
                Object.keys(this.nextPlayer.ships).forEach(shipName => {
                    let ship = this.nextPlayer.ships[shipName];
                    if(ship.sunk) {
                        for(let x = ship.start.x; x <= ship.end.x; x++) {
                            for(let y = ship.start.y; y <= ship.end.y; y++) {
                                this.currentPlayer.state.board[x][y] = 'sunk';
                            }
                        }
                    }
                });
                // update ship state
                this.currentPlayer.state.ships = Object.keys(this.nextPlayer.ships).filter(shipName => {
                    return !this.nextPlayer.ships[shipName].sunk;
                });
            }
            // shot misses
            else {
                // update board state
                this.currentPlayer.state.board[shot.x][shot.y] = 'miss';
            }
        }
        catch(error) {
            // disqualification
            this.currentPlayer.ships = {};
        }
    }

    get winner() {
        // play until someone wins
        while(true) {
            try {
                // get the players shot
                let shot = this.currentPlayer.vm.run('player.shoot(state)');
                // take a turn
                this.turn(shot);
            }
            catch(error) {
                // disqualification
                this.currentPlayer.ships = {};
            }
            // opponent ships sunk
            if(Game.shipsSunk(this.nextPlayer.ships)) {
                // player ships still afloat
                if(!Game.shipsSunk(this.currentPlayer.ships)) {
                    // winner winner chicken dinner
                    return this.currentPlayer.player;
                }
                // both players ships sunk, invalid match
                return null;
            }
            // swap players
            [this.currentPlayer, this.nextPlayer] = [this.nextPlayer, this.currentPlayer];
        }
    }

}

class Shot extends Coordinate {}

class Ship {

    constructor(start, end) {
        // swap x, if needed
        if(start.x > end.x) {
            [start.x, end.x] = [end.x, start.x];
        }
        // swap y, if needed
        if(start.y > end.y) {
            [start.y, end.y] = [end.y, start.y];
        }
        // remember start and end points
        this.start = start;
        this.end = end;
        // initialise hit counter
        this.hits = [];
    }

    collides(ship) {
        // ships too far on x
        if(this.start.x > ship.end.x || ship.start.x > this.end.x) {
            return false;
        }
        // ships too far on y
        if(this.start.y > ship.end.y || ship.start.y > this.end.y) {
            return false;
        }
        // ships collide
        return true;
    }

    // check if a shot hits or not
    hit(shot) {
        // x too wide
        if(shot.x < this.start.x || shot.x > this.end.x) {
            return false;
        }
        // y too wide
        if(shot.y < this.start.y || shot.y > this.end.y) {
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

    // number of squares occupied by ship
    get size() {
        return (this.end.x - this.start.x + 1) * (this.end.y - this.start.y + 1);
    }

    // ship status
    get sunk() {
        return this.hits.length >= this.size;
    }

    // valid ship tests
    get valid() {
        try{
            // must have valid coordinates
            if(!this.start.valid || !this.end.valid) {
                return false;
            }
            // must not be too wide
            if(this.start.x !== this.end.x && this.start.y != this.end.y){
                return false;
            }
        }
        // throwing an error is invalid
        catch(error) {
            return false;
        }
        // i guess it's ok
        return true;
    }

}

class State {

    constructor() {
        // keep track of the board state
        this.board = [];
        // initialise the board state
        for(let x = 0; x < 10; x++) {
            this.board[x] = [];
            for(let y = 0; y < 10; y++) {
                // all squares are ocean at the start
                this.board[x][y] = 'ocean';
            }
        }
        // keep track of which ships are in play
        this.ships = Object.keys(SHIPS);
    }

}

exports.SHIPS = SHIPS;
exports.Coordinate = Coordinate;
exports.Game = Game;
exports.Ship = Ship;
exports.Shot = Shot;
exports.State = State;
