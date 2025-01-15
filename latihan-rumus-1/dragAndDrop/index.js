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

const RectGroup = [];
const CircleGroup = [];
function AddRectToGroup() {
  for (let i = 0; i <= 10; i++) {
    const RectObject = new Shape({ width: 50, height: 50, position: { x: Math.random() * canvas.width - 0, y: Math.random() * canvas.height - 0 }, color: "red", type: typeOfShape.RECTANGLE });
    RectGroup.push(RectObject);
  }
}

function AddCircleToGroup() {
  for (let i = 0; i <= 10; i++) {
    const CircleObject = new Shape({ radius: 25, position: { x: Math.random() * canvas.width - 0, y: Math.random() * canvas.height - 0 }, color: "green", type: typeOfShape.CIRCLE });
    CircleGroup.push(CircleObject);
  }
}
AddRectToGroup();
AddCircleToGroup();

const RectArea = new Area({ width: 50, height: 50, position: { x: canvas.width / 2, y: canvas.height / 3 }, color: "red", type: typeOfShape.RECTANGLE });
const CircleArea = new Area({ radius: 25, position: { x: canvas.width / 2, y: canvas.height / 2 }, color: "green", type: typeOfShape.CIRCLE });

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  RectGroup.forEach((rect) => {
    if (rect.isMouseInside(mouseX, mouseY)) {
      isDrag = true;
      isThisPosition = rect; 
    }
  });
  CircleGroup.forEach((circle) => {
    if (circle.isMouseInside(mouseX, mouseY)) {
      isDrag = true;
      isThisPosition = circle;
    }
  });
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrag && isThisPosition) {
    const rect = canvas.getBoundingClientRect();
    isThisPosition.position.x = e.clientX - rect.left;
    isThisPosition.position.y = e.clientY - rect.top;
  }
});

canvas.addEventListener("mouseup", () => {
  isDrag = false;

  if (isThisPosition) {
    if (isThisPosition.type === typeOfShape.RECTANGLE && isTouching(isThisPosition, RectArea)) {
      isThisPosition.color = "transparent";
    }

    if (isThisPosition.type === typeOfShape.CIRCLE && isTouching(isThisPosition, CircleArea)) {
      isThisPosition.color = "transparent";
    }
  }

  isThisPosition = null;
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

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  RectArea.start();
  CircleArea.start();
  RectGroup.forEach((rect) => {
    rect.start(ctx);
  });
  CircleGroup.forEach((circle) => {
    circle.start(ctx);
  });
  const IsRectTransparent = RectGroup.every((item) => {
    return item.color === "transparent";
  });
  const IsCircleTransparent = CircleGroup.every((item) => {
    return item.color === "transparent";
  });

  if (IsRectTransparent && IsCircleTransparent) {
    const confirmation = confirm("Winnerr!");
    if (confirmation) {
      window.location.reload();
      IsRectTransparent = false;
      IsCircleTransparent = false;
    }
  }

  requestAnimationFrame(render);
}
render();
