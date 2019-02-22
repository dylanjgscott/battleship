/* Example Battleship Player
 *
 * General Info:
 * - Battleship!
 * - Provide javascript functions below to place your ships and shoot the enemy.
 * - Winner takes all.
 * - The playing field is a 10 by 10 grid starting at (0,0) and finishing at (9,9).
 * - All coordinate values must be integers (i.e. 0, 1, 2... 9).
 * - All coordinates must be within the board.
 * - Throwing an exception will lose the match.
 * - Taking more than 1000ms will lose the match.
 * - Run the server locally for testing your players if you want (see README.md).
 */

class Player {

    /* Set your player's name here. */
    get name() {
        return 'Example';
    }

    /* The opponents name will be set at the start of each game. */
    set opponent(opponent) {
        this._opponent = opponent;
    }

    /* Use this function to place your ships.
     *
     * This function is called by the game at the start of each match.
     *
     * Ship placement rules:
     * - Ships must be entirely within the board.
     * - Ships can't overlap.
     * - All ships must be present.
     * - No extra ships can be present.
     * - Ships must not be more than one wide.
     * - Carrier must be 5 long.
     * - Battleship must be 4 long.
     * - Cruiser must be 3 long.
     * - Submarine must be 3 long.
     * - Destroyer must be 2 long.
     */
    get ships() {
        return {
            carrier: {
                bow: { x: 0, y: 0 },
                stern: { x: 0, y: 4 },
            },
            battleship: {
                bow: { x: 1, y: 0 },
                stern: { x: 1, y: 3 },
            },
            cruiser: {
                bow: { x: 2, y: 0 },
                stern: { x: 2, y: 2 },
            },
            submarine: {
                bow: { x: 3, y: 0 },
                stern: { x: 3, y: 2 },
            },
            destroyer: {
                bow: { x: 4, y: 0 },
                stern: { x: 4, y: 1 },
            },
        };
    }

    /* Use this function to shoot the enemy ships.
     *
     * This function is called when it's your turn to shoot.
     *
     * Shooting rules:
     * - Shooting a cell twice will lose you the match.
     *
     * The current state of the game will be provided to your function.
     *
     * state.board is a 10 by 10 array which can be one of 4 values:
     * - 'ocean': A cell you have not shot.
     * - 'miss': A cell you have shot but no ship is present.
     * - 'hit': A cell you have shot and hit a ship but the ship is still afloat.
     * - 'sunk': A cell you have shot and hit and the ship has sunk.
     *
     * state.ships is an array of ship names which the opponent still has in play.
     * When a ship is sunk it will not be present in this array.
     * The possible values in the array are:
     * - 'carrier'
     * - 'battleship'
     * - 'cruiser'
     * - 'submarine'
     * - 'destroyer'
     */
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
