const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const querystring = require('querystring');

const Match = require('./Match');
const Player = require('./Player');
const MainPage = require('./components/MainPage');
const MatchPage = require('./components/MatchPage');

const PLAYER_DATABASE = process.env.TABLE_NAME;

function getStaticAsset(filename, callback) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if(err) {
                reject(err);
            }
            else {
                callback(null, {
                    body: data.toString('base64'),
                    headers: { 'Content-Type': 'image/png' },
                    isBase64Encoded: true,
                    multiValueHeaders: {
                        'Cache-Control': [ 'public', 'max-age=3600' ],
                    },
                    statusCode: 200,
                });
                resolve();
            }
        });
    });
}

async function handler(event, context, callback) {

    console.log(JSON.stringify(event));

    if(event.path === '/') {
        let players = await Player.loadFromDatabase(PLAYER_DATABASE);
        let page = React.createElement(MainPage, { players: players });
        callback(null, {
            body: ReactDOMServer.renderToString(page),
            headers: {
                'Content-Type': 'text/html'
            },
            multiValueHeaders: {
                'Cache-Control': [ 'public', 'max-age=0' ],
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
            headers: { 'Content-Type': 'text/html' },
            multiValueHeaders: {
                'Cache-Control': [ 'public', 'max-age=0' ],
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
            statusCode: 303,
        });
    }

    if(event.path === '/static/ocean') {
        await getStaticAsset('static/ocean.png', callback);
    }

    if(event.path === '/static/miss') {
        await getStaticAsset('static/miss.png', callback);
    }

    if(event.path === '/static/hit') {
        await getStaticAsset('static/hit.png', callback);
    }

    if(event.path === '/static/sunk') {
        await getStaticAsset('static/sunk.png', callback);
    }

};
exports.handler = handler;
