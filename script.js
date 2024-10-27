const board = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('scoreDisplay');
const restartButton = document.getElementById('restartButton');

// Mobile Controls
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 0, dy = 0;
let score = 0;
let gameOver = false;

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
}

function render() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.classList.remove('snake', 'food'));

  snake.forEach(segment => {
    const index = segment.y * boardSize + segment.x;
    cells[index].classList.add('snake');
  });

  const foodIndex = food.y * boardSize + food.x;
  cells[foodIndex].classList.add('food');
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    gameOver = true;
    alert(`Game Over! Final Score: ${score}`);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    placeFood();
  } else {
    snake.pop();
  }
}

function placeFood() {
  food.x = Math.floor(Math.random() * boardSize);
  food.y = Math.floor(Math.random() * boardSize);

  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

function handleKey(e) {
  if (e.key === 'ArrowUp') { dx = 0; dy = -1; }
  else if (e.key === 'ArrowDown') { dx = 0; dy = 1; }
  else if (e.key === 'ArrowLeft') { dx = -1; dy = 0; }
  else if (e.key === 'ArrowRight') { dx = 1; dy = 0; }
}

function restartGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 0; dy = 0;
  score = 0;
  gameOver = false;
  scoreDisplay.textContent = `Score: ${score}`;
  placeFood();
  render();
  gameLoop();
}

function gameLoop() {
  if (gameOver) return;
  moveSnake();
  render();
  setTimeout(gameLoop, 200);
}

upBtn.addEventListener('click', () => { dx = 0; dy = -1; });
downBtn.addEventListener('click', () => { dx = 0; dy = 1; });
leftBtn.addEventListener('click', () => { dx = -1; dy = 0; });
rightBtn.addEventListener('click', () => { dx = 1; dy = 0; });

createBoard();
render();
placeFood();
document.addEventListener('keydown', handleKey);
restartButton.addEventListener('click', restartGame);
gameLoop();
