const React = require('react');
const Fragment = React.Fragment;

class GameCells extends React.Component {
    render() {
        return this.props.cells.map(cell =>
            <td><img src={"/static/" + cell + '.png'} /></td>
        );
    }
}

class GameRows extends React.Component {
    render() {
        return this.props.rows.map(row =>
            <tr><GameCells cells={row} /></tr>
        );
    }
}

class GameBoard extends React.Component {
    render() {
        return (
            <Fragment>
                <h3>{this.props.player.player.name}'s Shots</h3>
                <table>
                    <GameRows rows={this.props.player.state.board} />
                </table>
            </Fragment>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <Fragment>
                <h2>Winner: {this.props.winner.name}!</h2>
                <GameBoard player={this.props.game.player1} />
                <GameBoard player={this.props.game.player2} />
            </Fragment>
        );
    }
}

class Page extends React.Component {
    render() {
        return (
            <html>
            <head>
            <title>Battleship</title>
            </head>
            <body>
                <h1><a href="/">Battleship</a></h1>
                {this.props.children}
            </body>
            </html>
        );
    }
}

class PlayerOptions extends React.Component {
    render() {
        return this.props.players.map(player => (<option key={player.filename} value={player.filename}>{player.name}</option>));
    }
}

class PlayerSelector extends React.Component {
    render() {
        return (
            <Fragment>
            <label htmlFor={this.props.name}>{this.props.label}</label>
            <select name={this.props.name} id={this.props.name}>
                <PlayerOptions players={this.props.players} />
            </select>
            </Fragment>
        );
    }
}

class PlayerForm extends React.Component {
    render() {
        return (
            <Fragment>
                <h2>Player Selector</h2>
                <form action="/versus" method="get">
                    <PlayerSelector label="Player 1" name="player1" players={this.props.players} />
                    <PlayerSelector label="Player 2" name="player2" players={this.props.players} />
                    <input type="submit" />
                </form>
            </Fragment>
        );
    }
}

class UploadForm extends React.Component { render() {
        return (
            <Fragment>
                <h2 >Player Upload</h2>
                <form action="/upload" method="post" encType="multipart/form-data">
                    <input name="js" type="file" />
                    <input name="submit" type="submit" />
                </form>
            </Fragment>
        );
    }
}

exports.Game = Game;
exports.Page = Page;
exports.PlayerForm = PlayerForm;
exports.UploadForm = UploadForm;
