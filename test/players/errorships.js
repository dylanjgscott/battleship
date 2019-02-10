class Player {

    get name() {
        return 'Error Ships';
    }

    get opponent() {
        return this._opponent;
    }

    set opponent(opponent) {
        this._opponent = opponent;
    }

    get ships() {
        throw 'test';
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