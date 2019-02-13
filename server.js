require('babel-register')({
    presets: ['react'],
});

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const battleship = require('./battleship');
const components = require('./components');

const PLAYER_DIR = 'players/';

const app = express();
const upload = multer({dest: PLAYER_DIR});

app.use('/static', express.static('static'));

app.get('/', (request, response) => {
    let players = fs.readdirSync(PLAYER_DIR).map(filename => battleship.Game.loadPlayer(PLAYER_DIR, filename));
    let playerForm = React.createElement(components.PlayerForm, {players: players});
    let uploadForm = React.createElement(components.UploadForm);
    let page = React.createElement(components.Page, [], [playerForm, uploadForm]);
    response.send(ReactDOMServer.renderToString(page));
});

app.post('/upload', upload.single('js'), (request, response, next) => {
    response.redirect('/');
});

app.get('/versus', upload.single('js'), (request, response, next) => {
    let player1 = battleship.Game.loadPlayer(PLAYER_DIR, request.query.player1);
    let player2 = battleship.Game.loadPlayer(PLAYER_DIR, request.query.player2);
    let game = new battleship.Game(player1, player2);
    let winner = game.winner;
    let results = React.createElement(components.Game, {game: game, winner: winner});
    let page = React.createElement(components.Page, [], [results]);
    response.send(ReactDOMServer.renderToString(page));
});

app.listen(8000);
