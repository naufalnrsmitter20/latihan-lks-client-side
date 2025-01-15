class Ground {
  constructor(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
    this.question = {
      x: this.x + 400,
      y: 40,
    };
    this.score = {
      x: 20,
      y: 40,
    };
  }
  start() {
    ctx.beginPath();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
  addQuestion() {
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    if (filteredQuestion.length !== 0) {
      ctx.fillText(currentQuestion.name, this.question.x, this.question.y);
    }
    ctx.closePath();
  }
  addScore() {
    ctx.beginPath();
    ctx.font = "24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Score : ${scoreNum}`, this.score.x, this.score.y);
    ctx.closePath();
  }
}
