class Enemy {
  constructor(props) {
    this.width = props.width;
    this.height = props.height;
    this.position = {
      x: Math.random() * (canvas.width - this.width) - 0,
      y: Math.random() * (canvas.height - this.height) - 0,
    };
  }
  start() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.closePath();
  }

  random() {
    if (isTouchObstacle) {
      this.position.x = Math.random() * (canvas.width - this.width) - 0;
      this.position.y = Math.random() * (canvas.height - this.height) - 0;
      isTouchObstacle = false;
    }
  }
}
