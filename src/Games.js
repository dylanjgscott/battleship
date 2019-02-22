const React = require('react');
const GameBoard = require('./GameBoard');
const Log = require('./Log');

const gameLayout = {
    clear: 'both',
    display: 'flex',
    justifyContent: 'space-between',
};

const gameTitle = {
    fontFamily: "'Black Ops One', cursive",
    fontSize: '40px',
    marginBottom: '15px',
};

const Games = ({ games }) =>
    games.map((game, index) => (
        <div>
            <h4 style={gameTitle}>Game {index + 1}</h4>
            <div style={gameLayout}>
                <div>
                    <h5>{game.player1.player.name}'s Shots</h5>
                    <GameBoard player={game.player1} />
                    <Log player={game.player1} />
                </div>
                <div>
                    <h5>{game.player2.player.name}'s Shots</h5>
                    <GameBoard player={game.player2} />
                    <Log player={game.player2} />
                </div>
            </div>
        </div>
    ));

module.exports = Games;
