const assert = require('assert');

const battleship = require('../battleship');
const tournament = require('../tournament');

const PLAYER_DIR = 'test/players/';

describe('Game', () => {

    describe('#shipsSunk()', () => {
        beforeEach(() => {
            this.ships = {
                carrier: new battleship.Ship(new battleship.Coordinate(4, 0), new battleship.Coordinate(4, 4)),
                battleship: new battleship.Ship(new battleship.Coordinate(3, 0), new battleship.Coordinate(3, 3)),
                cruiser: new battleship.Ship(new battleship.Coordinate(1, 0), new battleship.Coordinate(1, 2)),
                submarine: new battleship.Ship(new battleship.Coordinate(2, 0), new battleship.Coordinate(2, 2)),
                destroyer: new battleship.Ship(new battleship.Coordinate(0, 0), new battleship.Coordinate(0, 1)),
            };
        });
        it('works with no sunk ships', () => {
            assert(!battleship.Game.shipsSunk(this.ships));
        });
        it('works with some sunk ships', () => {
            this.ships.destroyer.hit(new battleship.Shot(0, 0));
            this.ships.destroyer.hit(new battleship.Shot(0, 1));
            assert(this.ships.destroyer.sunk);
            assert(!battleship.Game.shipsSunk(this.ships));
        });
        it('works with all sunk ships', () => {
            delete this.ships.carrier;
            delete this.ships.battleship;
            delete this.ships.cruiser;
            this.ships.submarine.hit(new battleship.Shot(2, 0));
            this.ships.submarine.hit(new battleship.Shot(2, 1));
            this.ships.submarine.hit(new battleship.Shot(2, 2));
            this.ships.destroyer.hit(new battleship.Shot(0, 0));
            this.ships.destroyer.hit(new battleship.Shot(0, 1));
            assert(this.ships.submarine.sunk);
            assert(this.ships.destroyer.sunk);
            assert(battleship.Game.shipsSunk(this.ships));
        });
    });

    describe('#shipsValid()', () => {
        beforeEach(() => {
            this.ships = {
                carrier: new battleship.Ship(new battleship.Coordinate(4, 0), new battleship.Coordinate(4, 4)),
                battleship: new battleship.Ship(new battleship.Coordinate(3, 0), new battleship.Coordinate(3, 3)),
                cruiser: new battleship.Ship(new battleship.Coordinate(1, 0), new battleship.Coordinate(1, 2)),
                submarine: new battleship.Ship(new battleship.Coordinate(2, 0), new battleship.Coordinate(2, 2)),
                destroyer: new battleship.Ship(new battleship.Coordinate(0, 0), new battleship.Coordinate(0, 1)),
            };
        });
        it('validates valid ships', () => {
            assert(battleship.Game.shipsValid(this.ships));
        });
        it('invalidates colliding ships', () => {
            this.ships.destroyer = new battleship.Ship(new battleship.Coordinate(4, 0), new battleship.Coordinate(4, 1)),
            assert(!battleship.Game.shipsValid(this.ships));
        });
        it('invalidates missing ships', () => {
            delete this.ships.battleship;
            assert(!battleship.Game.shipsValid(this.ships));
        });
        it('invalidates extra ships', () => {
            this.ships.dreadnought = new battleship.Ship(new battleship.Coordinate(5, 0), new battleship.Coordinate(5, 1)),
            assert(!battleship.Game.shipsValid(this.ships));
        });
        it('invalidates wrong ship sizes', () => {
            this.ships.destroyer = new battleship.Ship(new battleship.Coordinate(0, 0), new battleship.Coordinate(0, 0)),
            assert(!battleship.Game.shipsValid(this.ships));
        });
        it('invalidates invalid ships', () => {
            this.ships.destroyer = new battleship.Ship(new battleship.Coordinate(9, 9), new battleship.Coordinate(9, 10)),
            assert(!this.ships.destroyer.valid);
            assert(!battleship.Game.shipsValid(this.ships));
        });
        it('invalidates non-ships', () => {
            this.ships.destroyer = null;
            assert(!battleship.Game.shipsValid(this.ships));
        });
    });

    describe('#turn()', () => {
        beforeEach(() => {
            let player1 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'valid.js');
            let player2 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'valid.js');
            this.game = new battleship.Game(player1, player2);
        });
        it('updates the board state on hit', () => {
            assert.equal(this.game.currentPlayer.state.board[0][0], 'ocean');
            this.game.turn(new battleship.Shot(0, 0));
            assert.equal(this.game.currentPlayer.state.board[0][0], 'hit');
        });
        it('updates the boards state on miss', () => {
            assert.equal(this.game.currentPlayer.state.board[9][9], 'ocean');
            this.game.turn(new battleship.Shot(9, 9));
            assert.equal(this.game.currentPlayer.state.board[9][9], 'miss');
        });
        it('updates the ship on hit', () => {
            assert.equal(this.game.nextPlayer.ships.destroyer.hits.length, 0);
            this.game.turn(new battleship.Shot(0, 0));
            assert.equal(this.game.nextPlayer.ships.destroyer.hits.length, 1);
        });
        it('updates the ships on sink', () => {
            assert(this.game.currentPlayer.state.ships.includes('destroyer'));
            this.game.turn(new battleship.Shot(0, 0));
            this.game.turn(new battleship.Shot(0, 1));
            assert(!this.game.currentPlayer.state.ships.includes('destroyer'));
        });
        it('disqualifies on non-shot', () => {
            this.game.turn(null);
            assert.deepStrictEqual(this.game.currentPlayer.ships, {});
        });
        it('disqualifies on invalid shot', () => {
            this.game.turn(new battleship.Shot(10, 10));
            assert.deepStrictEqual(this.game.currentPlayer.ships, {});
        });
        it('disqualifies on shooting the same ocean square twice', () => {
            this.game.turn(new battleship.Shot(9, 9));
            this.game.turn(new battleship.Shot(9, 9));
            assert.deepStrictEqual(this.game.currentPlayer.ships, {});
        });
        it('disqualifies on shooting the same ship square twice', () => {
            this.game.turn(new battleship.Shot(0, 0));
            this.game.turn(new battleship.Shot(0, 0));
            assert.deepStrictEqual(this.game.currentPlayer.ships, {});
        });
    });

    describe('#winner', () => {
        it('has the right winner with two valid players', () => {
            let player1 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'valid.js');
            player1.name = 'player1'
            let player2 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'valid.js');
            player2.name = 'player2'
            let game = new battleship.Game(player1, player2);
            assert.equal(game.winner.name, player1.name);
        });
        it('says valid wins with valid versus invalidships', () => {
            let player1 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'valid.js');
            player1.name = 'player1'
            let player2 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'invalidships.js');
            player2.name = 'player2'
            let game = new battleship.Game(player1, player2);
            assert.equal(game.winner.name, player1.name);
        });
        it('says valid wins with invalidships versus valid', () => {
            let player1 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'invalidships.js');
            player1.name = 'player1'
            let player2 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'valid.js');
            player2.name = 'player2'
            let game = new battleship.Game(player1, player2);
            assert.equal(game.winner.name, player2.name);
        });
        it('has no winner with invalidships versus invalidships', () => {
            let player1 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'invalidships.js');
            let player2 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'invalidships.js');
            let game = new battleship.Game(player1, player2);
            assert.equal(game.winner, null);
        });
        it('says valid wins with valid versus invalidshots', () => {
            let player1 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'valid.js');
            player1.name = 'player1'
            let player2 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'invalidshots.js');
            player2.name = 'player2'
            let game = new battleship.Game(player1, player2);
            assert.equal(game.winner.name, player1.name);
        });
        it('says valid wins with invalidshots versus valid', () => {
            let player1 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'invalidshots.js');
            player1.name = 'player1'
            let player2 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'valid.js');
            player2.name = 'player2'
            let game = new battleship.Game(player1, player2);
            assert.equal(game.winner.name, player2.name);
        });
        it('has no winner with invalidshots versus invalidshots', () => {
            let player1 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'invalidshots.js');
            player1.name = 'player1'
            let player2 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'invalidshots.js');
            player2.name = 'player2'
            let game = new battleship.Game(player1, player2);
            assert.equal(game.winner, null);
        });
        it('says valid wins invalidfile versus valid', () => {
            let player1 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'invalidfile.js');
            let player2 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'valid.js');
            player2.name = 'player2'
            let game = new battleship.Game(player1, player2);
            assert.equal(game.winner.name, player2.name);
        });
        it('says valid wins infiniteships versus valid', () => {
            let player1 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'infiniteships.js');
            let player2 = tournament.Tournament.loadPlayer(PLAYER_DIR, 'valid.js');
            player2.name = 'player2'
            let game = new battleship.Game(player1, player2);
            assert.equal(game.winner.name, player2.name);
        });
    });

});
