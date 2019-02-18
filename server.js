require('babel-register')({
    presets: ['react'],
});

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const express = require('express');
const fs = require('fs');
const multer = require('multer');

const MainPage = require('./components/MainPage');
const MatchPage = require('./components/MatchPage');
const match = require('./match');
const player = require('./player');

const PLAYER_DIR = 'players/';
const PORT = 8000;

const app = express();
const upload = multer({ dest: PLAYER_DIR });

app.use('/static', express.static('static'));

app.get('/', (request, response) => {
    let players = player.Player.loadPlayers(PLAYER_DIR);
    let page = React.createElement(MainPage, { players: players });
    response.send(ReactDOMServer.renderToString(page));
});

app.post('/upload', upload.single('js'), (request, response, next) => {
    response.redirect('/');
});

app.get('/match', upload.single('js'), (request, response, next) => {
    let p1 = new player.Player(PLAYER_DIR, request.query.player1);
    let p2 = new player.Player(PLAYER_DIR, request.query.player2);
    let m = new match.Match(p1, p2, request.query.count);
    let page = React.createElement(MatchPage, { match: m });
    response.send(ReactDOMServer.renderToString(page));
});

app.listen(PORT, () =>
    console.log('️⚓  Application is running at http://localhost:' + PORT),
);
