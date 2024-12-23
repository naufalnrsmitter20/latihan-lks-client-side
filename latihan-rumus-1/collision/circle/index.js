/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const Circle1 = new Circle({ color: "green", speed: 8, position: { x: 100, y: 100 }, radius: 20, velocity: { x: 0, y: 0 } });
const Circle2 = new Circle({ color: "red", speed: 8, position: { x: canvas.width - 100, y: canvas.height - 100 }, radius: 20, velocity: { x: 0, y: 0 } });

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      Circle1.up();
      break;
    case "ArrowDown":
      Circle1.down();
      break;
    case "ArrowLeft":
      Circle1.left();
      break;
    case "ArrowRight":
      Circle1.right();
      break;

    default:
      break;
  }
});

function collision(circle1, circle2) {
  const distance = Math.sqrt((circle1.position.x - circle2.position.x) ** 2 + (circle1.position.y - circle2.position.y) ** 2);
  return distance <= circle1.radius + circle2.radius;
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const col = collision(Circle1, Circle2);
  Circle1.start();
  Circle2.start();
  if (!col) {
    Circle1.update();
    window.requestAnimationFrame(render);
  } else {
    alert("Colision detected!");
    window.cancelAnimationFrame(render);
    window.location.reload();
  }
}
render();
