/**@type {HTMLCanvasElement} */
var canvas = document.getElementById("testCanvas");
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      var x = Math.floor(Math.random() * canvas.width);
      var y = Math.floor(Math.random() * canvas.height);

      var r = Math.floor(Math.random() * (30 - 5) + 5);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.font = "40px arial";
      ctx.strokeText("Welcome to Random Bubble!", 10, 50);
    }
  }
}, 1000);
