const assert = require('assert');
const Coordinate = require('./Coordinate');
const Log = require('./Log');
const Ship = require('./Ship');
const State = require('./State');

class Game {

    static initialisePlayer(player, opponent) {
        let p = {};
        p.player = player;
        p.log = new Log();
        p.state = new State();
        try {
            player.vm.protect(opponent.name, 'opponent');
            player.vm.protect(p.log, 'console');
            player.vm.run('player.opponent = opponent');
            p.ships = Ship.loadShips(player.vm.run('player.ships'));
        }
        catch(error) {
            p.log.error(error);
            p.ships = {};
        }
        return p;
    }

    constructor(player1, player2) {
        // Prepare player 1
        this.player1 = Game.initialisePlayer(player1, player2);
        // Prepare player 2
        this.player2 = Game.initialisePlayer(player2, player1);
        // Player 1 will start
        this.currentPlayer = this.player1;
        this.nextPlayer = this.player2;
    }

    turn(shot) {
        // only allowed to shoot ocean cell
        assert.equal(this.currentPlayer.state.board[shot.x][shot.y], 'ocean');
        // shot hits
        if(Object.values(this.nextPlayer.ships).some(ship => ship.hit(shot))) {
            // update board state
            this.currentPlayer.state.board[shot.x][shot.y] = 'hit';
            Object.keys(this.nextPlayer.ships).forEach(shipName => {
                let ship = this.nextPlayer.ships[shipName];
                if(ship.sunk) {
                    for(let x = ship.bow.x; x <= ship.stern.x; x++) {
                        for(let y = ship.bow.y; y <= ship.stern.y; y++) {
                            this.currentPlayer.state.board[x][y] = 'sunk';
                        }
                    }
                }
            });
            // update ship state
            this.currentPlayer.state.ships = Object.keys(this.nextPlayer.ships).filter(shipName => !this.nextPlayer.ships[shipName].sunk);
        }
        // shot misses
        else {
            // update board state
            this.currentPlayer.state.board[shot.x][shot.y] = 'miss';
        }
        // update log
        this.currentPlayer.log.shot(shot, this.currentPlayer.state.board[shot.x][shot.y]);
    }

    get winner() {
        // play until someone wins
        while(true) {
            try {
                // pass in a copy of the current state
                this.currentPlayer.player.vm.protect(new State(this.currentPlayer.state), 'state');
                // get the players shot
                let shot = new Coordinate(this.currentPlayer.player.vm.run('player.shoot(state)'));
                // take a turn
                this.turn(shot);
            }
            catch(error) {
                this.currentPlayer.log.error(error);
                return this.nextPlayer.player;
            }
            // opponent ships sunk
            if(Object.keys(this.nextPlayer.ships).every(shipName => this.nextPlayer.ships[shipName].sunk)) {
                // player ships still afloat
                if(!Object.keys(this.currentPlayer.ships).every(shipName => this.currentPlayer.ships[shipName].sunk)) {
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
module.exports = Game;
