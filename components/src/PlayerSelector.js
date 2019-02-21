const React = require('react');
const Fragment = React.Fragment;

class PlayerOptions extends React.Component {
    render() {
        return this.props.players.map(player => (
            <option key={player.filename} value={player.filename}>
                {player.name}
            </option>
        ));
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

module.exports = PlayerSelector;
