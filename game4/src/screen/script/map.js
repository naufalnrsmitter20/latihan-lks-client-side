let soundMP3;
soundMP3 = new Audio("/src/asset/audio/music.wav");
soundMP3.loop = true;

function onClickSound() {
  try {
    if (!soundMP3) {
      soundMP3.volume = 1;
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

const DataLevel = [
  {
    level: 1,
    pathImageAactive: "/src/asset/img/Level/Level (1).png",
    pathmageNonactive: "/src/asset/img/Level/Level Non Aktif (1).png",
    isActive: true,
  },
  {
    level: 2,
    pathImageAactive: "/src/asset/img/Level/Level (2).png",
    pathmageNonactive: "/src/asset/img/Level/Level Non Aktif (2).png",
    isActive: false,
  },
  {
    level: 3,
    pathImageAactive: "/src/asset/img/Level/Level (3).png",
    pathmageNonactive: "/src/asset/img/Level/Level Non Aktif (3).png",
    isActive: false,
  },
  {
    level: 4,
    pathImageAactive: "/src/asset/img/Level/Level (4).png",
    pathmageNonactive: "/src/asset/img/Level/Level Non Aktif (4).png",
    isActive: false,
  },
  {
    level: 5,
    pathImageAactive: "/src/asset/img/Level/Level (5).png",
    pathmageNonactive: "/src/asset/img/Level/Level Non Aktif (5).png",
    isActive: false,
  },
];

/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Level {
  constructor(image, position, width, height, level, isActive) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
    this.level = level;
    this.isActive = isActive;
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
  onMouseClick(mouseX, mouseY) {
    return mouseX <= this.position.x + this.width && this.position.x <= mouseX && mouseY <= this.position.y + this.height && this.position.y <= mouseY;
  }
}
let levelGroup = [];
function drawLevel() {
  DataLevel.map((item) => {
    const imageLevel = item.isActive === true ? item.pathImageAactive : item.pathmageNonactive;
    if (item.level === 1) {
      const level1 = new Level(imageLevel, { x: 130, y: 400 }, 109, 104, item.level, item.isActive);
      levelGroup.push(level1);
    } else if (item.level === 2) {
      const level2 = new Level(imageLevel, { x: 240, y: 100 }, 109, 104, item.level, item.isActive);
      levelGroup.push(level2);
    } else if (item.level === 3) {
      const level3 = new Level(imageLevel, { x: 600, y: 250 }, 109, 104, item.level, item.isActive);
      levelGroup.push(level3);
    } else if (item.level === 4) {
      const level4 = new Level(imageLevel, { x: 1150, y: 200 }, 109, 104, item.level, item.isActive);
      levelGroup.push(level4);
    } else if (item.level === 5) {
      const level5 = new Level(imageLevel, { x: 1280, y: 500 }, 109, 104, item.level, item.isActive);
      levelGroup.push(level5);
    }
  });
}
drawLevel();

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  levelGroup.forEach((item) => {
    const checkClick = item.onMouseClick(mouseX, mouseY);
    if (checkClick) {
      if (item.isActive) {
        window.location.href = "/src/screen/inGame.html";
        sessionStorage.setItem("dataLevel", JSON.stringify(item));
      } else if (!item.isActive) {
        alert("Level Belum Terbuka!");
      } else {
        alert("Error!");
      }
    }
  });
});

function animate() {
  levelGroup.forEach((item) => {
    item.draw();
  });

  window.requestAnimationFrame(animate);
}
animate();
