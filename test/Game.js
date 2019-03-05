const assert = require('assert');
const Coordinate = require('../Coordinate');
const Game = require('../Game');
const Player = require('../Player');

describe('Game', () => {

    describe('#turn()', () => {

        beforeEach(async () => {
            this.player1 = await Player.loadFromFile('test/players/Valid.js');
            this.player2 = await Player.loadFromFile('test/players/Valid.js');
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
            let shot = new Coordinate({ x: 9, y: 9 });
            this.game.turn(shot);
            assert.equal(this.game.player1.log.entries[0].shot.x, shot.x);
            assert.equal(this.game.player1.log.entries[0].shot.y, shot.y);
            assert.equal(this.game.player1.log.entries[0].state, 'miss');
        });

        it('updates the log on hit', () => {
            let shot = new Coordinate({ x: 0, y: 0 });
            this.game.turn(shot);
            assert.equal(this.game.player1.log.entries[0].shot.x, shot.x);
            assert.equal(this.game.player1.log.entries[0].shot.y, shot.y);
            assert.equal(this.game.player1.log.entries[0].state, 'hit');
        });

        it('updates the log on sink', () => {
            this.game.turn(new Coordinate({ x: 0, y: 0 }));
            this.game.turn(new Coordinate({ x: 0, y: 1 }));
            this.game.turn(new Coordinate({ x: 0, y: 2 }));
            this.game.turn(new Coordinate({ x: 0, y: 3 }));
            this.game.turn(new Coordinate({ x: 0, y: 4 }));
            assert.equal(this.game.player1.log.entries[4].state, 'sunk');
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

        it('has the right winner', async () => {
            let player1 = await Player.loadFromFile('test/players/Valid.js');
            let player2 = await Player.loadFromFile('test/players/Valid.js');
            let game = new Game(player1, player2);
            assert.equal(game.winner, player1);
        });

        it('updates the log when a player throws an exception when shooting', async () => {
            let player1 = await Player.loadFromFile('test/players/ShootException.js');
            let player2 = await Player.loadFromFile('test/players/Valid.js');
            let game = new Game(player1, player2);
            let winner = game.winner;
            assert.equal(game.player1.log.entries[0].error.message, 'cannot shoot');
        });

        it('updates the log when a player throws an exception during ship placement', async () => {
            let player1 = await Player.loadFromFile('test/players/ShipsException.js');
            let player2 = await Player.loadFromFile('test/players/Valid.js');
            let game = new Game(player1, player2);
            let winner = game.winner;
            assert.equal(game.player1.log.entries[0].error.message, 'cannot place ships');
        });

        it('updates the log when a player uses console.log', async () => {
            let player1 = await Player.loadFromFile('test/players/LogsMessages.js');
            let player2 = await Player.loadFromFile('test/players/Valid.js');
            let game = new Game(player1, player2);
            assert.equal(game.player1.log.entries[0].messages[0], 'Placing ships');
        });

    });

});
