const React = require('react');
const Fragment = React.Fragment;
const PlayerSelector = require('./PlayerSelector');

class MatchForm extends React.Component {
    render() {
        return (
            <Fragment>
                <h2>Player Selector</h2>
                <form action="/match" method="get">
                    <PlayerSelector
                        label="Player 1"
                        name="player1"
                        players={this.props.players}
                    />
                    <PlayerSelector
                        label="Player 2"
                        name="player2"
                        players={this.props.players}
                    />
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

module.exports = MatchForm;
