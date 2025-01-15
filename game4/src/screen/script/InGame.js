const levelData = JSON.parse(sessionStorage.getItem("dataLevel"));
const title = (document.querySelector("title").innerText = `Level ${levelData.level}`);
let soundMP3;
soundMP3 = new Audio("/src/asset/audio/music.wav");
soundMP3.loop = true;
const getVolumeSetting = document.querySelector(".rangeInput");
const getModalVolume = document.getElementById("manage-volume");
let countNumber = [];
let curretNumber = 0;
let correntNumber = 0;
let getIndexMonster;
let getIndexCard;

window.addEventListener("input", function () {
  soundMP3.volume = getVolumeSetting.value;
});
function onClickSettings() {
  try {
    getModalVolume.classList.remove("hids");
    soundMP3.pause();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function onClickSound() {
  try {
    if (!soundMP3) {
      soundMP3.volume = getVolumeSetting.value;
    }
    if (soundMP3.paused) {
      soundMP3.play();
    } else {
      soundMP3.pause();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
const onCloseSetting = () => {
  try {
    soundMP3.play();
    getModalVolume.classList.add("hids");
  } catch (error) {
    console.log(error);
  }
};
let AnswerStatus;

/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

class Side {
  constructor(width, height, position, image) {
    this.width = width;
    this.height = height;
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.image = new Image();
    this.image.src = image;
  }
  start() {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}

class Card {
  constructor(width, height, position, image, text = null) {
    this.width = width;
    this.height = height;
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.image = new Image();
    this.image.src = image;
    this.text = text;
  }
  start() {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
  writeNumber() {
    ctx.beginPath();
    ctx.font = "36px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(this.text, this.position.x + this.width / 2, this.position.y + this.height / 2);
    ctx.textAlign = "center";
    ctx.closePath();
  }
  isTrueAnswer(indexMonster, indexCard) {
    if (parseInt(mainCard[indexCard].text) == correntNumber) {
      AnswerStatus = true;
      mainCard.splice(indexCard, 1);
      monsterGroup.splice(indexMonster, countNumber.length);
      correntNumber = 0;
    }
  }
}

class Rectangle {
  constructor(width, height, position, color) {
    this.width = width;
    this.height = height;
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.color = color;
  }
  start() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    ctx.closePath();
  }
}

const DataMonstersCharacter = [
  {
    char1: "/src/asset/img/Character/no-bg/Character (1).png",
    char2: "/src/asset/img/Character/no-bg/Character (2).png",
    char3: "/src/asset/img/Character/no-bg/Character (3).png",
    value: Math.floor(Math.random() * 10 + 1),
    color: "blue",
  },
  {
    char1: "/src/asset/img/Character/no-bg/Character (9).png",
    char2: "/src/asset/img/Character/no-bg/Character (10).png",
    char3: "/src/asset/img/Character/no-bg/Character (5).png",
    value: Math.floor(Math.random() * 10 + 1),
    color: "yellow",
  },
  {
    char1: "/src/asset/img/Character/no-bg/Character (8).png",
    char2: "/src/asset/img/Character/no-bg/Character (7).png",
    char3: "/src/asset/img/Character/no-bg/Character (6).png",
    value: Math.floor(Math.random() * 10 + 1),
    color: "pink",
  },
  {
    char1: "/src/asset/img/Character/no-bg/Character (4).png",
    char2: "/src/asset/img/Character/no-bg/Character (11).png",
    char3: "/src/asset/img/Character/no-bg/Character (12).png",
    value: Math.floor(Math.random() * 10 + 1),
    color: "green",
  },
];

const step1 = [{ xy: 11 }, { xy: 10 }, { xy: 9 }];
const step2 = [{ xy: 8 }, { xy: 7 }, { xy: 6 }];
const step3 = [{ xy: 5 }, { xy: 4 }, { xy: 3 }];
const step4 = [{ xy: 2 }, { xy: 1 }, { xy: 0 }];

class Monster {
  constructor(image, width, height, position, color, number) {
    this.width = width;
    this.height = height;
    this.position = position;
    this.image = new Image();
    this.image.src = image;
    this.color = color;
    this.number = number;
    this.isClick = false;
  }
  start() {
    ctx.beginPath();
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    ctx.closePath();
  }
  addNumber() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x + this.width / 2, this.position.y + 70, 27, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(this.number, this.position.x + this.width / 2, this.position.y + 76);
    ctx.closePath();
  }
  TouchMonster(mouseX, mouseY) {
    return mouseX <= this.position.x + this.width && this.position.x <= mouseX && mouseY <= this.position.y + this.height && this.position.y <= mouseY;
  }
}

const frontBackCard = [];
const mainCard = [];
const RectGroup = [];
const monsterGroup = [];
const cardWidth = 101;
const cardHeight = 149;
const sidebaarWidth = 240;
const sideBar = new Side(sidebaarWidth, canvas.height, { x: canvas.width - sidebaarWidth, y: 0 }, "/src/asset/img/Asset Lainya/Bar Kartu.png");

function createInitialCard() {
  const frontCard = new Card(cardWidth, cardHeight, { x: sideBar.position.x + cardWidth / 2, y: 30 }, "/src/asset/img/Asset Lainya/Asset Front.png");
  for (let i = 0; i < 2; i++) {
    const backCard = new Card(cardWidth, cardHeight, { x: sideBar.position.x + cardWidth / (i == 0 ? 1.2 : i == 1 ? 1.5 : 0), y: 30 }, "/src/asset/img/Asset Lainya/Asset Card Back.png");
    frontBackCard.push(backCard);
  }
  frontBackCard.push(frontCard);
}
createInitialCard();

const DataCardValue = [
  DataMonstersCharacter[0].value,
  DataMonstersCharacter[1].value,
  DataMonstersCharacter[2].value,
  DataMonstersCharacter[0].value + DataMonstersCharacter[1].value,
  DataMonstersCharacter[0].value + DataMonstersCharacter[2].value,
  DataMonstersCharacter[1].value + DataMonstersCharacter[2].value,
];

function createMainCard() {
  const maincardWidth = 81;
  const maincardHeight = 129;
  for (let i = 0; i < 3; i++) {
    const cardValue = Math.floor(Math.random() * DataCardValue.length + 1);
    const fixValue = DataCardValue[cardValue] !== null ? DataCardValue[cardValue] : Math.floor(Math.random() * 10) + 1;
    const card = new Card(
      maincardWidth,
      maincardHeight,
      { x: sideBar.position.x + sideBar.width / 4, y: sideBar.position.y + (i == 0 ? 200 : i == 1 ? 350 : i == 2 ? 500 : 10000) },
      "/src/asset/img/Asset Lainya/Asset Card Back.png",
      fixValue
    );
    mainCard.push(card);
  }
}
createMainCard();

function CreateManyRect() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      const rect1 = new Rectangle(150, 150, { x: canvas.width - 1000 + 150 * i, y: canvas.height - 450 + 150 * j }, "brown");
      RectGroup.push(rect1);
    }
  }
}
CreateManyRect();

let PlaceGroup = [];

function spawnTotalMonsterPerStep(step) {
  const MaxLength = Math.floor(Math.random() * step.length) + 1;
  while (PlaceGroup.length < MaxLength) {
    const newPlace = step[Math.floor(Math.random() * step.length)];
    if (!PlaceGroup.some((cx) => cx.xy === newPlace.xy)) {
      PlaceGroup.push(newPlace);
    }
  }
}

function createManyMonster() {
  const monsterWidth = 167;
  const monsterHeight = 279;

  PlaceGroup.forEach((group, i) => {
    const monsterData = DataMonstersCharacter[i % DataMonstersCharacter.length];
    const MonsterObject = new Monster(
      monsterData.char1,
      monsterWidth,
      monsterHeight,
      {
        x: RectGroup[group.xy].position.x - RectGroup[group.xy].width / 4.9,
        y: RectGroup[group.xy].position.y - (RectGroup[group.xy].height - 50) * 0.9,
      },
      monsterData.color,
      monsterData.value
    );
    monsterGroup.push(MonsterObject);
  });
}

function nextStep(step) {
  monsterGroup.length = 0;
  spawnTotalMonsterPerStep(step);
  createManyMonster();
  console.log("Monsteer Position" + PlaceGroup.map((item) => item.xy));
}
nextStep(step1);
canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  monsterGroup.forEach((item, index) => {
    const touchingMonster = item.TouchMonster(mouseX, mouseY);
    if (touchingMonster && !item.isClick) {
      if (countNumber.length < 2) {
        countNumber.push(item);
        item.isClick = true;
        getIndexMonster = index;
      }
    }
  });
});

let isShowNumber = false;

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (countNumber.length === 1) {
      // monsterGroup.slice(getIndexMonster, 1);
      curretNumber = countNumber[0].number;
      correntNumber = countNumber[0].number;
      isShowNumber = true;
      monsterGroup[getIndexMonster].isClick = false;
      mainCard.forEach((item, index) => {
        item.isTrueAnswer(getIndexMonster, index);
      });
      alert(curretNumber);
      curretNumber = 0;
      countNumber.splice(0, 1);
      AnswerStatus = false;
    } else if (countNumber.length === 2) {
      countNumber.reduce((acc, cum) => {
        // monsterGroup.slice(getIndexMonster, 2);
        curretNumber = acc.number + cum.number;
        correntNumber = acc.number + cum.number;
        isShowNumber = true;
        monsterGroup[getIndexMonster].isClick = false;
        mainCard.forEach((item, index) => {
          item.isTrueAnswer(getIndexMonster, index);
        });
        alert(curretNumber);
        curretNumber = 0;
        countNumber.splice(0, 2);
        AnswerStatus = false;
      });
    }
  }
});

function animate() {
  sideBar.start();

  RectGroup.forEach((item) => {
    item.start();
  });

  frontBackCard.forEach((item) => {
    item.start();
  });
  // monsterGroup.some((monster) => {
  //   mainCard.some((card) => {
  //     if (card.text !== monster.number) {
  //       card.writeNumber();
  //     }
  //   });
  // });

  // mainCard.forEach((card, ind) => {
  //   monsterGroup.forEach((monster, ij) => {});
  // });

  mainCard.forEach((item, index) => {
    item.start();
    item.writeNumber();
    // item.isTrueAnswer(getIndexMonster, index);
  });
  monsterGroup.forEach((item) => {
    item.start();
    item.addNumber();
  });
  console.log(monsterGroup);

  window.requestAnimationFrame(animate);
}
animate();
