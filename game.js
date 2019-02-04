const battleship = require("./battleship");
const idiot = require("./players/idiot");
const invalid = require("./players/invalid");

class Game {

    constructor(player1, player2) {
        // Prepare player 1
        this.currentPlayer = player1;
        try {
            this.currentPlayerShips = this.currentPlayer.getShips();
        }
        catch(e) {
            console.log("Invalid ships! '" + this.currentPlayer.name + "' disqualified!");
            this.currentPlayerShips = [];
        }
        this.currentPlayerState = new State();
        // Prepare player 2
        this.nextPlayer = player2;
        try {
            this.nextPlayerShips = this.nextPlayer.getShips();
        }
        catch(e) {
            console.log("Invalid ships! '" + this.nextPlayer.name + "' disqualified!");
            this.nextPlayerShips = [];
        }
        this.nextPlayerState = new State();
    }

    play() {
        while(!this.gameover) {
            try {
                let shot = this.currentPlayer.getShot(this.currentPlayerState);
                this.shoot(this.nextPlayerShips, shot, this.currentPlayerState);
                console.log("'" + this.currentPlayer.name + "' shot " + shot.x + " " + shot.y + ".");
            }
            catch(err) {
                console.log("Invalid shot! '" + this.currentPlayer.name + "' disqualified!");
                this.currentPlayerShips = [];
            }
            [this.currentPlayer, this.nextPlayer] = [this.nextPlayer, this.currentPlayer];
            [this.currentPlayerShips, this.nextPlayerShips] = [this.nextPlayerShips, this.currentPlayerShips];
            [this.currentPlayerState, this.nextPlayerState] = [this.nextPlayerState, this.currentPlayerState];
        }
        if(this.shipsSunk(this.currentPlayerShips)) {
            console.log("'" + this.nextPlayer.name +  "' wins!");
        }
        else if(this.shipsSunk(this.nextPlayerShips)) {
            console.log("'" + this.currentPlayer.name +  "' wins!");
        }
        else {
            console.log("Draw?");
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
player2 = new invalid.Player();
game = new Game(player1, player2);
game.play();
