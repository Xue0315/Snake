const BLOCK_SIZE = 20;
const BLOCK_COUNT = 20;
let gameInteval;
let snake;
let apple;
let score;
let finish = document.getElementById('end-word');
window.onload = pageLoaded;

function pageLoaded() {
  document.addEventListener('keydown', handleKeyDown)
}
function handleKeyDown(event) {
  switch (event.keyCode) {
    case 37: 
      if (snake.direction.x <= 0) {
        snake.direction.x = -1
        snake.direction.y = 0
      }
      break;
    case 38:
      if (snake.direction.y <= 0) {
        snake.direction.x = 0
        snake.direction.y = -1
      }
      break;
    case 39:
      if (snake.direction.x >= 0) {
        snake.direction.x = 1
        snake.direction.y = 0
      }
      break;
    case 40:
      if (snake.direction.y >= 0) {
        snake.direction.x = 0
        snake.direction.y = 1
      }
      break;
      default:
  }
}

function gameStart() {
  let startButton = document.getElementById('start-button');
  finish.style.display = "none";
  clearInterval(gameInteval);
  snake = {
    body:[
      {
        x: BLOCK_SIZE / 2, y: BLOCK_COUNT / 2
      }
    ],
    size: 1,
    direction: {x: 0, y: -1}
  }
  gameInteval = setInterval(gameRoutine, 100);
  updateScore(0);
  putApple();
  startButton.innerHTML = '重新開始';
}

function gameRoutine() {
  moveSnake();
  if (IsGameOver()) {
    clearInterval(gameInteval);
    return;
  }
  if (apple.x === snake.body[0].x && apple.y === snake.body[0].y) {
    eatApple();
  }
  updateCanvas();
}

function IsGameOver() {
  if (snake.body[0].x < 0) {
    finish.style.display = "block";
    return true;
  }else if (snake.body[0].x >= BLOCK_SIZE) {
    finish.style.display = "block";
    return true;
  }else if (snake.body[0].y < 0) {
    finish.style.display = "block";
    return true;
  }else if (snake.body[0].y >= BLOCK_SIZE) {
    finish.style.display = "block";
    return true;
  }
  for (let i = 1; i < snake.body.length; i++) {
    if (snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y) {
      return true;
    }
  }
  return false;
}
function moveSnake() {
  let newBlock = {
    x: snake.body[0].x + snake.direction.x,
    y: snake.body[0].y + snake.direction.y
  }
  snake.body.unshift(newBlock);
  while (snake.body.length > snake.size) {
    snake.body.pop();
  }
}
function updateCanvas() {
  let canvas = document.getElementById('canvas-id');
  let context = canvas.getContext('2d');
  context.fillStyle = 'grey';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'lime';
  for (let i = 0; i < snake.body.length; i++) {
    context.fillRect(
      snake.body[i].x * BLOCK_SIZE + 1,
      snake.body[i].y * BLOCK_SIZE + 1,
      BLOCK_SIZE - 1,
      BLOCK_SIZE - 1
    )
  }
  context.fillStyle = 'red';
  context.fillRect(
    apple.x * BLOCK_SIZE,
    apple.y * BLOCK_SIZE,
    BLOCK_SIZE,
    BLOCK_SIZE
  )
}
function putApple() {
  apple = {
    x: Math.floor((Math.random() * BLOCK_COUNT)),
    y: Math.floor((Math.random() * BLOCK_COUNT))
  }
  for (let i = 0; i <snake.body.length; i++) {
    if (apple.x === snake.body[i].x && apple.y === snake.body[i].y) {
      putApple();
    }
  }
}
function eatApple() {
  snake.size += 1;
  putApple();
  updateScore(score + 1)
}
function updateScore(newScore) {
  score = newScore;
  document.getElementById('score-id').innerHTML = score;
}