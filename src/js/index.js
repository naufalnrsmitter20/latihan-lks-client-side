/**@type {HTMLCanvasElement} */
var canvas = document.querySelector("canvas");

canvas.width = display_pixel.width * aspect_ratio.width;
canvas.height = display_pixel.height * aspect_ratio.height;
/**@type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

const playerProperty = {
  width: 50,
  height: 50,
  speed: 1,
  color: "gray",
  position: {
    x: 0,
    y: 0,
  },
};
const enemyProperty = {
  width: 100,
  height: 100,
  speed: 1,
  color: "green",
  position: {
    x: canvas.width - 100,
    y: canvas.height - 100,
  },
};

const groundObject = new Ground(canvas.width, canvas.height, "/src/asset/bg.jpg");
const playerObject = new Player(playerProperty);
const enemyObject = new Player(enemyProperty);

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      playerObject.jump();
      break;
    case "ArrowLeft":
      playerObject.arrowLeft();
      break;
    case "ArrowRight":
      playerObject.arrowRight();
      break;
  }
});

function animate() {
  groundObject.create();
  playerObject.create();
  enemyObject.create();
  playerObject.update();
  window.requestAnimationFrame(animate);
}
animate();
