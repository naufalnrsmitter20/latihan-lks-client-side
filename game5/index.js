/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 640;

class Block {
  constructor(width, height, x, y, color) {
    this.width = width;
    this.height = height;
    this.position = {
      x: x,
      y: y,
    };
    this.color = color;
  }
  start() {
    ctx.strokeStyle = this.color;
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  }
  isTouchGround(mouseX, MouseY) {
    return mouseX <= this.position.x + this.width && this.position.x <= mouseX && MouseY <= this.position.y + this.height && this.position.y <= MouseY;
  }
}

class Player {
  constructor(radius, x, y, color, score, valueCnage) {
    this.radius = radius;
    this.position = {
      x,
      y,
    };
    this.color = color;
    this.score = score;
    this.IsColorChanged = valueCnage;
  }
  start() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  IsMouseDownInCircle(mouseX, mouseY) {
    const dist = Math.sqrt((mouseX - this.position.x) ** 2 + (mouseY - this.position.y) ** 2);
    return dist <= this.radius;
  }

  StartGame(newColor) {
    if (this.IsColorChanged === 0) {
      this.color = newColor;
      this.IsColorChanged = 1;
    } else {
      this.start();
    }
  }
}

const color = {
  color1: "gray",
  color2: "black",
  color3: "white",
};

const blockSize = {
  width: canvas.width / 8,
  height: canvas.height / 8,
};

let blockGroup = [];
let playerGroup = [];
let IndexPlayer1 = [];
let IndexPlayer2 = [];
let isPosition = null;
let isPlayer1 = true;
let isPlayer2 = false;

function showBlocObject() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const blockObject = new Block(blockSize.width, blockSize.height, i * blockSize.width, j * blockSize.height, color.color1);
      blockGroup.push(blockObject);
    }
  }
}
showBlocObject();
function renderScore() {
  const p1 = (document.getElementById("p1").innerHTML = IndexPlayer1.length - 2);
  const p2 = (document.getElementById("p2").innerHTML = IndexPlayer2.length - 2);
  return { p1, p2 };
}
function showTwoPlayer() {
  for (let i = 1; i < 16; i += 2) {
    for (let j = 1; j < 16; j += 2) {
      const player = new Player(blockSize.width / 2, (i * blockSize.width) / 2, (j * blockSize.height) / 2, "white", 0, 0);
      playerGroup.push(player);
    }
  }
  playerGroup[27].color = "black";
  playerGroup[36].color = "black";
  playerGroup[28].color = "orange";
  playerGroup[35].color = "orange";
  playerGroup[27].IsColorChanged = 1;
  playerGroup[36].IsColorChanged = 1;
  playerGroup[28].IsColorChanged = 1;
  playerGroup[35].IsColorChanged = 1;
  IndexPlayer1.push(27, 36);
  IndexPlayer2.push(28, 35);
}
showTwoPlayer();

function findNeighbors(index) {
  const neighbors = [];
  const gridSize = Math.sqrt(playerGroup.length);

  const row = Math.floor(index / gridSize);
  const col = index % gridSize;

  const directions = [
    { rowOffset: -1, colOffset: 0 }, // Atas
    { rowOffset: 1, colOffset: 0 }, // Bawah
    { rowOffset: 0, colOffset: -1 }, // Kiri
    { rowOffset: 0, colOffset: 1 }, // Kanan
  ];

  directions.forEach(({ rowOffset, colOffset }) => {
    const neighborRow = row + rowOffset;
    const neighborCol = col + colOffset;

    if (neighborRow >= 0 && neighborRow < gridSize && neighborCol >= 0 && neighborCol < gridSize) {
      const neighborIndex = neighborRow * gridSize + neighborCol;
      neighbors.push(neighborIndex);
    }
  });

  return neighbors;
}

function updateNearbyPlayers(currentIndex, colorToApply) {
  const neighbors = findNeighbors(currentIndex);
  neighbors.forEach((neighborIndex) => {
    const neighbor = playerGroup[neighborIndex];
    if (neighbor && neighbor.IsColorChanged === 0) {
      neighbor.StartGame(colorToApply);
      neighbor.IsColorChanged = 1;
    }
  });
}

function highlightValidMoves(index) {
  const neighbors = findNeighbors(index);
  neighbors.forEach((neighborIndex) => {
    const neighbor = playerGroup[neighborIndex];
    if (neighbor && neighbor.IsColorChanged === 0) {
      ctx.beginPath();
      ctx.strokeStyle = "yellow";
      ctx.arc(neighbor.position.x, neighbor.position.y, neighbor.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    }
  });
}

function IsGameOver() {
  const remainingMove = playerGroup.some((item) => item.IsColorChanged === 0);
  if (!remainingMove) {
    const Player1Score = IndexPlayer1.length;
    const Player2Score = IndexPlayer2.length;
    alert(`Game Over!, player 1 Score: ${Player1Score}, Player 2 Score: ${Player2Score}`);
    return true;
  }
  return false;
}

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  playerGroup.forEach((player, index) => {
    if (player.IsMouseDownInCircle(mouseX, mouseY)) {
      if (isPlayer1) {
        if (player.IsColorChanged === 0) {
          highlightValidMoves(index);
          player.StartGame("black");
          isPlayer1 = false;
          isPlayer2 = true;
          IndexPlayer1.push(index);
          console.log(IndexPlayer1);
          updateNearbyPlayers(index, "orange");
        }
      } else if (isPlayer2) {
        if (player.IsColorChanged === 0) {
          highlightValidMoves(index);
          player.StartGame("orange");
          isPlayer2 = false;
          isPlayer1 = true;
          IndexPlayer2.push(index);
          console.log(IndexPlayer2);
          updateNearbyPlayers(index, "black");
        }
      }
    }
  });
  if (IsGameOver()) {
    return;
  }
  blockGroup.forEach((item, index) => {
    if (item.isTouchGround(mouseX, mouseY)) {
      // alert(index);
    }
  });
});
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  blockGroup.forEach((item) => {
    item.start();
  });
  playerGroup.forEach((player) => {
    player.start();
  });
  renderScore();

  requestAnimationFrame(render);
}

render();
