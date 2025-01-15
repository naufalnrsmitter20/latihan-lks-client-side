// Inisialisasi canvas dan grid
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 3; // 3x3 grid
const tileSize = canvas.width / gridSize; // Ukuran tiap sel
let grid = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0], // 0 adalah kotak kosong
];

// Acak grid saat game dimulai
grid = shuffleGrid(grid);

// Gambar ulang grid
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${tileSize / 2}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] !== 0) {
        // Gambar tile angka
        ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
        ctx.fillText(grid[row][col], col * tileSize + tileSize / 2, row * tileSize + tileSize / 2);
      } else {
        // Gambar kotak kosong (tanpa angka)
        ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);
      }
    }
  }
}

// Deteksi klik pemain
canvas.addEventListener("click", (e) => {
  const x = Math.floor(e.offsetX / tileSize);
  const y = Math.floor(e.offsetY / tileSize);

  if (canMove(grid, y, x)) {
    moveTile(grid, y, x);
    drawGrid();
    if (isWin(grid)) alert("You win!");
  }
});

// Logika acak grid
function shuffleGrid(grid) {
  const flattened = grid.flat(); // Ubah grid 2D jadi 1D
  do {
    for (let i = flattened.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flattened[i], flattened[j]] = [flattened[j], flattened[i]];
    }
  } while (!isSolvable(flattened, gridSize)); // Ulangi hingga solvable

  return Array.from({ length: gridSize }, (_, i) => flattened.slice(i * gridSize, i * gridSize + gridSize));
}

function isSolvable(flattened, size) {
  let inversions = 0;
  for (let i = 0; i < flattened.length; i++) {
    for (let j = i + 1; j < flattened.length; j++) {
      if (flattened[i] && flattened[j] && flattened[i] > flattened[j]) {
        inversions++;
      }
    }
  }
  const emptyRow = Math.floor(flattened.indexOf(0) / size);
  return size % 2 === 1 ? inversions % 2 === 0 : (inversions + size - emptyRow) % 2 === 0;
}

// Logika memeriksa apakah tile bisa bergerak
function canMove(grid, row, col) {
  let emptyX, emptyY;

  // Cari posisi kosong
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === 0) {
        emptyX = r;
        emptyY = c;
        break;
      }
    }
  }

  // Periksa apakah posisi bertetangga
  return (row === emptyX && Math.abs(col - emptyY) === 1) || (col === emptyY && Math.abs(row - emptyX) === 1);
}

// Logika memindahkan tile
function moveTile(grid, row, col) {
  let emptyX, emptyY;

  // Cari posisi kosong
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === 0) {
        emptyX = r;
        emptyY = c;
        break;
      }
    }
  }

  // Tukar posisi kosong dengan tile
  [grid[emptyX][emptyY], grid[row][col]] = [grid[row][col], grid[emptyX][emptyY]];
}

// Logika memeriksa kemenangan
function isWin(grid) {
  const flattened = grid.flat();
  for (let i = 0; i < flattened.length - 1; i++) {
    if (flattened[i] !== i + 1) return false;
  }
  return flattened[flattened.length - 1] === 0;
}

// Gambar grid pertama kali
drawGrid();
