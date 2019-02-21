const React = require('react');

const gameBoard = {
    textAlign: 'center',
    fontSize: '12px',
};

const GameCells = ({ cells }) =>
    cells.map(cell => (
        <td>
            <img src={'/static/' + cell + '.png'} />
        </td>
    ));

const GameRows = ({ rows }) =>
    rows.map((row, index) => (
        <tr>
            <td>{index}</td>
            <GameCells cells={row} />
        </tr>
    ));

const GameBoard = ({ player }) => (
    <table style={gameBoard}>
        <tr>
            <td>x\y</td>
            <td>0</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
        </tr>
        <GameRows rows={player.state.board} />
    </table>
);

module.exports = GameBoard;
