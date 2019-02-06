const fs = require("fs");

const battleship = require("./battleship");

const PLAYER_DIR = "./players/";

class Tournament {

    constructor() {
        this.players = fs.readdirSync(PLAYER_DIR).map(x => require(PLAYER_DIR + x).Player);
        this.players.forEach(x => console.log(x.Player));
    }

    start() {
        let scores = {};
        this.players.forEach((Player1) => {
            this.players.forEach((Player2) => {
                let game = new battleship.Game(Player1, Player2);
                game.play();
                if(scores[game.Winner.name]) {
                    scores[game.Winner.name] += 1;
                }
                else {
                    scores[game.Winner.name] = 1;
                }
            });
        });
        return scores;
    }

}

exports.PLAYER_DIR = PLAYER_DIR;
exports.Tournament = Tournament;
