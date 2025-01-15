class Sprites {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.currentFrame = 0;
    this.frameCounter = 0;
    this.frameSpeed = 10;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.isWalling = false;
    this.isShoot = false;
    this.speed = 5;
    this.isMove = false;
    this.bullet = {
      x: this.x + this.width / 2,
      y: this.y + 20,
      width: 3,
      height: 22,
      speed: 14,
      velocity: {
        x: 0,
        y: 0,
      },
    };
  }
  start() {
    const SpriteImage = new Image();
    SpriteImage.src = spriteGroup[this.currentFrame];
    ctx.beginPath();
    ctx.drawImage(SpriteImage, this.x, this.y, this.width, this.height);
    ctx.closePath();

    this.frameCounter++;
    if (this.frameCounter >= this.frameSpeed) {
      this.currentFrame = (this.currentFrame + 1) % spriteGroup.length;
      this.frameCounter = 0;
    }
  }

  addBullet() {
    ctx.beginPath();
    ctx.fillStyle = "lightBlue";
    ctx.fillRect(this.bullet.x, this.bullet.y, this.bullet.width, this.bullet.height);
    ctx.closePath();
  }
  //   changeBullet() {
  //     ctx.beginPath();
  //     ctx.fillStyle = "red";
  //     ctx.fillRect(this.bullet.x, this.bullet.y, this.bullet.width, this.bullet.height);
  //     ctx.closePath();
  //   }

  right() {
    if (!this.isMove) {
      this.velocity.x += this.speed;
      this.velocity.y = 0;
    }
  }
  left() {
    if (!this.isMove) {
      this.velocity.x -= this.speed;
      this.velocity.y = 0;
    }
  }
  destroyY() {
    this.isMove = false;
    this.velocity.y = 0;
  }
  destroyX() {
    this.isMove = false;
    this.velocity.x = 0;
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (!this.isShoot) this.bullet.x += this.velocity.x;
    this.bullet.y += this.bullet.velocity.y;

    let XWall = canvas.width - this.width;
    let YWall = canvas.height - this.height;

    if (this.bullet.y > YWall) {
      this.bullet.y = this.y + 20;
      this.bullet.velocity.y = 0;
      this.bullet.x = this.x + this.width / 2;
      this.isShoot = false;
    }

    if (this.x > XWall) {
      this.velocity.x = 0;
      this.isWalling = true;
    }
    if (this.x < 0) {
      this.isWalling = true;
      this.velocity.x = 0;
    }

    if (this.bullet.y < 0) {
      this.bullet.y = this.y + 20;
      this.bullet.velocity.y = 0;
      this.bullet.x = this.x + this.width / 2;
      this.isShoot = false;
    }
  }
  backToPosition() {
    this.bullet.y = this.y + 20;
    this.bullet.velocity.y = 0;
    this.bullet.x = this.x + this.width / 2;
    this.isShoot = false;
  }
  shoot() {
    if (!this.isShoot) {
      this.bullet.velocity.y -= this.bullet.speed;
      this.bullet.x += 1;
      this.isShoot = true;
    }
  }
  downBullet() {
    this.bullet.velocity.y += this.bullet.speed;
  }
  over() {
    this.velocity.y += this.speed;
    this.bullet.velocity.y += this.speed;
  }
}
