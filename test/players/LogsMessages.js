class Player {

    get name() {
        return 'LogsMessages';
    }

    get ships() {
        console.log('Placing ships');
        return {
               carrier: { bow: { x: 0, y: 0 }, stern: { x: 0, y: 4 } },
            battleship: { bow: { x: 1, y: 0 }, stern: { x: 1, y: 3 } },
               cruiser: { bow: { x: 2, y: 0 }, stern: { x: 2, y: 2 } },
             submarine: { bow: { x: 3, y: 0 }, stern: { x: 3, y: 2 } },
             destroyer: { bow: { x: 4, y: 0 }, stern: { x: 4, y: 1 } },
        };
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
        console.log('Shooting ' + shot.x + ' ' + shot.y);
        return shot;
    }

}
