const AWS = require('aws-sdk');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const querystring = require('querystring');

const Match = require('./Match');
const Player = require('./Player');
const MainPage = require('./components/MainPage');
const MatchPage = require('./components/MatchPage');

const PLAYER_DIR = './players/';

exports.handler = async (event, context) => {

    let body;

    if(event.path === '/') {
        let players = Player.loadFromDirectory(PLAYER_DIR);
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
        let players = Player.loadFromDirectory(PLAYER_DIR);
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
        let post = Buffer.from(event.body, 'base64').toString();
        form = querystring.parse(post);
        let player = new Player(form.javascript);
        let dynamodb = new AWS.DynamoDB();
        let params = {
            Item: {
                name: {
                    S: player.name,
                },
                javascript: {
                    S: form.javascript,
                },
            },
            TableName: 'battleship',
        };
        await new Promise((resolve, reject) => dynamodb.putItem(params, (err, data) => err ? reject(err) : resolve(data)));
        return {
            statusCode: 303,
            statusDescription: '303 See Other',
            isBase64Encoded: false,
            headers: { location: '/' },
        };
    }

};
