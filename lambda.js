const React = require('react');
const ReactDOMServer = require('react-dom/server');

const MainPage = require('./components/MainPage');
const MatchPage = require('./components/MatchPage');
const Match = require('./Match');
const Player = require('./Player');

const PLAYER_DIR = './players/';

exports.handler = async (event, context) => {

    let body;

    if(event.path === '/') {
        let players = Player.loadPlayers(PLAYER_DIR);
        let page = React.createElement(MainPage, { players: players });
        body = ReactDOMServer.renderToString(page);
    }

    if(event.path === '/match') {
        let player1 = new Player(PLAYER_DIR, event.queryStringParameters.player1);
        let player2 = new Player(PLAYER_DIR, event.queryStringParameters.player2);
        let match = new Match(player1, player2, event.queryStringParameters.count);
        let page = React.createElement(MatchPage, { match: match });
        body = ReactDOMServer.renderToString(page);
    }

    return {
        statusCode: 200,
        statusDescription: '200 OK',
        isBase64Encoded: false,
        headers: { 'content-type': 'text/html' },
        body: body,
    };

};
