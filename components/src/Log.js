const React = require('react');

const log = {
    textAlign: 'left',
    width: '100px',
    margin: '1rem auto',
};

class LogEntries extends React.Component {
    render() {
        return this.props.log.map(log => (
            <li>
                ({log.shot.x},{log.shot.y}) {log.state}
            </li>
        ));
    }
}

class Log extends React.Component {
    render() {
        return (
            <ol style={log}>
                <LogEntries log={this.props.player.state.log} />
            </ol>
        );
    }
}

module.exports = Log;
