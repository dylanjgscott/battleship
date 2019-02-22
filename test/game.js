const assert = require('assert');
const Coordinate = require('../Coordinate');
const Game = require('../Game');
const Player = require('../Player');

describe('Player', () => {

    describe('#turn()', () => {

        beforeEach(() => {
            this.player1 = Player.loadFromFile('test/players/valid.js');
            this.player2 = Player.loadFromFile('test/players/valid.js');
            this.game = new Game(this.player1, this.player2);
        });

        it('updates the board on miss', () => {
            assert.equal(this.game.player1.state.board[9][9], 'ocean');
            this.game.turn(new Coordinate({ x: 9, y: 9 }));
            assert.equal(this.game.player1.state.board[9][9], 'miss');
            assert.equal(this.game.player1.state.board[0][0], 'ocean');
            assert.equal(this.game.player1.state.board[0][9], 'ocean');
            assert.equal(this.game.player1.state.board[9][0], 'ocean');
        });

        it('updates the board on hit', () => {
            assert.equal(this.game.player1.state.board[0][0], 'ocean');
            this.game.turn(new Coordinate({ x: 0, y: 0 }));
            assert.equal(this.game.player1.state.board[0][0], 'hit');
            assert.equal(this.game.player1.state.board[0][1], 'ocean');
            assert.equal(this.game.player1.state.board[1][0], 'ocean');
            assert.equal(this.game.player1.state.board[1][1], 'ocean');
        });

        it('updates the board on sink', () => {
            assert.equal(this.game.player1.state.board[0][0], 'ocean');
            assert.equal(this.game.player1.state.board[0][1], 'ocean');
            assert.equal(this.game.player1.state.board[0][2], 'ocean');
            assert.equal(this.game.player1.state.board[0][3], 'ocean');
            assert.equal(this.game.player1.state.board[0][4], 'ocean');
            this.game.turn(new Coordinate({ x: 0, y: 0 }));
            this.game.turn(new Coordinate({ x: 0, y: 1 }));
            this.game.turn(new Coordinate({ x: 0, y: 2 }));
            this.game.turn(new Coordinate({ x: 0, y: 3 }));
            this.game.turn(new Coordinate({ x: 0, y: 4 }));
            assert(this.game.player2.ships.carrier.sunk);
            assert.equal(this.game.player1.state.board[0][0], 'sunk');
            assert.equal(this.game.player1.state.board[0][1], 'sunk');
            assert.equal(this.game.player1.state.board[0][2], 'sunk');
            assert.equal(this.game.player1.state.board[0][3], 'sunk');
            assert.equal(this.game.player1.state.board[0][4], 'sunk');
        });

        it('updates the log on miss', () => {
            assert.equal(this.game.player1.state.log.length, 0);
            let shot = new Coordinate({ x: 9, y: 9 });
            this.game.turn(shot);
            assert.equal(this.game.player1.state.log[0].shot, shot);
            assert.equal(this.game.player1.state.log[0].state, 'miss');
        });

        it('updates the log on hit', () => {
            assert.equal(this.game.player1.state.log.length, 0);
            let shot = new Coordinate({ x: 0, y: 0 });
            this.game.turn(shot);
            assert.equal(this.game.player1.state.log[0].shot, shot);
            assert.equal(this.game.player1.state.log[0].state, 'hit');
        });

        it('updates the log on sink', () => {
            assert.equal(this.game.player1.state.log.length, 0);
            this.game.turn(new Coordinate({ x: 0, y: 0 }));
            this.game.turn(new Coordinate({ x: 0, y: 1 }));
            this.game.turn(new Coordinate({ x: 0, y: 2 }));
            this.game.turn(new Coordinate({ x: 0, y: 3 }));
            this.game.turn(new Coordinate({ x: 0, y: 4 }));
            assert.equal(this.game.player1.state.log.length, 5);
            assert.equal(this.game.player1.state.log[4].state, 'sunk');
        });

        it('updates the ships on sink', () => {
            assert(this.game.player1.state.ships.includes('carrier'));
            this.game.turn(new Coordinate({ x: 0, y: 0 }));
            this.game.turn(new Coordinate({ x: 0, y: 1 }));
            this.game.turn(new Coordinate({ x: 0, y: 2 }));
            this.game.turn(new Coordinate({ x: 0, y: 3 }));
            this.game.turn(new Coordinate({ x: 0, y: 4 }));
            assert(this.game.player2.ships.carrier.sunk);
            assert(!this.game.player1.state.ships.includes('carrier'));
        });

        it('sets the opponent name', () => {
            assert.equal(this.game.player1.player.vm.run('player.opponent'), 'Valid');
            assert.equal(this.game.player2.player.vm.run('player.opponent'), 'Valid');
        });

        it('fails when shooting a missed cell', () => {
            this.game.turn(new Coordinate({ x: 9, y: 9 }));
            assert.equal(this.game.player1.state.board[9][9], 'miss');
            assert.throws(() => {
                this.game.turn(new Coordinate({ x: 9, y: 9 }));
            });
        });

        it('fails when shooting a hit cell', () => {
            this.game.turn(new Coordinate({ x: 0, y: 0 }));
            assert.equal(this.game.player1.state.board[0][0], 'hit');
            assert.throws(() => {
                this.game.turn(new Coordinate({ x: 0, y: 0 }));
            });
        });

        it('fails when shooting a sunk cell', () => {
            this.game.turn(new Coordinate({ x: 0, y: 0 }));
            this.game.turn(new Coordinate({ x: 0, y: 1 }));
            this.game.turn(new Coordinate({ x: 0, y: 2 }));
            this.game.turn(new Coordinate({ x: 0, y: 3 }));
            this.game.turn(new Coordinate({ x: 0, y: 4 }));
            assert.equal(this.game.player1.state.board[0][0], 'sunk');
            assert.throws(() => {
                this.game.turn(new Coordinate({ x: 0, y: 0 }));
            });
        });

    });

    describe('#winner', () => {

        beforeEach(() => {
            this.player1 = Player.loadFromFile('test/players/valid.js');
            this.player2 = Player.loadFromFile('test/players/valid.js');
            this.game = new Game(this.player1, this.player2);
        });

        it('has the right winner', () => {
            assert.equal(this.game.winner, this.player1);
        });

    });

});
