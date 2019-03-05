const React = require('react');

const log = {
    textAlign: 'left',
    width: '100px',
    margin: '1rem auto',
};

const logLayout = {
    clear: 'both',
    display: 'flex',
    justifyContent: 'space-between',
};

class Error extends React.Component {
    render() {
        if(this.props.error) {
            return (
                <p style={{color: 'red'}}>{this.props.error.name}: {this.props.error.message}</p>
            );
        }
        else {
            return null;
        }
    }
}

class Messages extends React.Component {
    render() {
        if(this.props.messages) {
            return (
                <pre>{this.props.messages.join('\n')}</pre>
            );
        }
        else {
            return null;
        }
    }
}

class Shot extends React.Component {
    render() {
        if(this.props.shot && this.props.state) {
            return (
                <p>({this.props.shot.x},{this.props.shot.y}) {this.props.state}</p>
            );
        }
        else {
            return null;
        }
    }
}

class Entries extends React.Component {
    render() {
        return this.props.entries.map(entry => {
            if(entry.error || entry.shot ) {
                return (
                    <li>
                        <Shot shot={entry.shot} state={entry.state} />
                        <Error error={entry.error} />
                        <Messages messages={entry.messages} />
                    </li>
                );
            }
            else {
                return null;
            }
        });
    }
}

class Log extends React.Component {
    render() {
        return (
            <div style={logLayout}>
                <div>
                    <ol style={log}>
                        <Entries entries={this.props.player2.entries} />
                    </ol>
                </div>
                <div>
                    <ol style={log}>
                        <Entries entries={this.props.player1.entries} />
                    </ol>
                </div>
            </div>
        );
    }
}

module.exports = Log;
