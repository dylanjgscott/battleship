const React = require('react');

class Game extends React.Component {
    render() {
        return (
            <div>
                <h2>Winner: {this.props.winner.name}!</h2>
                <h3>{this.props.game.player1.player.name}'s Board</h3>
                <table>
                    {Array.from(Array(10).keys()).map(x => {
                        return (
                            <tr key={x}>
                                {Array.from(Array(10).keys()).map(y => {
                                    return (
                                        <td key={y}>
                                            <img src={'/static/' + this.props.game.player1.state.board[x][y] + '.png'} />
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </table>
                <h3>{this.props.game.player2.player.name}'s Board</h3>
                <table>
                    {Array.from(Array(10).keys()).map(x => {
                        return (
                            <tr key={x}>
                                {Array.from(Array(10).keys()).map(y => {
                                    return (
                                        <td key={y}>
                                            <img src={'/static/' + this.props.game.player2.state.board[x][y] + '.png'} />
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </table>
            </div>
        );
    }
}

class PlayerSelector extends React.Component {
    render() {
        return (
            <form action="/versus" method="get">
                <h2>Player Selector</h2>
                <p>
                    <label htmlFor="player1">Player 1</label>
                </p>
                <p>
                    <select id="player1" name="player1">
                        {this.props.players.map(player => {
                            return (
                                <option key={player.filename} value={player.filename}>{player.name}</option>
                            );
                        })}
                    </select>
                </p>
                <p>
                    <label htmlFor="player2">Player 2</label>
                </p>
                <p>
                    <select id="player2" name="player2">
                        {this.props.players.map(player => {
                            return (
                                <option key={player.filename} value={player.filename}>{player.name}</option>
                            );
                        })}
                    </select>
                </p>
                <p>
                    <input type="submit" />
                </p>
            </form>
        );
    }
}

class Upload extends React.Component {
    render() {
        return (
            <form action="/upload" method="post" encType="multipart/form-data">
                <h2>Upload Player</h2>
                <p>
                    <input name="js" type="file" />
                </p>
                <p>
                    <input name="submit" type="submit" />
                </p>
            </form>
        );
    }
}

exports.Game = Game;
exports.PlayerSelector = PlayerSelector;
exports.Upload = Upload;
