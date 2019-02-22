const React = require('react');

const body = {
    padding: 0,
    margin: 0,
    fontFamily: 'Consolas, "Lucida Console", Monaco, "Courier New", monospace',
    backgroundColor: 'black',
    color: 'white',
    fontSize: '12px',
};

const main = {
    width: '880px',
    margin: '0 auto',
    textAlign: 'center',
};

const title = {
    fontFamily: "'Black Ops One', cursive",
    color: 'white',
    textDecoration: 'none',
    fontSize: '120px',
    textShadow: '4px 5px 0px crimson',
};

class Page extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>Battleship</title>
                    <link
                        href="https://fonts.googleapis.com/css?family=Black+Ops+One"
                        rel="stylesheet"
                    />
                </head>
                <body style={body}>
                    <main style={main}>
                        <h1>
                            <a style={title} href="/">
                                Battleship
                            </a>
                        </h1>
                        {this.props.children}
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = Page;
