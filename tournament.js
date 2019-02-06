const fs = require("fs");

const battleship = require("./battleship");

const PLAYER_DIR = "./players/";

class Tournament {

    constructor() {
        this.players = fs.readdirSync(PLAYER_DIR).map(file => {
            try {
                const js = require(PLAYER_DIR + file);
                return new js.Player();
            }
            catch(error){
                fs.unlinkSync(PLAYER_DIR + file);
                return null;
            }
        });
    }

    start() {
        let scores = {};
        this.players.forEach(player1 => {
            this.players.forEach(player2 => {
                if(player1 && player2) {
                    let game = new battleship.Game(player1, player2);
                    game.play();
                    if(scores[game.winner.name]) {
                        scores[game.winner.name] += 1;
                    }
                    else {
                        scores[game.winner.name] = 1;
                    }
                }
            });
        });
        return scores;
    }

}

exports.PLAYER_DIR = PLAYER_DIR;
exports.Tournament = Tournament;
