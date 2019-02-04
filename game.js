const battleship = require("./battleship");
const idiot = require("./idiot");

class Game {

    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.player1Ships = player1.getShips();
        this.player2Ships = player2.getShips();
        this.player1State = new State();
        this.player2State = new State();
    }

    play() {
        let currentPlayer = this.player1;
        let currentShips = this.player2Ships;
        let currentState = this.player1State;
        let nextPlayer = this.player2;
        let nextShips = this.player1Ships;
        let nextState = this.player2State;
        while(!this.gameover) {
            let currentShot = currentPlayer.getShot(currentState);
            console.log(currentShot);
            this.shoot(currentShips, currentShot, currentState);
            [currentPlayer, nextPlayer] = [nextPlayer, currentPlayer];
            [currentShips, nextShips] = [nextShips, currentShips];
            [currentState, nextState] = [nextState, currentState];
        }
        if(this.shipsSunk(this.player1Ships)) {
            console.log('player 2 wins');
        }
        if(this.shipsSunk(this.player2Ships)) {
            console.log('player 1 wins');
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
        if(this.shipsSunk(this.player1Ships) || this.shipsSunk(this.player2Ships)) {
            return true;
        }
        else {
            return false;
        }
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

player1 = new idiot.Player();
player2 = new idiot.Player();
game = new Game(player1, player2);
game.play();
