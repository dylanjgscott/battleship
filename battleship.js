class Coordinate {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}

class Game {

    constructor(player1, player2) {
        // Prepare player 1
        this.currentPlayer = player1;
        this.currentPlayer.opponent = player2.name;
        try {
            this.currentPlayerShips = this.currentPlayer.ships;
        }
        catch(error) {
            this.currentPlayerShips = [];
        }
        this.currentPlayerState = new State();
        // Prepare player 2
        this.nextPlayer = player2;
        this.nextPlayer.opponent = player1.name;
        try {
            this.nextPlayerShips = this.nextPlayer.ships;
        }
        catch(error) {
            this.nextPlayerShips = [];
        }
        this.nextPlayerState = new State();
    }

    play() {
        while(!this.gameover) {
            try {
                let shot = this.currentPlayer.shoot(this.currentPlayerState);
                this.shoot(this.nextPlayerShips, shot, this.currentPlayerState);
            }
            catch(error) {
                this.currentPlayerShips = [];
            }
            [this.currentPlayer, this.nextPlayer] = [this.nextPlayer, this.currentPlayer];
            [this.currentPlayerShips, this.nextPlayerShips] = [this.nextPlayerShips, this.currentPlayerShips];
            [this.currentPlayerState, this.nextPlayerState] = [this.nextPlayerState, this.currentPlayerState];
        }
    }

    shoot(ships, shot, state) {
        for(let i in ships) {
            let ship = ships[i];
            if(ship.checkShot(shot)) {
                state.board[shot.x][shot.y] = 'hit';
            }
            else {
                state.board[shot.x][shot.y] = 'miss';
            }
        }
    }

    shipsSunk(ships) {
        for(let i in ships) {
            let ship = ships[i];
            if(!ship.sunk) {
                return false;
            }
        }
        return true;
    }

    get gameover() {
        if(this.shipsSunk(this.currentPlayerShips) || this.shipsSunk(this.nextPlayerShips)) {
            return true;
        }
        else {
            return false;
        }
    }

    get winner() {
        if(this.shipsSunk(this.currentPlayerShips)) {
            return this.nextPlayer;
        }
        if(this.shipsSunk(this.nextPlayerShips)) {
            return this.currentPlayer;
        }
    }

    get loser() {
        if(this.shipsSunk(this.currentPlayerShips)) {
            return this.currentPlayer;
        }
        if(this.shipsSunk(this.nextPlayerShips)) {
            return this.nextPlayer;
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
        this.start = start;
        this.end = end;
        this.hits = [];
    }

    // check if a shot hits or not
    checkShot(shot) {
        // x too wide
        if(shot.x < this.start.x || shot.x > this.end.x) {
            return false;
        }
        // y too wide
        if(shot.y < this.start.y || shot.y > this.end.y) {
            return false;
        }
        // already hit there
        for(let i in this.hits) {
            let hit = this.hits[i];
            if(shot.x == hit.x && shot.y == hit.y) {
                return false;
            }
        }
        // ok it was a hit so remember where
        this.hits.push(shot);
        return true;
    }

    // ship status
    get sunk() {
        // floating
        if(this.hits.length < this.size) {
            return false;
        }
        // sunk
        else {
            return true;
        }

    }

    // number of squares occupied by ship
    get size() {
        return (this.end.x - this.start.x + 1) * (this.end.y - this.start.y + 1);
    }

}

class State {

    constructor() {
        this.board = [];
        for(let x = 0; x < 10; x++) {
            this.board[x] = [];
            for(let y = 0; y < 10; y++) {
                this.board[x][y] = 'ocean';
            }
        }
    }

}

exports.Coordinate = Coordinate;
exports.Game = Game;
exports.Ship = Ship;
exports.Shot = Shot;
exports.State = State;
