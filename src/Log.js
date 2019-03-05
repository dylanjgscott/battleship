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
        return this.props.player1.entries.map((entry, index) => {
            if(entry.error || entry.shot ) {
                return (
                    <li style={logLayout}>
                        <div style={log}>
                            <Shot shot={this.props.player1.entries[index].shot} state={this.props.player1.entries[index].state} />
                            <Error error={this.props.player1.entries[index].error} />
                            <Messages messages={this.props.player1.entries[index].messages} />
                        </div>
                        <div style={log}>
                            <Shot shot={this.props.player2.entries[index].shot} state={this.props.player2.entries[index].state} />
                            <Error error={this.props.player2.entries[index].error} />
                            <Messages messages={this.props.player2.entries[index].messages} />
                        </div>
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
            <ol>
                <Entries player1={this.props.player1} player2={this.props.player2} />
            </ol>
        );
    }
}

module.exports = Log;
