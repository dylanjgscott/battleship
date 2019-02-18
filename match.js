const game = require('./game');

class Match {

    constructor(player1, player2, count) {
        this.player1 = player1;
        this.player2 = player2;
        this.games = [];
        for(let i = 0; i < count; i++) {
            let g = new game.Game(player1, player2);
            this.games.push(g);
            let winner = g.winner;
            if(winner == player1) {
                player1.score++;
            }
            if(winner == player2) {
                player2.score++;
            }
        }
    }

}
exports.Match = Match;
