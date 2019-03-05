class Player {

    get name() {
        return 'ShipsException';
    }

    get ships() {
        throw new Error('cannot place ships');
    }

    shoot(state) {
        let shot;
        state.board.forEach((row, x) => {
            row.forEach((cell, y) => {
                if(cell === 'ocean') {
                    shot = {x: x, y: y};
                }
            });
        });
        return shot;
    }

}
