const React = require('react');
const ReactDOMServer = require('react-dom/server');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const express = require('express');

const Match = require('./Match');
const Player = require('./Player');
const MainPage = require('./components/MainPage');
const MatchPage = require('./components/MatchPage');

const PLAYER_DIR = 'players/';
const PORT = 8000;
const WORKERS = 8;

const app = express();

if(cluster.isMaster) {
    for(var i = 0; i < WORKERS; i++) {
        cluster.fork();
    }
}
else {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.get('/', async (request, response) => {
        let players = await Player.loadFromDirectory(PLAYER_DIR);
        let page = React.createElement(MainPage, { players: players });
        response.send(ReactDOMServer.renderToString(page));
    });
    app.get('/match', async (request, response) => {
        let player1 = await Player.loadFromFile(PLAYER_DIR + request.query.player1 + '.js');
        let player2 = await Player.loadFromFile(PLAYER_DIR + request.query.player2 + '.js');
        let match = new Match(player1, player2, request.query.count);
        let page = React.createElement(MatchPage, { match: match });
        response.send(ReactDOMServer.renderToString(page));
    });
    app.post('/upload', async (request, response) => {
        Player.saveToFile(PLAYER_DIR, request.body.javascript);
        response.redirect('/');
    });
    app.listen(PORT, async () =>
        console.log('️⚓ Worker ' + cluster.worker.id + ' is running at http://localhost:' + PORT),
    );
}
