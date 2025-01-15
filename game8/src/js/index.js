/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;
let isGameOver = false;
let isPaused = false;
let tempStorage = JSON.parse(sessionStorage.getItem("FormData"));
let gridSize = parseInt(tempStorage.board);
let tileSize = canvas.width / gridSize;
let time;

const username = document.getElementById("username");
username.innerHTML = tempStorage.name;

let grid;
if (gridSize === 3) {
  grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];
  time = 30 * 2;
} else if (gridSize === 4) {
  grid = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
  ];
  time = 40;
} else if (gridSize === 5) {
  grid = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 0],
  ];
  time = 50;
}

function setCoundown() {
  setInterval(() => {
    if (!isGameOver) {
      time--;
      const timerPlace = document.getElementById("timer");
      timerPlace.innerHTML = time;
    }
    if (time < 0 && !isGameOver) {
      isGameOver = true;
      clearInterval(time);
    }
  }, 1000);
}
setCoundown();

grid = shuffleGrid(grid);
function writeCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] !== 0) {
        ctx.strokeStyle = "brown";
        ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
        ctx.beginPath();
        ctx.font = "40px Arial";
        ctx.fillStyle = "brown";
        ctx.fillText(grid[row][col], col * tileSize + tileSize / 2.5, row * tileSize + tileSize / 1.6);
        ctx.closePath();
      } else {
        ctx.strokeStyle = "brown";
        ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
      }
    }
  }
}

canvas.addEventListener("click", (e) => {
  const x = Math.floor(e.offsetX / tileSize);
  const y = Math.floor(e.offsetY / tileSize);
  if (canMove(grid, y, x)) {
    moveTile(grid, y, x);
    writeCanvas();
    if (isWin(grid)) {
      alert("You win!");
      clearInterval(time);
      window.location.reload();
    }
  }
});

function shuffleGrid(grid) {
  const flattened = grid.flat();
  do {
    for (let i = flattened.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flattened[i], flattened[j]] = [flattened[j], flattened[i]];
    }
  } while (!isSovable(flattened, gridSize));

  return Array.from({ length: gridSize }, (_, i) => flattened.slice(i * gridSize, i * gridSize + gridSize));
}

function isSovable(flattened, size) {
  let inversion = 0;
  for (let i = 0; i < flattened.length; i++) {
    for (let j = i + 1; j < flattened.length; j++) {
      if (flattened[i] && flattened[j] && flattened[i] > flattened[j]) {
        inversion++;
      }
    }
  }
  const emptyRow = Math.floor(flattened.indexOf(0) / size);
  return size % 2 === 1 ? inversion % 2 === 0 : (inversion + size - emptyRow) % 2 === 0;
}

function canMove(grid, row, col) {
  let emptyX, emptyY;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === 0) {
        emptyX = r;
        emptyY = c;
        break;
      }
    }
  }
  return (row === emptyX && Math.abs(col - emptyY) === 1) || (col === emptyY && Math.abs(row - emptyX) === 1);
}

function moveTile(grid, row, col) {
  let emptyX, emptyY;

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === 0) {
        emptyX = r;
        emptyY = c;
        break;
      }
    }
  }

  [grid[emptyX][emptyY], grid[row][col]] = [grid[row][col], grid[emptyX][emptyY]];
}

function isWin(grid) {
  const flattened = grid.flat();
  for (let i = 0; i < flattened.length - 1; i++) {
    if (flattened[i] !== i + 1) return false;
  }
  return flattened[flattened.length - 1] === 0;
}
writeCanvas();

function animate() {
  if (isGameOver) {
    alert("Time is Over!");
    window.location.reload();
  }
  if (!isGameOver) requestAnimationFrame(animate);
}
animate();
