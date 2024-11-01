const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

resetBtn.addEventListener('click', resetGame);

function handleCellClick(cell, index) {
    if (board[index] === "" && isGameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWin()) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            isGameActive = false;
        } else if (board.includes("")) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        } else {
            statusText.textContent = "It's a tie!";
            isGameActive = false;
        }
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => (cell.textContent = ""));
    currentPlayer = 'X';
    isGameActive = true;
    statusText.textContent = "Player X's turn";
}
