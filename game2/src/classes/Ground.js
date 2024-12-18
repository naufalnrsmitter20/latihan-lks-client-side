class Ground {
  constructor(width, height, image, speed) {
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
    this.speed = speed;
    this.position = {
      x: 0,
      y: 0,
    };
  }

  start() {
    ctx.drawImage(this.image, this.position.x, 0, this.width, this.height);
    ctx.drawImage(this.image, this.position.x + this.width, 0, this.width, this.height);
    this.position.x -= this.speed;
    if (this.position.x <= -canvas.width) {
      this.position.x = 0;
    }
  }
  addText() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "40px arial";
    ctx.fillText("Welcome to Game!", 20, 50);
    ctx.stroke();
  }
  end() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.beginPath();
    ctx.font = "arial 50px";
    ctx.fillStyle = "white";
    ctx.fillText("GAME OVER!", canvas.width / 2 - 150, canvas.height / 2);
    ctx.stroke();
  }

  addScore(score) {
    ctx.beginPath();
    ctx.font = "arial 30px";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${TempScore.length !== 0 ? parseInt(scoreFix + score) : score}`, this.width - 400, 50);
    console.log(scoreFix);
    ctx.stroke();
  }

  setHighScore() {
    ctx.beginPath();
    ctx.font = "arial 30px";
    ctx.fillStyle = "white";
    let tempStorage = JSON.parse(sessionStorage.getItem("dataScore"));
    ctx.fillText(`Highest Score: ${tempStorage ? tempStorage : 0}`, 20, 120);
    ctx.stroke();
  }
}
