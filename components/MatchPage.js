const React = require('react');
const Games = require('./Games');
const Page = require('./Page');

const header = {
    fontFamily: "'Black Ops One', cursive",
};

class MatchPage extends React.Component {
    render() {
        return (
            <Page>
                <div style={header}>
                    <h2>
                        {this.props.match.player1.name} versus{' '}
                        {this.props.match.player2.name}
                    </h2>
                    <h3>
                        Score {this.props.match.player1.score} to{' '}
                        {this.props.match.player2.score}
                    </h3>
                </div>
                <Games games={this.props.match.games} />
            </Page>
        );
    }
}

module.exports = MatchPage;
