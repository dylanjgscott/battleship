const fs = require('fs');
const AWS = require('aws-sdk');
const vm2 = require('vm2');

class Player {

    static loadFromDatabase(database) {
        let dynamodb = new AWS.DynamoDB();
        let params = { TableName: database };
        return new Promise((resolve, reject) => dynamodb.scan(params, (err, data) => err ? reject(err) : resolve(data.Items)));
    }
 
    static loadFromDirectory(directory) {
        return new Promise((resolve, reject) => {
            fs.readdir(directory, (err, files) => {
                if(err) {
                    // Shit
                    reject(err);
                }
                else {
                    // Load players
                    let players = files.map(filename => Player.loadFromFile(directory + filename));
                    // Remove null players
                    players = players.filter(player => player != null);
                    // Sort players
                    players = players.sort((player1, player2) => {
                        if(player1.name > player2.name) {
                            return 1;
                        }
                        if(player1.name < player2.name) {
                            return -1;
                        }
                        return 0;
                    });
                    // Resolve
                    resolve(players);
                }
            });
        });
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

    static async saveToDatabase(database, javascript) {
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
        return new Promise((resolve, reject) => {
            fs.writeFile(directory + player.name + '.js', javascript, err => err ? reject(err) : resolve());
        });
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
