/**@type {HTMLCanvasElement} */
var canvas = document.getElementById("myCanvas");
/**@type {CanvasRenderingContext2D} */
var ctx = canvas.getContext("2d");
var gameArea = {
  start: function () {
    ctx.font = "40px arial";
    ctx.strokeText("Welcome to the Game!", 10, 50);
  },
  clear: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
};

gameArea.start;
