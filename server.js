require('babel-register')({
    presets: ['react'],
});

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const express = require('express');
const multer = require('multer');

const battleship = require('./battleship');
const components = require('./components');
const tournament = require('./tournament');

const PLAYER_DIR = 'players/';
const HEADER = '<html>' +
               '<head>' +
               '<title>Battleship</title>' +
               '</head>' +
               '<body>' +
               '<h1><a href="/">Battleship</a></h1>'
const FOOTER = '</body>' +
               '</html>'

const app = express();
const upload = multer({dest: PLAYER_DIR});

app.use('/static', express.static('static'));

app.get('/', (request, response) => {
    t = new tournament.Tournament(PLAYER_DIR);
    let players = t.results();
    let scoreboard = React.createElement(components.Scoreboard, {players: players});
    let playerSelector = React.createElement(components.PlayerSelector, {players: players});
    let upload = React.createElement(components.Upload);
    response.send(
        HEADER +
        ReactDOMServer.renderToString(scoreboard) +
        ReactDOMServer.renderToString(playerSelector) +
        ReactDOMServer.renderToString(upload) +
        FOOTER
    );
});

app.post('/upload', upload.single('js'), (request, response, next) => {
    response.redirect('/');
});

app.get('/versus', upload.single('js'), (request, response, next) => {
    let player1 = tournament.Tournament.loadPlayer(PLAYER_DIR, request.query.player1);
    let player2 = tournament.Tournament.loadPlayer(PLAYER_DIR, request.query.player2);
    let game = new battleship.Game(player1, player2);
    let winner = game.winner;
    let results = React.createElement(components.Game, {game: game, winner: winner});
    response.send(
        HEADER +
        ReactDOMServer.renderToString(results) +
        FOOTER
    );
});

app.listen(8000);
