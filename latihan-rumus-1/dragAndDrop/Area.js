class Area {
  constructor(props) {
    this.position = {
      x: props.position.x,
      y: props.position.y,
    };
    this.width = props.width;
    this.height = props.height;
    this.radius = props.radius;
    this.type = props.type;
    this.color = props.color;
  }

  start() {
    if (this.type === typeOfShape.RECTANGLE) {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
      ctx.closePath();
    } else if (this.type === typeOfShape.CIRCLE) {
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    }
  }
}
