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
        return this.props.rows.map((row, index) =>
            <tr><td>{index}</td><GameCells cells={row} /></tr>
        );
    }
}

class GameBoard extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <td>x\y</td>
                    <td>0</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                </tr>
                <GameRows rows={this.props.player.state.board} />
            </table>
        );
    }
}

class Games extends React.Component {
    render() {
        return this.props.games.map((game, index) => {
            return (
                <p style={{clear: "both"}}>
                    <h4>Game {index+1}</h4>
                    <div style={{float: "left"}}>
                        <h5>{game.player1.player.name}'s Shots</h5>
                        <GameBoard player={game.player1} />
                        <Log player={game.player1} />
                    </div>
                    <div style={{float: "left"}}>
                        <h5>{game.player2.player.name}'s Shots</h5>
                        <GameBoard player={game.player2} />
                        <Log player={game.player2} />
                    </div>
                </p>
            );
        });
    }
}

class MatchPage extends React.Component {
    render() {
        return (
            <Page>
                <h2>{this.props.match.player1.name} versus {this.props.match.player2.name}</h2>
                <h3>Score {this.props.match.player1.score} to {this.props.match.player2.score}</h3>
                <Games games={this.props.match.games} />
            </Page>
        );
    }
}

class Log extends React.Component {
    render() {
        return (
            <ol>
                <LogEntries log={this.props.player.state.log} />
            </ol>
        );
    }
}

class LogEntries extends React.Component {
    render() {
        return this.props.log.map(log => <li>({log.shot.x},{log.shot.y}) {log.state}</li>);
    }
}

class MainPage extends React.Component {
    render() {
        return (
            <Page>
                <MatchForm key="matchForm" players={this.props.players} />
                <UploadForm key="uploadForm" />
            </Page>
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
        let players = this.props.players.filter(player => player != null);
        return players.map(player => (<option key={player.filename} value={player.filename}>{player.name}</option>));
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

class MatchForm extends React.Component {
    render() {
        return (
            <Fragment>
                <h2>Player Selector</h2>
                <form action="/match" method="get">
                    <PlayerSelector label="Player 1" name="player1" players={this.props.players} />
                    <PlayerSelector label="Player 2" name="player2" players={this.props.players} />
                    <label htmlFor="count">Count</label>
                    <select name="count" id="count">
                        <option value="1">1</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                        <option value="9">9</option>
                    </select>
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

exports.MatchPage = MatchPage;
exports.MainPage = MainPage;
