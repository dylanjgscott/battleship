class Player {

    get name() {
        return 'Valid';
    }

    get opponent() {
        return this._opponent;
    }

    set opponent(opponent) {
        this._opponent = opponent;
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
        for(let x in state.board) {
            for(let y in state.board[x]) {
                if(state.board[x][y] === 'ocean') {
                    return new battleship.Shot(x, y);
                }
            }
        }
    }

}
