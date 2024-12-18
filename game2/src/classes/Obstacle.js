class Obstacle {
  constructor(props) {
    this.width = props.width;
    this.height = props.height;
    this.position = {
      x: props.position.x,
      y: props.position.y,
    };
    this.color = props.color;
    this.speed = props.speed;
  }

  spawn() {
    GlobalObstacles.push({
      width: this.width,
      height: this.height,
      position: { x: this.position.x, y: this.position.y },
      speed: this.speed,
      color: this.color,
    });
  }

  add() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  move() {
    this.position.x -= this.speed;
  }
  destroy() {
    this.width = 0;
    this.height = 0;
  }
}
