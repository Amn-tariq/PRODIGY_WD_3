const boardElement = document.getElementById("board");
    const statusElement = document.getElementById("status");
    const restartButton = document.getElementById("restart");
    const playerVsPlayerButton = document.getElementById("player-vs-player");
    const playerVsAiButton = document.getElementById("player-vs-ai");

    let board = Array(9).fill(null);
    let currentPlayer = "X";
    let gameActive = false;
    let isPlayerVsAI = false;


    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];

    // Initialize the board
    function createBoard() {
      boardElement.innerHTML = "";
      board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.addEventListener("click", handleCellClick);
        boardElement.appendChild(cellElement);
      });
    }

    function handleCellClick(event) {
      const index = event.target.dataset.index;

      if (board[index] || !gameActive) return;

      board[index] = currentPlayer;
      event.target.textContent = currentPlayer;
      event.target.classList.add("taken");

      if (checkWin()) {
        statusElement.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }

      if (board.every(cell => cell)) {
        statusElement.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusElement.textContent = isPlayerVsAI && currentPlayer === "O" ? "AI's turn" : `Player ${currentPlayer}'s turn`;

      if (isPlayerVsAI && currentPlayer === "O") {
        setTimeout(aiMove, 500); 
      }
    }

   
    function checkWin() {
      return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
      });
    }

    
    function restartGame() {
      board = Array(9).fill(null);
      currentPlayer = "X";
      gameActive = true;
      statusElement.textContent = isPlayerVsAI ? "Player X's turn" : "Player X's turn";
      createBoard();
    }

    
    function aiMove() {
      const availableCells = board.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null);
      const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

      board[randomIndex] = "O";
      const cellElement = boardElement.querySelector(`.cell[data-index='${randomIndex}']`);
      cellElement.textContent = "O";
      cellElement.classList.add("taken");

      if (checkWin()) {
        statusElement.textContent = "AI wins!";
        gameActive = false;
        return;
      }

      if (board.every(cell => cell)) {
        statusElement.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      currentPlayer = "X";
      statusElement.textContent = "Player X's turn";
    }

    
    playerVsPlayerButton.addEventListener("click", () => {
      isPlayerVsAI = false;
      restartGame();
      restartButton.style.display = "inline-block";
      statusElement.textContent = "Player X's turn";
      gameActive = true;
    });

    playerVsAiButton.addEventListener("click", () => {
      isPlayerVsAI = true;
      restartGame();
      restartButton.style.display = "inline-block";
      statusElement.textContent = "Player X's turn";
      gameActive = true;
    });

    
    restartButton.addEventListener("click", restartGame);

    
    createBoard();