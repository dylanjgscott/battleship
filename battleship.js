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

}

class Game {

    constructor(player1, player2) {

        // Prepare player 1
        this.currentPlayer = player1;
        this.currentPlayer.ships = player1.vm.run('player.ships');
        this.currentPlayer.state = player1.vm.run('state = new battleship.State()');
        if(!this.shipsValid(this.currentPlayer.ships)) {
            this.currentPlayer.ships = {};
        }
        
        // Prepare player 2
        this.nextPlayer = player2;
        this.nextPlayer.ships = player2.vm.run('player.ships');
        this.nextPlayer.state = player2.vm.run('state = new battleship.State()');
        if(!this.shipsValid(this.nextPlayer.ships)) {
            this.nextPlayer.ships = {};
        }
    }

    play() {
        while(!this.gameover) {
            try {
                let shot = this.currentPlayer.vm.run('player.shoot(state)');
                this.shoot(shot);
            }
            catch(error) {
                console.log(error);
                this.currentPlayer.ships = {};
            }
            [this.currentPlayer, this.nextPlayer] = [this.nextPlayer, this.currentPlayer];
            [this.currentPlayerShips, this.nextPlayerShips] = [this.nextPlayerShips, this.currentPlayerShips];
            [this.currentPlayerState, this.nextPlayerState] = [this.nextPlayerState, this.currentPlayerState];
        }
    }

    shoot(shot) {
        if(Object.values(this.nextPlayer.ships).some(ship => ship.checkShot(shot))) {
            this.currentPlayer.state.board[shot.x][shot.y] = 'hit';
        }
        else {
            this.currentPlayer.state.board[shot.x][shot.y] = 'miss';
        }
    }

    shipsSunk(ships) {
        return Object.values(ships).every(ship => ship.sunk);
    }

    shipsValid(ships) {
        try {
            if(Object.keys(ships).length !== Object.keys(SHIPS).length) {
                console.log('incorrect number of ships!');
                return false;
            }
            for(let i in Object.keys(SHIPS)) {
                let key = Object.keys(SHIPS)[i];
                console.log('key: '+ key);
                if(SHIPS[key] !== ships[key].size) {
                    console.log('invalid ship size!');
                    return false;
                }
            }
            if(!Object.values(ships).every(ship => ship.valid)) {
                console.log('invalid ship found!');
                return false;
            }
            for(let i = 0; i < Object.values(ships).length-1; i++) {
                for(let j = i+1; j < Object.values(ships).length; j++) {
                    if(this.shipsCollide(Object.values(ships)[i], Object.values(ships)[j])) {
                        console.log('ships collide!');
                        return false;
                    }
                }
            }
        }
        catch(error) {
            console.log(error);
            return false;
        }
        return true;
    }

    shipsCollide(ship1, ship2) {
        if(ship1.start.x > ship2.end.x || ship2.start.x > ship1.end.x) {
            return false;
        }
        if(ship1.start.y > ship2.end.y || ship2.start.y > ship1.end.y) {
            return false;
        }
        return true;
    }

    get gameover() {
        return this.shipsSunk(this.currentPlayer.ships) || this.shipsSunk(this.nextPlayer.ships);
    }

    get winner() {
        if(!this.shipsSunk(this.currentPlayer.ships) && this.shipsSunk(this.nextPlayer.ships)) {
            return this.currentPlayer;
        }
        if(!this.shipsSunk(this.nextPlayer.ships) && this.shipsSunk(this.currentPlayer.ships)) {
            return this.nextPlayer;
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

    get valid() {
        try{
            // must be integral
            if(this.start.x !== Math.floor(this.start.x) ||
               this.start.y !== Math.floor(this.start.y) ||
               this.end.x !== Math.floor(this.end.x) ||
               this.start.y !== Math.floor(this.start.y)) {
                console.log('non-integral ship!');
                return false;
            }
            // must be on board
            if(this.start.x < 0 || this.start.x > 9 ||
               this.start.y < 0 || this.start.y > 9 ||
               this.end.x < 0 || this.end.x > 9 ||
               this.end.y < 0 || this.end.y > 9) {
                console.log('ship placed outside board!');
                return false;
            }
            // must not be too wide
            if(this.start.x !== this.end.x && this.start.y != this.end.y){
                console.log('ship too wide!');
                return false;
            }
        }
        catch(error) {
            console.log(error);
            return false;
        }
        // i guess it's fine
        return true;
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
        this.ships = Object.keys(SHIPS);
    }

}

exports.SHIPS = SHIPS;
exports.Coordinate = Coordinate;
exports.Game = Game;
exports.Ship = Ship;
exports.Shot = Shot;
exports.State = State;
