class Button {
  constructor(props) {
    this.image = new Image();
    this.image.src = props.image;
    this.position = {
      x: props.position.x,
      y: props.position.y,
    };
    this.name = props.name;
    this.width = props.width;
    this.height = props.height;
  }

  start() {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}
