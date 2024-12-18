/**@type {HTMLCanvasElement} */
var canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

const aspectRatio = {
  x: 16,
  y: 9,
};
const displayInGame = {
  x: 64,
  y: 64,
};
canvas.width = innerWidth;
canvas.height = innerHeight;

const playerProperty = {
  name: "Player 1",
  width: 50,
  height: 150,
  speed: 1,
  color: "yellow",
  position: {
    x: 40,
    y: canvas.height - 150,
  },
};
const enemyProperty = {
  name: "Enemy 1",
  width: 50,
  height: 150,
  speed: 1,
  color: "red",
  position: {
    x: canvas.width - 50,
    y: canvas.height - 150,
  },
};

const GlobalObstacles = [];
let isGameOver = false;
let TempScore = [];
let score = 0;
let scoreFix = 0;
let isJumping = false;
let isDrowned = false;
let isFire = false;
let storageFire = 0;
let isBulletNabrakObstacle = false;

const groundObject = new Ground(canvas.width, canvas.height, "/src/asset/bg.png", 2);
const playerObject = new Sprite(playerProperty.width, playerProperty.height, { x: playerProperty.position.x, y: playerProperty.position.y }, playerProperty.color, playerProperty.speed);
function createRandomObstacles() {
  const obstacle = new Obstacle({
    width: 50,
    height: 50,
    position: { x: canvas.width, y: canvas.height - Math.random() * 100 - 50 },
    speed: 10,
    color: "black",
  });
  GlobalObstacles.push(obstacle);
}

const bulletObject = new Bullet({
  width: 27,
  height: 5,
  position: {
    x: playerProperty.position.x + playerObject.width / 2,
    y: playerProperty.position.y + playerProperty.height / 2,
  },
  speed: 6,
  bulletPlus: 0,
  bulletFire: 0,
});
setInterval(() => {
  createRandomObstacles();
}, Math.random() * 5000 + 1000);
let BulletSize = {
  width: bulletObject.width,
  height: bulletObject.height,
};
window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      if (!isJumping) {
        playerObject.jump();
        isJumping = true;
      }
      break;
    case "w":
      bulletObject.UpBullet();
      break;
    case "s":
      bulletObject.DownBullet();
      break;
    case "r":
      bulletObject.fire();
      // obstacle.position.y = -999999999;
      break;
    case "ArrowDown":
      // bulletObject.position.y = playerObject.position.y + playerObject.height / 2;
      if (!isDrowned) {
        playerObject.turnDown();
        isDrowned = true;
      }
      break;
  }
});

window.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowUp":
      playerObject.bulletUps();
      isJumping = false;
      break;
    case "ArrowDown":
      playerObject.turnDownUp();
      isDrowned = false;
      break;
  }
});

let collesion = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  score = Math.abs(groundObject.position.x);
  if (score === 1000) {
    TempScore.push(score);
  }
  if (TempScore.length !== 0) {
    scoreFix = TempScore.reduce((acc, curr) => {
      return acc + curr;
    });
  }
  if (isBulletNabrakObstacle) {
    bulletObject.position.x = playerObject.position.x;
    isBulletNabrakObstacle = false;
    bulletObject.bulletFire = 0;
    isFire = false;
  }

  groundObject.start();
  groundObject.addText();
  groundObject.addScore(score);
  groundObject.setHighScore();
  playerObject.start();
  playerObject.update();
  bulletObject.add();
  bulletObject.update();
  playerObject.bulletUps();

  collesion = canvas.height - playerObject.height;

  GlobalObstacles.forEach((obstacle, index) => {
    obstacle.add();
    obstacle.move();
    if (obstacle.position.x + obstacle.width < 0) {
      GlobalObstacles.splice(index, 1);
    }
    if (
      obstacle.position.x + 14.002 <= playerObject.position.x + playerObject.width &&
      obstacle.position.x + 14.002 + obstacle.width >= playerObject.position.x &&
      obstacle.position.y + 14 <= playerObject.position.y + playerObject.height &&
      obstacle.position.y + 14 + obstacle.height >= playerObject.position.y
    ) {
      isGameOver = true;
    } else if (
      obstacle.position.x + obstacle.width >= bulletObject.position.x &&
      obstacle.position.x <= bulletObject.width + bulletObject.position.x &&
      obstacle.position.y + obstacle.height >= bulletObject.position.y &&
      obstacle.position.y <= bulletObject.height + bulletObject.position.y
    ) {
      isBulletNabrakObstacle = true;
      obstacle.position.y = -999999999;
    }
  });

  if (isGameOver) {
    groundObject.end();
    let storageSet = JSON.parse(sessionStorage.getItem("dataScore"));
    if (storageSet) {
      if (storageSet <= scoreFix + score) {
        sessionStorage.removeItem("dataScore");
        sessionStorage.setItem("dataScore", scoreFix + score);
      } else {
        console.log("anda belum mencapai skor maksimum saat ini!");
      }
    } else {
      sessionStorage.setItem("dataScore", scoreFix + score);
    }
    const confirmation = confirm(`Game Over! \nSkor anda: ${scoreFix + score - 2} \nRestart?`);
    if (confirmation) {
      window.location.reload();
    }
    return;
  }

  window.requestAnimationFrame(animate);
}
animate();
