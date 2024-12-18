class Player {
  constructor(props) {
    this.width = props.width;
    this.height = props.height;
    this.speed = props.speed;
    this.color = props.color;
    this.position = {
      x: props.position.x,
      y: props.position.y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.heightJump = 100;
    this.gravity = 0.5;
  }
  //   kinematic equation physic
  //   HeightJump = vi^2 / (2 * g)
  //    vi = 2 * g * heightJump

  jump() {
    if (this.position.y < 350) {
      console.log("batas lompat maksimum!");
    } else {
      this.velocity.y = -Math.sqrt(2 * this.gravity * this.heightJump);
    }
  }

  arrowLeft() {
    this.velocity.x -= this.speed;
  }
  arrowRight() {
    this.velocity.x += this.speed;
  }

  update() {
    const bottomWall = canvas.height - this.height;
    const rightWall = canvas.width - this.width;
    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (bottomWall < this.position.y) {
      this.position.y = bottomWall;
    }
    if (this.position.x > rightWall) {
      this.velocity.x *= -1;
    }
    if (this.position.x < 0) {
      this.velocity.x *= -1;
    }
  }

  create() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
