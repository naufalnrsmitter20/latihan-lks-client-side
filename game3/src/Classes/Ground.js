class Ground {
  constructor(props) {
    this.image = new Image();
    this.image.src = props.image;
    this.width = props.width;
    this.height = props.height;
    this.position = {
      x: props.position.x,
      y: props.position.y,
    };
  }

  start() {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
  addScore() {
    ctx.fillStyle = "white";
    ctx.font = "30px arial";
    ctx.fillText(`Score: ${score}`, 10, 50);
  }
}
