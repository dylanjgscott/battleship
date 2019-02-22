const fs = require('fs');
const AWS = require('aws-sdk');
const vm2 = require('vm2');

class Player {

    static sort(player1, player2) {
        if(player1.name > player2.name) {
            return 1;
        }
        if(player1.name < player2.name) {
            return -1;
        }
        return 0;
    }

    static loadFromDatabase(database, name) {
        // Load one player
        if(name) {
            let dynamodb = new AWS.DynamoDB();
            let params = {
                Key: {
                    name: {
                        S: name,
                    }
                },
                TableName: database,
            };
            return new Promise((resolve, reject) => {
                dynamodb.getItem(params, (err, data) => {
                    if(err) {
                        reject(err);
                    }
                    else { 
                        resolve(new Player(data.Item.javascript.S));
                    }
                });
            });
        }
        // Load all players
        else {
            let dynamodb = new AWS.DynamoDB();
            let params = { TableName: database };
            return new Promise((resolve, reject) => {
                dynamodb.scan(params, (err, data) => {
                    if(err) {
                        reject(err);
                    }
                    else { 
                        let players = data.Items.map(item => new Player(item.javascript.S));
                        players = players.filter(player => player != null);
                        players = players.sort(Player.sort);
                        resolve(players);
                    }
                });
            });
        }
    }

    static async loadFromDirectory(directory) {
        return new Promise((resolve, reject) => {
            fs.readdir(directory, async (err, files) => {
                if(err) {
                    // Shit
                    reject(err);
                }
                else {
                    // Load players
                    let players = files.map(filename => Player.loadFromFile(directory + filename));
                    players = await Promise.all(players);
                    // Remove null players
                    players = players.filter(player => player != null);
                    // Sort players
                    players = players.sort(Player.sort);
                    // Resolve
                    resolve(players);
                }
            });
        });
    }

    static loadFromFile(filename) {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, { encoding: 'utf-8' }, (err, data) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(new Player(data));
                }
            });
        });
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
        return new Promise((resolve, reject) => dynamodb.putItem(params, (err, data) => err ? reject(err) : resolve(data)));
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
