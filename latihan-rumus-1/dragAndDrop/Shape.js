class Shape {
  constructor(props) {
    this.position = {
      x: props.position.x,
      y: props.position.y,
    };
    this.width = props.width;
    this.height = props.height;
    this.radius = props.radius;
    this.type = props.type;
    this.color = props.color;
  }

  start(ctx) {
    if (this.type === typeOfShape.RECTANGLE) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      ctx.closePath();
    } else if (this.type === typeOfShape.CIRCLE) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }

  isMouseInside(mouseX, mouseY) {
    if (this.type === typeOfShape.RECTANGLE) {
      return mouseX <= this.position.x + this.width && this.position.x <= mouseX && mouseY <= this.position.y + this.height && this.position.y <= mouseY;
    } else if (this.type === typeOfShape.CIRCLE) {
      const dist = Math.sqrt((mouseX - this.position.x) ** 2 + (mouseY - this.position.y) ** 2);
      return dist <= this.radius;
    } else {
      return false;
    }
  }
}
