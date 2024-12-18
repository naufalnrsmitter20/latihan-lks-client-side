class Sprite {
  constructor(width, height, position, color, speed) {
    this.width = width;
    this.height = height;
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.color = color;

    this.velocity = {
      x: 0,
      y: 0,
    };
    this.heightJump = 300;
    this.gravity = 0.5;
    this.speed = speed;
  }

  start() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  jump() {
    if (this.position.y >= collesion) {
      this.velocity.y = -Math.sqrt(this.gravity * this.heightJump);
    }
  }

  bulletUps() {
    if (!isFire) {
      bulletObject.position.y = this.position.y + this.height / 2 + bulletObject.bulletPlus;
    } else {
      bulletObject.position.y = storageFire;
    }
  }

  turnDown() {
    const currSize = { width: this.width, height: this.height };
    this.width = currSize.height;
    this.height = currSize.width;
    // bulletObject.position.y = playerProperty.position.y + playerProperty.height / 2;
  }
  turnDownUp() {
    const currSize = { width: this.width, height: this.height };
    this.width = currSize.height;
    this.height = currSize.width;
  }

  update() {
    const wall = canvas.height - this.height;
    const rightWall = canvas.width - this.width;
    this.velocity.y += this.gravity;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y > wall) {
      this.position.y = wall;
    }
    if (this.position.x > rightWall) {
      this.velocity.x *= -1;
    }
    if (this.position.x < 0) {
      this.velocity.x *= -1;
    }
  }
}
