/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
canvas.width = 5632;
canvas.height = innerHeight;
const screenWidth = innerWidth;
const imageGrounh = new Image("/src/asset/ground.svg");
const imageGround = new Image("/src/asset/ground.svg").height;
let isWinner = false;
let isGameOver = false;
let playerSpeed = 5;
let isStarting = false;

let ScreenGroup = [
  {
    name: "Amazon",
    url: "/src/asset/amazon.svg",
  },
  {
    name: "Lacerda Elevator",
    url: "/src/asset/bahia.svg",
  },
  {
    name: "Iguacu Falls",
    url: "/src/asset/parana.svg",
  },
  {
    name: "Cable-Stayed",
    url: "/src/asset/saopaulo.svg",
  },
  {
    name: "Patung Kristus",
    url: "/src/asset/rio.svg",
  },
];

const Lintasan = [
  {
    id: 1,
    y: 180,
    upY: 300,
    PWidth: 125,
    PHeight: 122,
  },
  {
    id: 2,
    y: 180,
    upY: 330,
    PWidth: 105,
    PHeight: 102,
  },
  {
    id: 3,
    y: 150,
    upY: 360,
    PWidth: 85,
    PHeight: 82,
  },
];

const ObstacleGroup = [];

let PlayerGroup = ["/src/asset/runner/runner_1.png", "/src/asset/runner/runner_2.png", "/src/asset/runner/runner_3.png", "/src/asset/runner/runner_4.png"];

class Tower {
  constructor(image1, image2, position, width, height) {
    this.image1 = new Image();
    this.image2 = new Image();
    this.image1.src = image1;
    this.image2.src = image2;
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.width = width;
    this.height = height;
  }
  start() {
    ctx.beginPath();
    ctx.drawImage(this.image1, this.position.x - gameObject.cameraOffset, this.position.y, this.width, this.height);
    ctx.closePath();
  }
  update() {
    this.image1 = this.image2;
  }
}

class Obstacle {
  constructor(image, width, height, position) {
    this.image = new Image();
    this.image.src = image;
    this.width = width;
    this.height = height;
    this.position = {
      x: position.x,
      y: position.y,
    };
  }
  start() {
    ctx.beginPath();
    ctx.drawImage(this.image, this.position.x - gameObject.cameraOffset, this.position.y, this.width, this.height);
    ctx.closePath();
  }
}

class Game {
  constructor() {
    this.cameraOffset = 0;
    this.scrollSpeed = playerSpeed;
  }
  update() {
    const scrollThreeSold = screenWidth * 0.3;
    if (PlayerObject.position.x > canvas.width - scrollThreeSold) {
      this.cameraOffset += this.scrollSpeed;
      PlayerObject.position.x -= this.scrollSpeed;
    }
    PlayerObject.update();
  }
}

class Ground {
  constructor(position, image, sky) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.image = new Image();
    this.image.src = image;
    this.sky = new Image();
    this.sky.src = sky;
  }
  start() {
    ctx.beginPath();
    ctx.drawImage(this.image, this.position.x - gameObject.cameraOffset, this.position.y - 260);
    ctx.closePath();
  }

  addSky() {
    ctx.beginPath();
    ctx.drawImage(this.sky, 0 - gameObject.cameraOffset, 36);
    ctx.closePath();
  }
}

class ScreenClass {
  constructor(width, height, position, image, speed, panel, text) {
    this.width = width;
    this.height = height;
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.image = new Image();
    this.image.src = image;
    this.speed = speed;
    this.panel = new Image();
    this.panel.src = panel;
    this.text = text;
  }
  start() {
    ctx.beginPath();
    ctx.drawImage(this.image, this.position.x - gameObject.cameraOffset, this.position.y, this.width, this.height);
    ctx.closePath();
  }
  drawPanel() {
    let PanelPosition = {
      x: this.position.x - gameObject.cameraOffset + this.width / 5,
      y: this.position.y + 544,
    };
    let textPosition = {
      x: this.position.x - gameObject.cameraOffset + this.width / 2.3,
      y: this.position.y + 570,
    };
    ctx.beginPath();
    ctx.drawImage(this.panel, PanelPosition.x, PanelPosition.y, 360, 46);
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(this.text, textPosition.x, textPosition.y);
    ctx.closePath();
  }
}

class Player {
  constructor(width, height, position, speed) {
    this.width = width;
    this.height = height;
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.speed = speed;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.gravity = 0.5;
    this.heightJump = 100;
    this.currentFrame = 0;
    this.frameCounter = 0;
    this.frameSpeed = 10;
    this.lintasanIndex = 0;
    this.isJumping = false;
    this.widthRect = 30;
    this.heightRect = 10;
    this.objectInBottomPlayer = this.position.y - this.height / 2;
    this.rectPosition = {
      x: this.position.x + this.width / 2 + screenWidth * 0.3,
      y: this.objectInBottomPlayer,
    };
  }
  start() {
    const playerImage = new Image();
    playerImage.src = PlayerGroup[this.currentFrame];
    ctx.beginPath();
    ctx.drawImage(playerImage, this.position.x, this.position.y + this.height - 120, this.width, this.height);
    ctx.closePath();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.frameCounter++;
    if (this.frameCounter >= this.frameSpeed) {
      this.currentFrame = (this.currentFrame + 1) % PlayerGroup.length;
      this.frameCounter = 0;
      console.log(this.currentFrame);
    }
  }

  up() {
    if (this.lintasanIndex < 2) {
      this.rectPosition.y = this.objectInBottomPlayer;
      this.lintasanIndex += 1;
    }
  }
  down() {
    if (this.lintasanIndex !== 0) {
      this.rectPosition.y = this.objectInBottomPlayer;
      this.lintasanIndex -= 1;
    }
  }
  jump() {
    if (!this.isJumping) {
      this.velocity.y = -Math.sqrt(2 * this.gravity * this.heightJump);
      this.isJumping = true;
    }
  }
  collision(obstacle) {
    const playerX = this.rectPosition.x - gameObject.cameraOffset;
    const playerY = this.rectPosition.y;
    const playerWidth = this.widthRect;
    const playerHeight = this.heightRect;

    const obstacleX = obstacle.position.x - gameObject.cameraOffset;
    const obstacleY = obstacle.position.y;

    const MARGIN = 5;
    return playerX + MARGIN < obstacleX + obstacle.width && playerX + playerWidth - MARGIN > obstacleX && playerY + MARGIN < obstacleY + obstacle.height && playerY + playerHeight - MARGIN > obstacleY;
  }
  update() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
    this.position.x += this.speed;

    this.rectPosition.y = this.position.y + this.height - 20;

    if (this.position.x > screenWidth * 0.3) {
      gameObject.cameraOffset += this.speed;
      this.position.x = screenWidth * 0.3;
    } else {
      this.position.x += this.velocity.x;
    }
    // vyctrdxrvdbcihuidwtvucjhbvadyigchbiuadhsbxdauyshx
    this.width = Lintasan[this.lintasanIndex].PWidth;
    this.height = Lintasan[this.lintasanIndex].PHeight;

    const groundY = GroundObject.position.y - Lintasan[this.lintasanIndex].y;
    if (this.position.y >= groundY) {
      this.position.y = groundY;
      this.velocity.y = 0;
      this.isJumping = false;
    }
    const groundUp = GroundObject.position.y - Lintasan[this.lintasanIndex].upY;
    if (gameObject.cameraOffset >= canvas.width / 1.359 && !isWinner) {
      this.position.y = groundUp;
    }

    if (gameObject.cameraOffset >= canvas.width / 1.2 && !isWinner) {
      this.velocity.x = 0;
      this.velocity.y = 0;
      this.speed = 0;
      this.currentFrame = 0;
      this.frameCounter = 0;
      isWinner = true;

      if (isWinner) {
        TowerObject.update();
        setTimeout(() => {
          alert("Winner");
          window.location.reload();
        }, 1000);
      }
    }
  }
  addRect() {
    ctx.beginPath();
    ctx.fillStyle = gameObject.cameraOffset >= canvas.width / 1.359 && !isWinner ? "Transparent" : "Black";
    ctx.fillRect(this.rectPosition.x, this.rectPosition.y, this.widthRect, this.heightRect);
    ctx.closePath();
  }
}

const TempGroup = [];

const GroundObject = new Ground({ x: 0, y: canvas.height }, "/src/asset/ground.svg", "/src/asset/sky.svg");
for (let i = 0; i < ScreenGroup.length; i++) {
  const screenObject = new ScreenClass(600, 482, { x: 1000 + 600 * (i * 1.4), y: 10 }, ScreenGroup[i].url, 10, "/src/asset/panel.svg", ScreenGroup[i].name);
  TempGroup.push(screenObject);
}
const PlayerObject = new Player(125, 122, { x: 20, y: GroundObject.position.y }, playerSpeed);
const gameObject = new Game();
const TowerObject = new Tower("/src/asset/pyre.svg", "/src/asset/pyre_fire.svg", { x: canvas.width - 400, y: canvas.height - 500 }, 153, 312);
function SpawnObstacle() {
  const lintasanLength = Lintasan.length;
  const TotalObstacle = Math.floor(Math.random() * 10) + 5;
  for (let j = 0; j < TotalObstacle; j++) {
    const randomObstacle = Math.floor(Math.random() * lintasanLength);
    const randomVerticalPosition = Math.floor(Math.random() * 20) + 1;
    const ObstacleObject = new Obstacle("/src/asset/obstacle.svg", 28, 74, { x: j * 100 * randomVerticalPosition, y: GroundObject.position.y - Lintasan[randomObstacle].y });
    ObstacleGroup.push(ObstacleObject);
  }
}
SpawnObstacle();
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      PlayerObject.down();
      break;
    case "ArrowUp":
      e.preventDefault();
      PlayerObject.up();
      break;
    case " ":
      e.preventDefault();
      PlayerObject.jump();
      break;
    default:
      break;
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!isWinner && !isGameOver) {
    GroundObject.addSky();
    TempGroup.forEach((item) => {
      item.start();
      item.drawPanel();
    });
    GroundObject.start();
    gameObject.update();
    PlayerObject.start();
    PlayerObject.update();
    PlayerObject.addRect();
    TowerObject.start();
    PlayerObject.speed = Math.min(PlayerObject.speed, 10);

    ObstacleGroup.forEach((item) => {
      const isCollision = PlayerObject.collision(item);
      if (isCollision) {
        isGameOver = true;
        alert("Game Over!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      item.start();
    });
  } else {
    isWinner = false;
    isGameOver = false;
  }
  if (!isWinner && !isGameOver) window.requestAnimationFrame(animate);
}

function StartGame() {
  isStarting = true;
  const modal = document.getElementById("sect");
  modal.classList.add("hide");
  animate();
}
