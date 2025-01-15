class Enemy {
  constructor(x, y, width, height, textX, textY, textList) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.currentFrame = 0;
    this.frameCounter = 0;
    this.frameSpeed = 10;
    this.speed = 0.5;
    this.textList = textList;
    this.text = {
      x: textX,
      y: textY,
    };
    this.bullet = {
      x: this.x + this.width / 2,
      y: this.y - 20,
      width: 3,
      height: 22,
      speed: 5,
      velocity: {
        x: 0,
        y: 0,
      },
    };
  }
  start() {
    const EnemyImage = new Image();
    EnemyImage.src = spriteGroup[this.currentFrame];
    ctx.beginPath();
    ctx.drawImage(EnemyImage, this.x, this.y, this.width, this.height);
    ctx.closePath();
    this.frameCounter++;
    if (this.frameCounter > this.frameSpeed) {
      this.currentFrame = (this.currentFrame + 1) % spriteGroup.length;
      this.frameCounter = 0;
    }
  }
  addBullet() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(this.bullet.x, this.bullet.y, this.bullet.width, this.bullet.height);
    ctx.closePath();
  }
  addText() {
    ctx.beginPath();
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(this.textList, this.text.x, this.text.y);
    ctx.closePath();
  }
  shoot() {
    this.bullet.velocity.y += this.bullet.speed;
    // this.bullet.y += this.bullet.velocity.y;
  }
  backToPosition() {
    this.bullet.y = this.y - 20;
    this.bullet.velocity.y = 0;
    this.bullet.x = this.x + this.width / 2;
  }
  update() {
    this.y += this.speed;
    this.text.y += this.speed;
    this.bullet.y += this.bullet.velocity.y;
    this.bullet.y += this.speed;
    let XWall = canvas.width - this.width;
    let YWall = canvas.height - this.height;

    if (this.y > YWall) {
      isGameOver = true;
    }

    if (this.bullet.y > YWall) {
      this.bullet.y = this.y - 20;
      this.bullet.velocity.y = 0;
      this.bullet.x = this.x + this.width / 2;
    }
  }
}
