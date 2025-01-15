const canvas = document.getElementById("canvasGame");
const ctx = canvas.getContext("2d");

const turnIndicator = document.getElementById("circle");
const orangeScore = document.getElementById("orange-score");
const blackScore = document.getElementById("black-score");
const indicatorStyle = `width:80px; height:80px; border-radius:50%; margin-top: 20px;`;

const gridCount = 8;
const tileSize = 68,
  tileSpacing = 2;
let board = Array(gridCount)
  .fill(null)
  .map(() => Array(gridCount).fill(null));
let isOrangeTurn = true;
let hintsVisible = false;
let hintCount = 0;
let blackPieces = 0,
  orangePieces = 0;

let scoreOrange = [];
let scoreBlack = [];

function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function initBoardh() {
  let x = 0,
    y = 0;
  for (let row = 0; row < gridCount; row++) {
    x = 0;
    for (let col = 0; col < gridCount; col++) {
      board[row][col] = {
        x,
        y,
        width: tileSize,
        height: tileSize,
        occupied: false,
        piece: null,
        hint: null,
        validDirections: [],
      };
      x += tileSize + tileSpacing;
    }
    y += tileSize + tileSpacing;
  }
}

function drawPiece(row, col, color) {
  const tile = board[row][col];
  const centerX = tile.x + tileSize / 2;
  const centerY = tile.y + tileSize / 2;
  const radius = 30;

  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawHint(row, col, color) {
  const tile = board[row][col];
  const centerX = tile.x + tileSize / 2;
  const centerY = tile.y + tileSize / 2;
  const radius = 20;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function renderBoard() {
  resetCanvas();
  for (let row = 0; row < gridCount; row++) {
    for (let col = 0; col < gridCount; col++) {
      const tile = board[row][col];

      ctx.fillStyle = "#c0c0c0";
      ctx.fillRect(tile.x, tile.y, tile.width, tile.height);

      if (tile.piece) {
        drawPiece(row, col, tile.piece);
      }
      if (tile.hint && hintsVisible) {
        drawHint(row, col, isOrangeTurn ? "orange" : "black");
      }
    }
  }
}

function updateScores() {
  blackPieces = 0;
  orangePieces = 0;

  for (let row = 0; row < gridCount; row++) {
    for (let col = 0; col < gridCount; col++) {
      const tile = board[row][col];
      if (tile.piece === "black") {
        blackPieces++;
      } else if (tile.piece === "orange") {
        orangePieces++;
      }
    }
  }

  orangeScore.innerText = `Orange Score: ${orangePieces}`;
  blackScore.innerText = `Black Score: ${blackPieces}`;

  if (hintCount === 0) {
    const winner = blackPieces > orangePieces ? "Black" : orangePieces > blackPieces ? "Orange" : "Tie";
    alert(`Game Over! Player: ${winner} is Winner!`);
  }
}

function toggleTurn() {
  isOrangeTurn = !isOrangeTurn;
  turnIndicator.style.cssText = `${indicatorStyle} background-color: ${isOrangeTurn ? "orange" : "black"}`;
}

function initializePieces() {
  board[3][3].occupied = true;
  board[3][3].piece = "orange";
  board[3][3].ignoreScore = true;
  board[3][4].occupied = true;
  board[3][4].piece = "black";
  board[3][4].ignoreScore = true;
  board[4][3].occupied = true;
  board[4][3].piece = "black";
  board[4][3].ignoreScore = true;
  board[4][4].occupied = true;
  board[4][4].piece = "orange";
  board[4][4].ignoreScore = true;
}

function generateHints() {
  hintCount = 0;
  const currentColor = isOrangeTurn ? "orange" : "black";

  for (let row = 0; row < gridCount; row++) {
    for (let col = 0; col < gridCount; col++) {
      const tile = board[row][col];
      tile.hint = null;
      tile.validDirections = [];

      if (!tile.occupied) {
        evaluateDirections(row, col, currentColor);
      }
    }
  }

  updateScores();
}

function evaluateDirections(row, col, color) {
  const directions = [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
  ];

  for (const { dx, dy } of directions) {
    let x = row + dx,
      y = col + dy;
    let foundOpponent = false;

    while (x >= 0 && x < gridCount && y >= 0 && y < gridCount) {
      const target = board[x][y];
      if (!target.occupied) break;
      if (target.piece !== color) foundOpponent = true;
      else {
        if (foundOpponent) {
          board[row][col].hint = color;
          board[row][col].validDirections.push({ dx, dy });
          hintCount++;
        }
        break;
      }
      x += dx;
      y += dy;
    }
  }
}

function applyMove(row, col) {
  const tile = board[row][col];
  tile.occupied = true;
  tile.piece = isOrangeTurn ? "orange" : "black";

  for (const { dx, dy } of tile.validDirections) {
    let x = row + dx,
      y = col + dy;

    while (x >= 0 && x < gridCount && y >= 0 && y < gridCount) {
      const target = board[x][y];
      if (target.piece === tile.piece) break;
      target.piece = tile.piece;
      x += dx;
      y += dy;
    }
  }

  toggleTurn();
  generateHints();
  renderBoard();
}

canvas.addEventListener("click", (event) => {
  const x = event.pageX - canvas.offsetLeft;
  const y = event.pageY - canvas.offsetTop;

  for (let row = 0; row < gridCount; row++) {
    for (let col = 0; col < gridCount; col++) {
      const tile = board[row][col];
      if (x > tile.x && x < tile.x + tileSize && y > tile.y && y < tile.y + tileSize && tile.hint) {
        applyMove(row, col);
        return;
      }
    }
  }
});

function main() {
  blackPieces = 0;
  orangePieces = 0;
  orangeScore.innerText = `Orange Score: 0`;
  blackScore.innerText = `Black Score: 0`;
  turnIndicator.style.cssText = `${indicatorStyle} background-color: orange;`;
  initBoardh();
  initializePieces();
  renderBoard();
  generateHints();
}

main();
