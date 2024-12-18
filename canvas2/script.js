/**@type {HTMLCanvasElement} */
var canvas = document.getElementById("myCanvas");
/**@type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");

const duration = JSON.parse(sessionStorage.getItem("formData"));
if (duration) {
  const parsedDuration = parseFloat(duration);
  console.log(parsedDuration);

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
      }
    }
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        var x = Math.floor(Math.random() * canvas.width);
        var y = Math.floor(Math.random() * canvas.height);
        ctx.beginPath();
        ctx.strokeRect(x, y, 10, 10);
        ctx.stroke();
      }
    }
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        var x = Math.floor(Math.random() * canvas.width);
        var y = Math.floor(Math.random() * canvas.height);
        ctx.beginPath();
        ctx.fillRect(x, y, 10, 10);
        ctx.stroke();
      }
    }
  }, duration);
} else {
  alert("Duration is not set!");
  window.location.href = "start.html";
}
