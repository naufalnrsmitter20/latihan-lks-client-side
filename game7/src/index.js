/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 600;
let isGameOver = false;
let isGameStart = false;
let isPause = false;
let score = 0;

const tempStorage = JSON.parse(sessionStorage.getItem("playerData"));
const level = ["easy", "medium", "hard"];

function RenderBackground() {
  ctx.beginPath();
  const bg = new Image();
  bg.src = "/src/asset/background.jpg";
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.closePath();
}
function RenderHeader() {
  ctx.beginPath();
  ctx.fillStyle = "rgba(0, 0, 0, 0.373)";
  ctx.fillRect(0, 0, canvas.width, 50);
  ctx.closePath();
}
function formatTime(second) {
  const minutes = Math.floor(second / 60);
  const secs = second % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

let countDownStart = 4;
let countdownTime;

if (tempStorage.level === level[0].toString()) {
  countdownTime = 30;
} else if (tempStorage.level === level[1].toString()) {
  countdownTime = 20;
} else if (tempStorage.level === level[2].toString()) {
  countdownTime = 15;
}

function setCountDownStart() {
  const startCount = document.getElementById("countdown");
  setInterval(() => {
    countDownStart--;
    startCount.textContent = countDownStart;
    if (countDownStart === 0) {
      startCount.textContent = "START";
      clearInterval(countDownStart);
      isGameStart = true;
      setTimeout(() => {
        startCount.remove();
      }, 1000);
    }
  }, 1000);
}
setCountDownStart();

function setCountDownTime() {
  setInterval(() => {
    if (isGameStart && !isPause) {
      countdownTime--;
    }
    if (countdownTime < 0 && !isGameOver) {
      displayPlayerHistory();
      countdownTime = 0;
      clearInterval(countdownTime);
      isGameOver = true;
    }
  }, 1000);
}

setCountDownTime();

function AddTimeText() {
  ctx.beginPath();
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Time : ${formatTime(countdownTime)}`, canvas.width - 200, 32);
  ctx.closePath();
}
function AddScoreText() {
  ctx.beginPath();
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Score : ${score}`, canvas.width - 200 * 2.7, 32);
  ctx.closePath();
}
function AddPlayerNameText() {
  ctx.beginPath();
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(tempStorage.username, 50, 32);
  ctx.closePath();
}
function collision(obj1, obj2) {
  return obj1.x <= obj2.x + obj2.width && obj2.x <= obj1.x + obj1.width && obj1.y <= obj2.y + obj2.height && obj2.y <= obj1.y + obj1.height;
}
// class
const enemyGroup = [];
const gripObject = new Grip(tempStorage.gunWidth, tempStorage.gunHeight, (canvas.width - 500) / 2, canvas.height - 300, tempStorage.gun);
const pointerObject = new Pointer("/src/asset/pointer.png", 53, 53, gripObject.x, gripObject.y);
function spawnEnemyTarget() {
  for (let i = 0; i < 3; i++) {
    const randomX = Math.floor(Math.random() * (canvas.width - 148));
    const randomY = Math.floor(Math.random() * (canvas.height - 148));
    const enemyObject = new Enemy(148, 148, randomX, randomY, tempStorage.target);
    enemyGroup.push(enemyObject);
  }
}
// class

window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case " ":
      gripObject.updateGrip();
      break;
    default:
      break;
  }
});

setInterval(() => {
  if (!isPause) {
    enemyGroup.splice(0, 3);
    spawnEnemyTarget();
  }
}, 3000);
let isFire;
const pointerData = {
  x: gripObject.x,
  y: gripObject.y - 30,
  width: 53,
  height: 53,
};

canvas.addEventListener("mousedown", function () {
  if (!isFire) {
    enemyGroup.filter((item, index) => {
      const collish = collision(pointerObject, item);
      if (collish) {
        enemyGroup.splice(index, 1);
        score += 5;
        return false;
      }
      console.log("not collish");
      // countdownTime -= 5;
      return true;
    });
    isFire = true;
  }
});
canvas.addEventListener("mouseup", function () {
  isFire = false;
});

window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "Escape":
      PauseGame();
      break;

    default:
      break;
  }
});

function PauseGame() {
  const modal = document.getElementById("modal-show");
  if (!isPause) {
    isPause = true;
    modal.classList.remove("hide");
    cancelAnimationFrame();
  } else {
    modal.classList.add("hide");
    isPause = false;
  }
}

function saveScore() {
  localStorage.setItem("score", score);
}
let historyGroup = [];
let isSetScore = false;
function saveHistory() {
  if (!isSetScore) {
    saveScore();
    const Storage = localStorage.getItem("history");
    const username = tempStorage.username;
    let dataGame = Storage ? JSON.parse(Storage) : [];
    dataGame.push({ username, score });
    localStorage.setItem("history", JSON.stringify(dataGame));
    isSetScore = true;
    return alert("Score berhasil disimpan!");
  } else {
    return alert("Anda sudah set score!");
  }
}

function displayPlayerHistory() {
  const modal = document.getElementById("modal-game-over");
  const usernameContent = document.getElementById("username");
  const scoreContent = document.getElementById("score");
  usernameContent.textContent = tempStorage.username;
  scoreContent.textContent = `Score: ${score}`;
  modal.classList.remove("hide");
}

window.addEventListener("mousemove", function (e) {
  if (!isPause) {
    gripObject.x = e.clientX - gripObject.width / 2;
    gripObject.y = e.clientY - gripObject.height / 3;
    pointerObject.x = gripObject.x;
    pointerObject.y = gripObject.y - 30;
    gripObject.start();
    pointerObject.start();
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  RenderBackground();
  RenderHeader();
  if (isGameStart && !isGameOver) {
    AddTimeText();
    AddScoreText();
    AddPlayerNameText();
    enemyGroup.forEach((item) => {
      item.start();
    });
    gripObject.start();
    pointerObject.start();
  }
  requestAnimationFrame(animate);
}
animate();

const StorageData = localStorage.getItem("history");
const place = document.getElementById("history-game");
let historyData = JSON.parse(StorageData);
const originalData = JSON.parse(StorageData);
let sorted = false;
function SortDataByScore() {
  if (!sorted) {
    historyData.sort((acc, curr) => {
      return curr.score - acc.score;
    });
  }
}
/**@type {HTMLSelectElement} */
const selectSort = document.getElementById("sort");

selectSort.addEventListener("input", function () {
  if (selectSort.value == "score-sort") {
    SortDataByScore();
    replaceHistoryGame();
    sorted = true;
  } else {
    historyData = originalData;
    replaceHistoryGame();
    sorted = false;
  }
});
function replaceHistoryGame() {
  const data = historyData.map((item) => {
    return `
    <div>
            <div class="history-group">
              <div>
                <h3>${item.username}</h3>
                <p><i>Score: ${item.score}</i></p>
              </div>
              <button class="btn-beda"><i>Detail</i></button>
            </div>
            <div class="line"></div>
          </div>
    `;
  });
  place.innerHTML = data;
}
replaceHistoryGame();
