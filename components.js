const React = require('react');
const Fragment = React.Fragment;

class Game extends React.Component {
    render() {
        return (
            <div>
                <h2>Winner: {this.props.winner.name}!</h2>
                <h3>{this.props.game.player1.player.name}'s Shots</h3>
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
                <h3>{this.props.game.player2.player.name}'s Shots</h3>
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

class PlayerOptions extends React.Component {
    render() {
        return this.props.players.map(player => (<option key={player.filename} value={player.filename}>{player.name}</option>));
    }
}

class Selector extends React.Component {
    render() {
        const { name, label, players } = this.props;
        return (
            <Fragment>
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name}>
                <PlayerOptions players={players} />
            </select>
            </Fragment>
        );
    }
}

class PlayerSelector extends React.Component {
    render() {
        return (
            <form action="/versus" method="get">
                <h2>Player Selector</h2>
                <Selector label="Player 1" name="player1" players={this.props.players} />
                <Selector label="Player 2" name="player2" players={this.props.players} />
                <input type="submit" />
            </form>
        );
    }
}

class Upload extends React.Component {
    render() {
        return (
            <form action="/upload" method="post" encType="multipart/form-data">
                <h2>Upload Player</h2>
                <input name="js" type="file" />
                <input name="submit" type="submit" />
            </form>
        );
    }
}

exports.Game = Game;
exports.PlayerSelector = PlayerSelector;
exports.Upload = Upload;
