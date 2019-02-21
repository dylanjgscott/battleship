const React = require('react');
const ReactDOMServer = require('react-dom/server');
const cluster = require('cluster');
const express = require('express');
const multer = require('multer');

const Match = require('./Match');
const Player = require('./Player');
const MainPage = require('./components/MainPage');
const MatchPage = require('./components/MatchPage');

const PLAYER_DIR = 'players/';
const PORT = 8000;
const WORKERS = 8;

const app = express();
const upload = multer({ dest: PLAYER_DIR });

if(cluster.isMaster) {
    for(var i = 0; i < WORKERS; i++) {
        cluster.fork();
    }
}
else {

    app.get('/', (request, response) => {
        let players = Player.loadPlayers(PLAYER_DIR);
        let page = React.createElement(MainPage, { players: players });
        response.send(ReactDOMServer.renderToString(page));
    });

    app.get('/match', upload.single('js'), (request, response, next) => {
        let p1 = new Player(PLAYER_DIR, request.query.player1);
        let p2 = new Player(PLAYER_DIR, request.query.player2);
        let m = new Match(p1, p2, request.query.count);
        let page = React.createElement(MatchPage, { match: m });
        response.send(ReactDOMServer.renderToString(page));
    });

    app.use('/static', express.static('static'));

    app.post('/upload', upload.single('js'), (request, response, next) => {
        response.redirect('/');
    });

    app.listen(PORT, () =>
        console.log('️⚓ Worker ' + cluster.worker.id + ' is running at http://localhost:' + PORT),
    );
}
