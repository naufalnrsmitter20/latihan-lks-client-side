/** @type {HTMLCanvasElement} */
var canvas = document.getElementById("myCanvas");
/**@type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let a = 0; a < 10; a++) {
    for (let b = 0; b < 10; b++) {
      var x = Math.floor(Math.random() * canvas.width);
      var y = Math.floor(Math.random() * canvas.height);
      var r = Math.floor(Math.random() * (30 - 5) + 5);

      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.stroke();

      setInterval(() => {
        for (let i = 0; i < 100; i++) {
          for (let j = 0; j < 100; j++) {
            var x = Math.floor(Math.random() * canvas.width);
            var y = Math.floor(Math.random() * canvas.height);
            ctx.beginPath();
            ctx.fillRect(x, y, 1, 1);
            ctx.stroke();
          }
        }
      }, 1000);
    }
  }
}, 2000);
