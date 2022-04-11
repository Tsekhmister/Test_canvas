
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(20, 40, 150, 150);
ctx.fillStyle= "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(300, 115, 70, 0, Math.PI*2, false);
ctx.fillStyle = "rgba(100,125,101)";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(110, 210, 200, 80);
ctx.strokeStyle = "rgba(0, 0, 255)";
ctx.stroke();
ctx.closePath();

// function draw() {
  
// }
// setInterval