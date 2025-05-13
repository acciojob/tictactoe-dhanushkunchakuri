const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const submitBtn = document.getElementById("submit");
const gameSection = document.getElementById("game");
const messageDiv = document.getElementById("message");
const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");

let player1 = "", player2 = "";
let currentPlayer = "";
let symbols = {};
let gameActive = true;

const winningCombinations = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7]             // diagonals
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter names for both players.");
    return;
  }

  symbols = {
    [player1]: "X",
    [player2]: "O"
  };
  currentPlayer = player1;

  gameSection.style.display = "block";
  board.style.display = "grid";
  submitBtn.disabled = true;
  player1Input.disabled = true;
  player2Input.disabled = true;
  updateMessage();
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = symbols[currentPlayer];
    cell.style.pointerEvents = "none";

    if (checkWinner(symbols[currentPlayer])) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
    } else if (isBoardFull()) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
    } else {
      switchTurn();
    }
  });
});

function updateMessage() {
  messageDiv.textContent = `${currentPlayer}, you're up`;
}

function switchTurn() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
  updateMessage();
}

function checkWinner(symbol) {
  return winningCombinations.some(combination => {
    return combination.every(id => {
      return document.getElementById(id.toString()).textContent === symbol;
    });
  });
}

function isBoardFull() {
  return Array.from(cells).every(cell => cell.textContent !== "");
}
