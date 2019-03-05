const React = require('react');
const Fragment = React.Fragment;

const log = {
    textAlign: 'left',
    width: '100px',
    margin: '1rem auto',
};

class Errors extends React.Component {
    render() {
        return this.props.errors.map(error => (
            <li>{error.name}: {error.message}</li>
        ));
    }
}

class Messages extends React.Component {
    render() {
        return this.props.messages.map(message => (
            <li>{message}</li>
        ));
    }
}

class Shots extends React.Component {
    render() {
        return this.props.shots.map(shot => (
            <li>
                ({shot.x},{shot.y}) {shot.state}
            </li>
        ));
    }
}

class Log extends React.Component {
    render() {
        return (
            <Fragment>
                <ol style={log}>
                    <Errors errors={this.props.log.errors} />
                </ol>
                <ol style={log}>
                    <Messages messages={this.props.log.messages} />
                </ol>
                <ol style={log}>
                    <Shots shots={this.props.log.shots} />
                </ol>
            </Fragment>
        );
    }
}

module.exports = Log;
