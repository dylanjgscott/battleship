const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const querystring = require('querystring');

const Match = require('./Match');
const Player = require('./Player');
const MainPage = require('./components/MainPage');
const MatchPage = require('./components/MatchPage');

const PLAYER_DATABASE = 'battleship';

async function handler(event, context) {

    if(event.path === '/') {
        let players = await Player.loadFromDatabase(PLAYER_DATABASE);
        let page = React.createElement(MainPage, { players: players });
        return {
            statusCode: 200,
            statusDescription: '200 OK',
            isBase64Encoded: false,
            headers: { 'content-type': 'text/html' },
            body: ReactDOMServer.renderToString(page),
        };
    }

    if(event.path === '/match') {
        let players = await Player.loadFromDatabase(PLAYER_DATABASE);
        let player1;
        let player2;
        players.forEach(player => {
            if(player.name === event.queryStringParameters.player1) {
                player1 = player;
            }
            if(player.name === event.queryStringParameters.player2) {
                player2 = player;
            }
        });
        let match = new Match(player1, player2, event.queryStringParameters.count);
        let page = React.createElement(MatchPage, { match: match });
        return {
            statusCode: 200,
            statusDescription: '200 OK',
            isBase64Encoded: false,
            headers: { 'content-type': 'text/html' },
            body: ReactDOMServer.renderToString(page),
        };
    }

    if(event.path === '/upload') {
        let post = Buffer.from(event.body, 'base64').toString('utf-8');
        form = querystring.parse(post);
        await Player.saveToDatabase(PLAYER_DATABASE, form.javascript);
        return {
            statusCode: 303,
            statusDescription: '303 See Other',
            isBase64Encoded: false,
            headers: { location: '/' },
        };
    }

    if(event.path.startsWith('/static/')) {
        return {
            statusCode: 200,
            statusDescription: '200 OK',
            isBase64Encoded: true,
            headers: { 'content-type': 'image/png' },
            body: fs.readFileSync(event.path.substring(1)).toString('base64'),
        };
    }

};
exports.handler = handler;
