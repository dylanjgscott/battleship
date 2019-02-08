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
        this.currentPlayerShips = player1.vm.run('player.ships');
        this.currentPlayerState = player1.vm.run('state = new battleship.State()');
        
        // Prepare player 2
        this.nextPlayer = player2;
        this.nextPlayerShips = player2.vm.run('player.ships');
        this.nextPlayerState = player2.vm.run('state = new battleship.State()');
    }

    play() {
        while(!this.gameover) {
            try {
                let shot = this.currentPlayer.vm.run('player.shoot(state)');
                this.shoot(shot);
            }
            catch(error) {
                console.log(error);
                this.currentPlayerShips = [];
            }
            [this.currentPlayer, this.nextPlayer] = [this.nextPlayer, this.currentPlayer];
            [this.currentPlayerShips, this.nextPlayerShips] = [this.nextPlayerShips, this.currentPlayerShips];
            [this.currentPlayerState, this.nextPlayerState] = [this.nextPlayerState, this.currentPlayerState];
        }
    }

    shoot(shot) {
        if(this.nextPlayerShips.some(ship => ship.checkShot(shot))) {
            this.currentPlayerState.board[shot.x][shot.y] = 'hit';
        }
        else {
            this.currentPlayerState.board[shot.x][shot.y] = 'miss';
        }
    }

    shipsSunk(ships) {
        return ships.every(ship => ship.sunk);
    }

    get gameover() {
        return this.shipsSunk(this.currentPlayerShips) || this.shipsSunk(this.nextPlayerShips);
    }

    get winner() {
        if(this.shipsSunk(this.currentPlayerShips)) {
            return this.nextPlayer;
        }
        if(this.shipsSunk(this.nextPlayerShips)) {
            return this.currentPlayer;
        }
        return null;
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
        if(this.hits.some(hit => hit.x === shot.x && hit.y == shot.y)) {
            return false;
        }
        // ok it was a hit so remember where
        this.hits.push(shot);
        return true;
    }

    // ship status
    get sunk() {
        return this.hits.length >= this.size;
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

    toString() {
        let string = "";
        this.board.forEach(x => {
            x.forEach(y => {
                if(y === 'ocean') {
                    string += 'O';
                }
                if(y === 'miss') {
                    string += 'M';
                }
                if(y === 'hit') {
                    string += 'H';
                }
            });
            string += '\n';
        });
        return string;
    }

}

exports.Coordinate = Coordinate;
exports.Game = Game;
exports.Ship = Ship;
exports.Shot = Shot;
exports.State = State;
