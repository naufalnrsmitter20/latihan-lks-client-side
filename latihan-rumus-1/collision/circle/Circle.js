class Circle {
  constructor(props) {
    this.speed = props.speed;
    this.position = {
      x: props.position.x,
      y: props.position.y,
    };
    this.radius = props.radius;
    this.velocity = {
      x: props.velocity.x,
      y: props.velocity.y,
    };
    this.color = props.color;
  }
  start() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  up() {
    this.velocity.y = -this.speed;
    this.velocity.x = 0;
  }
  down() {
    this.velocity.y = this.speed;
    this.velocity.x = 0;
  }
  left() {
    this.velocity.x = -this.speed;
    this.velocity.y = 0;
  }
  right() {
    this.velocity.x = this.speed;
    this.velocity.y = 0;
  }
  update() {
    const downWall = canvas.height - this.radius;
    const sideWall = canvas.width - this.radius;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y > downWall) {
      this.velocity.y *= -1;
    }
    if (this.position.y < 0) {
      this.velocity.y *= -1;
    }
    if (this.position.x < 0) {
      this.velocity.x *= -1;
    }
    if (this.position.x > sideWall) {
      this.velocity.x *= -1;
    }
  }
}
