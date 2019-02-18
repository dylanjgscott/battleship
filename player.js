const fs = require('fs');
const vm2 = require('vm2');

class Player {

    static loadPlayers(directory) {
        let filenames = fs.readdirSync(directory);
        let players = filenames.map(filename => {
            try {
                return new Player(directory, filename);
            }
            catch(error) {
                return null;
            }
        });
        players = players.filter(player => player != null);
        return players;
    }

    constructor(directory, filename) {
        this.vm = new vm2.VM({
            sandbox: {
                player: null,
                state: null,
            },
            timeout: 1000,
        });
        this.filename = filename;
        this.vm.run(fs.readFileSync(directory + filename).toString());
        this.vm.run('player = new Player()');
        this.name = this.vm.run('player.name');
        this.score = 0;
    }

}
exports.Player = Player;
