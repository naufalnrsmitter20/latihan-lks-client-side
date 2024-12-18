class Ground {
  constructor(width, height, image) {
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
    this.position = {
      x: 0,
      y: 0,
    };
  }
  create() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
