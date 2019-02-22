const fs = require('fs');
const vm2 = require('vm2');

class Player {

    static loadFromDirectory(directory) {
        let players = fs.readdirSync(directory).map(filename => Player.loadFromFile(directory + filename));
        players = players.filter(player => player != null);
        players.sort((player1, player2) => {
            if(player1.name < player2.name) {
                return -1;
            }
            if(player1.name > player2.name) {
                return 1;
            }
            return 0;
        });
        return players;
    }

    static loadFromFile(filename) {
        try {
            return new Player(fs.readFileSync(filename, { encoding: 'utf-8' }));
        }
        catch(error) {
            console.log(error);
            return null;
        }
    }

    static saveToDatabase(database, javascript) {
        let player = new Player(form.javascript);
        let dynamodb = new AWS.DynamoDB();
        let params = {
            Item: {
                name: {
                    S: player.name,
                },
                javascript: {
                    S: javascript,
                },
            },
            TableName: database,
        };
        await new Promise((resolve, reject) => dynamodb.putItem(params, (err, data) => err ? reject(err) : resolve(data)));
    }

    static saveToFile(directory, javascript) {
        let player = new Player(javascript);
        fs.writeFileSync(directory + player.name + '.js', javascript);
    }

    constructor(javascript) {
        this.vm = new vm2.VM({
            sandbox: {
                player: null,
            },
            timeout: 1000,
        });
        this.vm.run(javascript);
        this.vm.run('player = new Player()');
        this.name = this.vm.run('player.name');
    }

}
module.exports = Player;
