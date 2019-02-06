const express = require('express');
const multer = require('multer');

const tournament = require('./tournament');

const app = express();
const upload = multer({dest: tournament.PLAYER_DIR});

app.get('/', (request, response) => {
    t = new tournament.Tournament();
    let scores = t.start();
    let table = '<table><tr><th>Player</th><th>Score</th></td>';
    Object.keys(scores).forEach(player => table += '<tr><td>' + player + '</td><td>' + scores[player] + '</td></tr>');
    table += '</table>';
    response.send(
        '<html>' +
            '<head>' +
                '<title>Battleship</title>' +
            '</head>' +
            '<body>' +
                table +
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
