class Player {
  constructor(props) {
    this.width = props.width;
    this.height = props.height;
    this.speed = props.speed;
    this.position = {
      x: props.position.x,
      y: props.position.y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.isUp = false;
    this.isDown = false;
    this.isRight = false;
    this.isLeft = false;
  }
  start() {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.closePath();
  }
  up() {
    this.velocity.y = -this.speed;
    this.isUp = true;
    this.velocity.x = 0;
  }
  down() {
    this.velocity.y = this.speed;
    this.isDown = true;
    this.velocity.x = 0;
  }
  left() {
    this.velocity.x = -this.speed;
    this.isLeft = true;
    this.velocity.y = 0;
  }
  right() {
    this.velocity.x = this.speed;
    this.isRight = true;
    this.velocity.y = 0;
  }
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    const wall = canvas.height - this.height;
    const rightWall = canvas.width - this.width;
    if (isRestart) {
      isRestart = false;
      this.velocity.x = 0;
      this.velocity.y = 0;
    }

    if (isTouchObstacle) {
      this.speed += 2;
    }

    if (this.position.y > wall - this.height) {
      this.position.y = 0;
    }
    if (this.position.y < 0) {
      this.position.y = wall - this.height;
    }
    if (this.position.x > rightWall - this.width) {
      this.position.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = rightWall - this.width;
    }
  }
}
