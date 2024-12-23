/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;
const rect = { x: 100, y: 100, width: 200, height: 200 };

function collision(mouseX, mouseY, rect) {
  if (rect.x <= mouseX && mouseX <= rect.x + rect.width && rect.y <= mouseY && mouseY <= rect.y + rect.height) {
    return true;
  }
}

window.addEventListener("click", (event) => {
  const rectCanvas = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rectCanvas.left;
  const mouseY = event.clientY - rectCanvas.top;
  const col = collision(mouseX, mouseY, rect);

  if (col) {
    alert("Click detected!");
  }
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  window.requestAnimationFrame(render);
}

render();
