/**@type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");
/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const typeOfShape = {
  RECTANGLE: "RECTANGLE",
  CIRCLE: "CIRCLE",
};

let isDrag = false;
let isThisPosition = null;

const RectObject = new Shape({ width: 50, height: 50, position: { x: Math.random() * canvas.width - 0, y: Math.random() * canvas.height - 0 }, color: "red", type: typeOfShape.RECTANGLE });
const CircleObject = new Shape({ radius: 25, position: { x: Math.random() * canvas.width - 0, y: Math.random() * canvas.height - 0 }, color: "green", type: typeOfShape.CIRCLE });

const RectArea = new Area({ width: 50, height: 50, position: { x: canvas.width / 2, y: canvas.height / 3 }, color: "red", type: typeOfShape.RECTANGLE });
const CircleArea = new Area({ radius: 25, position: { x: canvas.width / 2, y: canvas.height / 2 }, color: "green", type: typeOfShape.CIRCLE });
canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (RectObject.isMouseInside(mouseX, mouseY)) {
    isDrag = true;
    isThisPosition = RectObject;
  } else if (CircleObject.isMouseInside(mouseX, mouseY)) {
    isDrag = true;
    isThisPosition = CircleObject;
  }
});
canvas.addEventListener("mousemove", (e) => {
  if (isDrag && isThisPosition) {
    const rect = canvas.getBoundingClientRect();
    isThisPosition.x = e.clientX - rect.left;
    isThisPosition.y = e.clientY - rect.top;
    if (isThisPosition.type === typeOfShape.RECTANGLE) {
      RectObject.position.x = isThisPosition.x;
      RectObject.position.y = isThisPosition.y;
    } else {
      CircleObject.position.x = isThisPosition.x;
      CircleObject.position.y = isThisPosition.y;
    }
  }
});

function isTouching(obj1, obj2) {
  if (obj1.type === typeOfShape.CIRCLE && obj2.type === typeOfShape.CIRCLE) {
    const dist = Math.sqrt((obj1.position.x - obj2.position.x) ** 2 + (obj1.position.y - obj2.position.y) ** 2);
    return dist <= obj1.radius + obj2.radius;
  }
  if (obj1.type === typeOfShape.RECTANGLE && obj2.type === typeOfShape.RECTANGLE) {
    return obj2.position.x <= obj1.position.x + obj1.width && obj1.position.x <= obj2.position.x + obj2.width && obj2.position.y <= obj1.position.y + obj1.height && obj1.position.y <= obj2.position.y + obj2.height;
  }
  return false;
}

canvas.addEventListener("mouseup", () => {
  isDrag = false;
  isThisPosition = null;

  const TouchRect = isTouching(RectObject, RectArea);
  const TouchCircle = isTouching(CircleObject, CircleArea);
  if (TouchRect && TouchCircle) {
    alert("Semua Object Telah Dimasukkan Dengan Benar");
    RectObject.position.x = Math.random() * canvas.width - 0;
    RectObject.position.y = Math.random() * canvas.height - 0;
    CircleObject.position.x = Math.random() * canvas.width - 0;
    CircleObject.position.y = Math.random() * canvas.height - 0;
  }
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  RectObject.start(ctx);
  CircleObject.start(ctx);
  RectArea.start();
  CircleArea.start();
  requestAnimationFrame(render);
}
render();
