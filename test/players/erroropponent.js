class Player {

    get name() {
        return 'Error Opponent';
    }

    get opponent() {
        return this._opponent;
    }

    set opponent(opponent) {
        throw 'test';
    }

    get ships() {
        return {
            carrier: new battleship.Ship(new battleship.Coordinate(4, 0), new battleship.Coordinate(4, 4)),
            battleship: new battleship.Ship(new battleship.Coordinate(3, 0), new battleship.Coordinate(3, 3)),
            cruiser: new battleship.Ship(new battleship.Coordinate(1, 0), new battleship.Coordinate(1, 2)),
            submarine: new battleship.Ship(new battleship.Coordinate(2, 0), new battleship.Coordinate(2, 2)),
            destroyer: new battleship.Ship(new battleship.Coordinate(0, 0), new battleship.Coordinate(0, 1)),
        };
    }

    shoot(state) {
        for(let x = 0; x < 10; x++) {
            for(let y = 0; y < 10; y++) {
                if(state.board[x][y] === 'ocean') {
                    return new battleship.Shot(x, y);
                }
            }
        }
    }

}
