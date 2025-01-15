// Define constants and initial setup
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let monsterGroup = [];
let DataCardValue = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let card;
let selectedMonsters = [];
let backgroundMusic;

// Side class
class Side {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// Card class
class Card {
  constructor(x, y, width, height, value, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.value = value;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.value, this.x + this.width / 2, this.y + this.height / 2 + 7);
  }
}

// Monster class
class Monster {
  constructor(x, y, size, value, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.value = value;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.value, this.x, this.y + 5);
  }
}

// Helper functions
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnMonsters(count) {
  for (let i = 0; i < count; i++) {
    const x = randomInt(50, canvas.width - 50);
    const y = randomInt(50, canvas.height - 50);
    const size = 25;
    const value = DataCardValue[randomInt(0, DataCardValue.length - 1)];
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    monsterGroup.push(new Monster(x, y, size, value, color));
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function isTrueAnswer() {
  const sum = selectedMonsters.reduce((acc, monster) => acc + monster.value, 0);
  return sum === card.value;
}

function handleSelection(monster) {
  if (!selectedMonsters.includes(monster)) {
    selectedMonsters.push(monster);
    monster.color = "gold"; // Highlight selected monster
  }
}

function resetSelection() {
  selectedMonsters.forEach((monster) => (monster.color = `hsl(${Math.random() * 360}, 50%, 50%)`));
  selectedMonsters = [];
}

// Initialize game elements
function initializeGame() {
  card = new Card(canvas.width / 2 - 50, 10, 100, 50, randomInt(10, 20), "white");
  spawnMonsters(5);
}

// Animation loop
function animate() {
  clearCanvas();
  card.draw();
  monsterGroup.forEach((monster) => monster.draw());
  requestAnimationFrame(animate);
}

// Event listeners
canvas.addEventListener("mousedown", (e) => {
  const { offsetX: mouseX, offsetY: mouseY } = e;

  monsterGroup.forEach((monster) => {
    const distance = Math.hypot(monster.x - mouseX, monster.y - mouseY);
    if (distance < monster.size) {
      handleSelection(monster);
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (isTrueAnswer()) {
      alert("Correct!");
      resetSelection();
      initializeGame();
    } else {
      alert("Incorrect, try again!");
      resetSelection();
    }
  }
});

// Start the game
initializeGame();
animate();
