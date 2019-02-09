const React = require('react');

class Scoreboard extends React.Component {

    render() {
        return (
            <table>
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
                {this.props.players.map(player => {
                    return (
                        <tr>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
                        </tr>
                    );
                })}
            </table>
        );
    }
}

exports.Scoreboard = Scoreboard;
