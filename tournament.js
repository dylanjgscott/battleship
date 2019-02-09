const fs = require('fs');
const vm2 = require('vm2');

const battleship = require('./battleship');

class Tournament {

    static loadPlayer(directory, filename) {
        try {
            let data = fs.readFileSync(directory + filename).toString();
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
                filename: filename,
                name: name,
                score: 0,
                vm: vm,
            }
            return playerContainer;
        }
        catch(error){
            return null;
        }
    }

    constructor(directory) {
        this.players = fs.readdirSync(directory).map(filename => {
            return Tournament.loadPlayer(directory, filename);
        });
    }

    results() {
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

exports.Tournament = Tournament;
