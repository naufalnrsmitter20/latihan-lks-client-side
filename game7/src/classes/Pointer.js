class Pointer {
  constructor(image, width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = image;
  }
  start() {
    if (isFire) {
      const imageFire = new Image();
      imageFire.src = "/src/asset/boom.png";
      ctx.beginPath();
      ctx.drawImage(imageFire, this.x, this.y - 30, this.width, this.height);
      ctx.closePath();
    }
    ctx.beginPath();
    ctx.drawImage(this.image, this.x, this.y - 30, this.width, this.height);
    ctx.closePath();
  }
}
