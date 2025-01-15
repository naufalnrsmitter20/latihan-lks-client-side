/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
let isGameOver = false;
let isPressig = false;
let enemyGroup = [];
let HeartGroup = [];
let HeartLength = 3;
let scoreNum = 0;
let FinishGame = false;

const QuestionObject = [
  {
    id: 1,
    name: "Siapakah Presiden Pertama Yang Menjabat Di Indonesia!",
    answer: [
      {
        id: "A",
        text: "Soekarno",
      },
      {
        id: "B",
        text: "Soeharto",
      },
    ],
    correctAnswer: "A",
    isSolve: false,
  },
  {
    id: 2,
    name: "Di Bawah Ini Yang Termasuk Alat Elektronik Adalah!",
    answer: [
      {
        id: "A",
        text: "Meja",
      },
      {
        id: "B",
        text: "Handphone",
      },
    ],
    correctAnswer: "B",
    isSolve: false,
  },
  {
    id: 3,
    name: "apa yang dimaksud dengan seni rupa 2 dimensi ?",
    answer: [
      {
        id: "A",
        text: "Karya seni yang memiliki panjang, lebar, dan volume",
      },
      {
        id: "B",
        text: "Karya seni yang hanya memiliki panjang dan lebar",
      },
    ],
    correctAnswer: "B",
    isSolve: false,
  },
  {
    id: 4,
    name: "Apa fungsi utama dari garis dalam seni rupa?",
    answer: [
      {
        id: "A",
        text: "Untuk menentukan bentuk dan arah",
      },
      {
        id: "B",
        text: "Untuk membuat karya terlihat realistis",
      },
    ],
    correctAnswer: "A",
    isSolve: false,
  },
  {
    id: 5,
    name: "Apa yang dimaksud dengan seni rupa terapan?",
    answer: [
      {
        id: "A",
        text: "Seni yang memiliki fungsi praktis dalam kehidupan sehari-hari",
      },
      {
        id: "B",
        text: "Seni yang dibuat untuk tujuan estetika saja",
      },
    ],
    correctAnswer: "A",
    isSolve: false,
  },
];
let filteredQuestion = [];
let currentQuestion;
function setFilteredQuestion() {
  filteredQuestion = QuestionObject.filter((x) => x.isSolve === false);
  currentQuestion = filteredQuestion[Math.floor(Math.random() * filteredQuestion.length)];
}
setFilteredQuestion();

const spriteGroup = ["/src/asset/sprite/0.png", "/src/asset/sprite/1.png", "/src/asset/sprite/2.png", "/src/asset/sprite/3.png", "/src/asset/sprite/4.png"];

const GroundObject = new Ground(0, 0, canvas.width, canvas.height, "/src/asset/bg.png");

function AddHeart() {
  for (let i = 0; i < HeartLength; i++) {
    const heartObject = new Heart((i + 22) * 60, 20, 50, 50, "/src/asset/heart.png");
    HeartGroup.push(heartObject);
  }
}
AddHeart();
const SpriteObject = new Sprites((canvas.width - 36) / 2, (canvas.height - 28) / 1.1, 36, 28);
function spawnEnemyGroup() {
  for (let i = 0; i < 2; i++) {
    if (filteredQuestion.length !== 0) {
      const EnemyObject = new Enemy(((i + 1) * (canvas.width - 36)) / 3, 10, 36, 28, ((i + 1) * (canvas.width - 36)) / 3.1, -6, currentQuestion.answer[i].text);
      enemyGroup.push(EnemyObject);
    }
  }
}
spawnEnemyGroup();
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      SpriteObject.shoot();
      break;
    case "ArrowRight":
      if (!isPressig) {
        SpriteObject.right();
        isPressig = true;
      }
      break;
    case "ArrowLeft":
      if (!isPressig) {
        SpriteObject.left();
        isPressig = true;
      }
      break;

    default:
      break;
  }
});

function collision(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width && obj2.x < obj1.x + obj1.width && obj1.y < obj2.y + obj2.height && obj2.y < obj1.y + obj1.height;
}

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      SpriteObject.destroyX();
      isPressig = false;
      break;
    case "ArrowRight":
      SpriteObject.destroyX();
      isPressig = false;
      break;
    default:
      break;
  }
});
let isTiled = false;
let next = false;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  GroundObject.start();
  GroundObject.addScore();
  HeartGroup.forEach((x) => {
    x.start();
  });
  SpriteObject.addBullet();

  SpriteObject.start();
  SpriteObject.update();
  enemyGroup.forEach((item, index) => {
    item.addBullet();
    item.start();
    item.update();
    item.addText();

    const collishBullet = collision(item, SpriteObject.bullet);
    let isCorrectAnswer;
    if (filteredQuestion.length !== 0) {
      isCorrectAnswer = currentQuestion.answer[index].id === currentQuestion.correctAnswer;
    }
    if (collishBullet && isCorrectAnswer) {
      SpriteObject.backToPosition();
      currentQuestion.isSolve = true;
      scoreNum += 1;
      if (filteredQuestion.length !== 0) {
        enemyGroup = [];
        setFilteredQuestion();
        spawnEnemyGroup();
      }
    } else if (collishBullet && !isCorrectAnswer) {
      isTiled = true;
      SpriteObject.backToPosition();
      item.shoot();
    }
    const collishBulletInPlayer = collision(SpriteObject, item.bullet);
    if (collishBulletInPlayer) {
      item.backToPosition();
      HeartGroup.splice(0, 1);
      isTiled = false;
    }
    const collshPlayer = collision(item, SpriteObject);
    if (collshPlayer) {
      SpriteObject.over();
      setTimeout(() => {
        isGameOver = true;
      }, 2000);
    }
  });
  GroundObject.addQuestion();
  if (filteredQuestion.length == 0) FinishGame = true;
  if (HeartGroup.length == 0) isGameOver = true;
  if (isGameOver) {
    alert("Game Over!");
    window.location.reload();
    return;
  }
  if (FinishGame) {
    alert(`Game Finished! \nScore: ${scoreNum}`);
    window.location.reload();
    return;
  }
  if (!isGameOver) requestAnimationFrame(animate);
}
animate();
