/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const aspectRatio = {
  width: 16,
  height: 9,
};

const displayScreen = {
  width: 64,
  height: 64,
};
let score = 0;

canvas.width = innerWidth;
canvas.height = innerHeight;

const groundObject = new Ground({ image: "/asset/bg-black-segilima.jpg", width: canvas.width, height: canvas.height, position: { x: 0, y: 0 } });
const playerObject = new Player({ width: 20, height: 20, speed: 2, position: { x: canvas.width - 20 * 26, y: canvas.height - 50 } });
const enemyObject = new Enemy({ width: 20, height: 20 });

let isTouchObstacle = false;
let playMusic = false;

const buttonGroup = [
  {
    name: "setting",
    image: "/asset/setting.png",
    x: canvas.width - 50,
    y: 10,
    width: 40,
    height: 40,
  },
  {
    name: "continue",
    image: "/asset/Continue.png",
    x: canvas.width - 251,
    y: 0,
  },
  {
    name: "restart",
    image: "/asset/Restart Game.png",
    x: canvas.width - 251,
    y: 0,
  },
  {
    name: "quit",
    image: "/asset/Quit.png",
    x: canvas.width - 251,
    y: 0,
  },
];

/** @type {HTMLInputElement} */
const inputd = document.querySelector(".range");
const audioMP3 = new Audio("/asset/videoplayback.mp3");
audioMP3.loop = true;

inputd.addEventListener("input", function () {
  audioMP3.volume = inputd.value;
});

window.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowUp":
      playerObject.up();
      if (!playMusic) {
        audioMP3.play();
        playMusic = true;
      }
      break;
    case "ArrowDown":
      playerObject.down();
      if (!playMusic) {
        audioMP3.play();
        playMusic = true;
      }
      break;
    case "ArrowLeft":
      playerObject.left();
      if (!playMusic) {
        audioMP3.play();
        playMusic = true;
      }
      break;
    case "ArrowRight":
      playerObject.right();
      if (!playMusic) {
        audioMP3.play();
        playMusic = true;
      }
      break;
    default:
      break;
  }
});

function drawButton() {
  buttonGroup.forEach((item) => {
    const buttonObject = new Button({ image: item.image, position: { x: item.x, y: item.y }, width: item.width, height: item.height });
    buttonObject.start();
  });
}

let isRunning = true;
let isPause = false;
let animationFrameId;
let isRestart = false;

function render() {
  if (isRunning) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    groundObject.start();
    enemyObject.start();
    enemyObject.random();
    playerObject.update();
    playerObject.start();
    groundObject.addScore();
    if (score >= 30) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      playMusic = false;
      restartGame();
      return alert("Winner!");
    }

    if (
      enemyObject.position.x <= playerObject.position.x + playerObject.width &&
      enemyObject.position.x + enemyObject.width > playerObject.position.x &&
      enemyObject.position.y <= playerObject.position.y + playerObject.height &&
      enemyObject.position.y + enemyObject.height > playerObject.position.y
    ) {
      isTouchObstacle = true;
      score += 5;
      playerObject.speed += 2;
    }
    // if (!isPause) {
    animationFrameId = window.requestAnimationFrame(render);
    // }
  }
}

render();

// js attribute of index

const popUp = document.querySelector(".popup");
function pauseGame() {
  popUp.classList.add("show");
}

function startMusic() {
  if (!playMusic) {
    audioMP3.play();
    playMusic = true;
  } else {
    audioMP3.pause();
    playMusic = false;
  }
}

function continueGame() {
  if (!isRunning) {
    isRunning = true;
  }
  popUp.classList.remove("show");
  isPause = false;
  render();
}

function HandleSetting() {
  isRunning = false;
  pauseGame();
  isPause = true;
  window.cancelAnimationFrame(animationFrameId);
}

function QuitGame() {
  window.location.href = "/start.html";
}

function restartGame() {
  audioMP3.currentTime = 0;
  isRestart = true;
  isRunning = true;
  popUp.classList.remove("show");
  playerObject.position.x = canvas.width - 20 * 26;
  playerObject.position.y = canvas.height - 50;
  enemyObject.position.x = Math.random() * (canvas.width - enemyObject.width) - 0;
  enemyObject.position.y = Math.random() * (canvas.height - enemyObject.height) - 0;
  window.cancelAnimationFrame(animationFrameId);
  score = 0;
  render();
}
