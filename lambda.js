const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const querystring = require('querystring');

const Match = require('./Match');
const Player = require('./Player');
const MainPage = require('./components/MainPage');
const MatchPage = require('./components/MatchPage');

const PLAYER_DATABASE = process.env.TABLE_NAME;

async function handler(event, context, callback) {

    console.log(JSON.stringify(event));

    if(event.path === '/') {
        let players = await Player.loadFromDatabase(PLAYER_DATABASE);
        let page = React.createElement(MainPage, { players: players });
        callback(null, {
            body: ReactDOMServer.renderToString(page),
            headers: {
                'Content-Type': 'text/html',
                'Cache-Control': 'public, max-age=0',
            },
            statusCode: 200,
        });
    }

    if(event.path === '/match') {
        let player1 = await Player.loadFromDatabase(PLAYER_DATABASE, event.queryStringParameters.player1);
        let player2 = await Player.loadFromDatabase(PLAYER_DATABASE, event.queryStringParameters.player2);
        let match = new Match(player1, player2, event.queryStringParameters.count);
        let page = React.createElement(MatchPage, { match: match });
        callback(null, {
            body: ReactDOMServer.renderToString(page),
            headers: {
                'Content-Type': 'text/html',
                'Cache-Control': 'public, max-age=0',
            },
            statusCode: 200,
        });
    }

    if(event.path === '/upload') {
        let post;
        if(event.isBase64Encoded) {
            post = Buffer.from(event.body, 'base64').toString('utf-8');
        }
        else {
            post = event.body;
        }
        form = querystring.parse(post);
        await Player.saveToDatabase(PLAYER_DATABASE, form.javascript);
        callback(null, {
            headers: { location: '/' },
            headers: {
                'Cache-Control': 'must-revalidate, no-cache, no-store',
            },
            statusCode: 303,
        });
    }

};
exports.handler = handler;
