const fs = require('fs');

const battleship = require('./battleship');

const PLAYER_DIR = './players/';

class Tournament {

    constructor() {
        this.players = fs.readdirSync(PLAYER_DIR).map(file => {
            try {
                const data = fs.readFileSync(PLAYER_DIR + file);
                const contents = data.toString();
                let index = 0;
                while(index = contents.substring(index).indexOf('require')) {
                    if(!contents.substring(index).startsWith('require("../battleship");') &&
                       !contents.substring(index).startsWith("require('../battleship');")) {
                        throw 'Not allowed to import other files!';
                    }
                }
                const js = require(PLAYER_DIR + file);
                let player = new js.Player();
                let playerContainer = {
                    player: player,
                    name: player.name,
                }
                return playerContainer;
            }
            catch(error){
                console.log(error);
                fs.unlinkSync(PLAYER_DIR + file);
                return null;
            }
        });
    }

    start() {
        let scores = {};
        this.players.forEach(player => {
            if(player) {
                return scores[player.name] = 0;
            }
            else {
                return null;
            }
        });
        this.players.forEach(player1Container => {
            this.players.forEach(player2Container => {
                if(player1Container && player2Container) {
                    let player1 = player1Container.player;
                    let player2 = player2Container.player;
                    player1.opponent = player2Container.name;
                    player2.opponent = player1Container.name;
                    for(let i = 0; i < 100; i++) {
                        let game = new battleship.Game(player1, player2);
                        game.play();
                        if(game.winner) {
                            if(game.winner == player1) {
                                scores[player1Container.name]++;
                            }
                            if(game.winner == player2) {
                                scores[player2Container.name]++;
                            }
                        }
                    }
                }
            });
        });
        return scores;
    }

}

exports.PLAYER_DIR = PLAYER_DIR;
exports.Tournament = Tournament;
