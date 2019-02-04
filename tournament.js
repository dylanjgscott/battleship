const fs = require("fs");

const battleship = require("./battleship");

const PLAYER_DIR = "./players/";

players = fs.readdirSync(PLAYER_DIR)

for(let i = 0; i < players.length; i++) {
    for(let j = i + 1; j < players.length; j++) {
        let player1 = require(PLAYER_DIR + players[i]);
        let player2 = require(PLAYER_DIR + players[j]);
        let game = new battleship.Game(new player1.Player(), new player2.Player());
        game.play();
    }
}
