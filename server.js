require('babel-register')({
    presets: ['react'],
});

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const express = require('express');
const multer = require('multer');

const components = require('./components');
const tournament = require('./tournament');

const app = express();
const upload = multer({dest: tournament.PLAYER_DIR});

app.get('/', (request, response) => {
    t = new tournament.Tournament();
    let players = t.scoreboard();
    let scoreboard = React.createElement(components.Scoreboard, {players: players});
    response.send(
        '<html>' +
            '<head>' +
                '<title>Battleship</title>' +
            '</head>' +
            '<body>' +
                ReactDOMServer.renderToString(scoreboard) +
                '<form action="/" method="post" enctype="multipart/form-data">' +
                    '<p><input name="js" type="file" /></p>' +
                    '<p><input name="submit" type="submit" /></p>' +
                '</form>' +
            '</body>' +
        '</html>'
    );
});

app.post('/', upload.single('js'), (request, response, next) => {
    response.redirect('/');
});

app.listen(8000);
