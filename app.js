
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// ctx.beginPath();
// ctx.rect(20, 40, 150, 150);
// ctx.fillStyle= "#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(300, 115, 70, 0, Math.PI*2, false);
// ctx.fillStyle = "rgba(100,125,101)";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(110, 210, 200, 80);
// ctx.strokeStyle = "rgba(0, 0, 255)";
// ctx.stroke();
// ctx.closePath();

let x = canvas.width/2;
let y= canvas.height-50;

let dx = -3;
let dy = -3;

let ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let brickRowCount = 4;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 20;
let brickOffsetLeft = 30;

let ballColor = "#0095DD";

const bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = {x: 0, y: 0, status: 1};
  }
}

document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed =true;
  }
  else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed =false;
  }
  else if (e.keyCode == 37) {
    leftPressed = false;
  }
}

function collisionDetection() {
  for(let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
            dy = -dy;
            b.status = 0;
            ballColor = "red";
        }
      }
    }
  }
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = (c*
          (brickWidth + brickPadding))+brickOffsetLeft;
          
        let brickY = (r*
          (brickHeight + brickPadding))+brickOffsetTop;

        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0085DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle="#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }

    if (y + dy < ballRadius) {
      dy = -dy;
    } 
     else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
        dy -= 0.02;
      } 
      else {
          alert("GAME OVER, LOOSER");
          document.location.reload();
          clearInterval(interval);
      }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
   } 
   else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
   }

   x += dx;
   y += dy;
}

let interval = setInterval(draw, 10);
