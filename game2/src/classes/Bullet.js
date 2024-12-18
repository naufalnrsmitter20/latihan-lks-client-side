class Bullet {
  constructor(props) {
    this.width = props.width;
    this.height = props.height;
    this.position = {
      x: props.position.x,
      y: props.position.y,
    };
    this.speed = props.speed;
    this.bulletPlus = props.bulletPlus;
    this.bulletFire = props.bulletFire;
  }

  add() {
    ctx.fillStyle = "brown";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  UpBullet() {
    if (this.position.y >= playerObject.position.y) {
      this.bulletPlus -= 5;
    }
  }
  DownBullet() {
    if (this.position.y <= canvas.height - this.height * 2) {
      this.bulletPlus += 5;
    }
  }
  fire() {
    if (!isFire) {
      this.bulletFire += this.speed;
      storageFire = this.position.y;
      isFire = true;
    }
    if (isFire) {
      if (this.position.x > canvas.width - this.width) {
        this.position.x = playerObject.position.x;
        isFire = false;
        isBulletNabrakObstacle = true;
        storageFire = 0;
        this.bulletFire = 0;
      }
    }
  }

  update() {
    this.position.x += this.bulletFire;
    if (isFire) {
      if (this.position.x > canvas.width - this.width) {
        isBulletNabrakObstacle = true;
      }
    }
  }
}
