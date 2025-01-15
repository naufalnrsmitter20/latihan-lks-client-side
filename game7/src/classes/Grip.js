class Grip {
  constructor(width, height, x, y, image) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = image;
    this.isChanged = false;
  }
  start() {
    ctx.beginPath();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
  updateGrip() {
    if (this.isChanged) {
      this.image.src = "/src/asset/gun1.png";
      this.isChanged = false;
    } else {
      this.image.src = "/src/asset/gun2.png";
      this.isChanged = true;
    }
  }
}
