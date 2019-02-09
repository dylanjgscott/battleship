const fs = require('fs');
const vm2 = require('vm2');

const battleship = require('./battleship');

const PLAYER_DIR = './players/';

class Tournament {

    static loadPlayer(filename) {
        try {
            let data = fs.readFileSync(filename).toString();
            let battleship = require('./battleship');
            let vm = new vm2.VM({
                    sandbox: {
                        battleship: battleship,
                        player: null,
                        state: null,
                    },
                    timeout: 1000,
            });
            vm.run(data);
            vm.run('let player = new Player()');
            let name = vm.run('player.name');
            let playerContainer = {
                vm: vm,
                name: name,
                score: 0,
            }
            return playerContainer;
        }
        catch(error){
            return null;
        }
    }

    constructor() {
        this.players = fs.readdirSync(PLAYER_DIR).map(filename => {
            return Tournament.loadPlayer(PLAYER_DIR + filename);
        });
    }

    scoreboard() {
        this.players.forEach(player1 => {
            this.players.forEach(player2 => {
                if(player1 && player2 && player1 != player2) {
                    for(let i = 0; i < 10; i++) {
                        player1.vm.run('player.opponent = ' + JSON.stringify(player2.name));
                        player2.vm.run('player.opponent = ' + JSON.stringify(player1.name));
                        let game = new battleship.Game(player1, player2);
                        if(game.winner) {
                            if(game.winner == player1) {
                                player1.score++;
                            }
                            if(game.winner == player2) {
                                player2.score++;
                            }
                        }
                    }
                }
            });
        });
        return this.players;
    }

}

exports.PLAYER_DIR = PLAYER_DIR;
exports.Tournament = Tournament;
