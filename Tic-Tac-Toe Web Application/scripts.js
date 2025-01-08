// Select DOM elements
const gameBoard = document.getElementById("game-board");
const gameStatus = document.getElementById("game-status");
const resetBtn = document.getElementById("reset-btn");

let board = Array(9).fill(null); // Represents the 3x3 board
let currentPlayer = "X";
let isGameOver = false;

// Winning combinations
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize the game board
function initializeBoard() {
  gameBoard.innerHTML = ""; // Clear previous cells
  board.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index; // Identify the cell by index
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  });
}

// Handle cell clicks
function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.dataset.index;

  if (board[cellIndex] || isGameOver) return; // Ignore if cell already taken or game over

  board[cellIndex] = currentPlayer; // Update board
  cell.textContent = currentPlayer; // Display player's symbol
  cell.classList.add("taken");

  if (checkWinner()) {
    gameStatus.textContent = `Player ${currentPlayer} wins!`;
    gameStatus.className = "winner";
    isGameOver = true;
    return;
  }

  if (board.every(cell => cell)) {
    gameStatus.textContent = "It's a draw!";
    gameStatus.className = "draw";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a winner
function checkWinner() {
  return winningCombos.some(combo => 
    combo.every(index => board[index] === currentPlayer)
  );
}

// Reset the game
function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  isGameOver = false;
  gameStatus.textContent = "Player X's turn";
  gameStatus.className = "";
  initializeBoard();
}

// Attach reset button listener
resetBtn.addEventListener("click", resetGame);

// Initialize game on load
initializeBoard();
