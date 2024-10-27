const board = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('scoreDisplay');
const restartButton = document.getElementById('restartButton');

const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 0, dy = 0;
let score = 0;
let gameOver = false;

// Create the board grid
function createBoard() {
  board.innerHTML = ''; // Clear the board
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
}

// Render snake and food on the board
function render() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.classList.remove('snake', 'food'));

  // Draw the snake
  snake.forEach(segment => {
    const index = segment.y * boardSize + segment.x;
    cells[index].classList.add('snake');
  });

  // Draw the food
  const foodIndex = food.y * boardSize + food.x;
  cells[foodIndex].classList.add('food');
}

// Move the snake
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Game over conditions
  if (
    head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    gameOver = true;
    alert(`Game Over! Final Score: ${score}`);
    return;
  }

  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    placeFood();
  } else {
    snake.pop(); // Remove the tail if no food eaten
  }
}

// Place food at a random position
function placeFood() {
  food.x = Math.floor(Math.random() * boardSize);
  food.y = Math.floor(Math.random() * boardSize);

  // Ensure food is not placed on the snake
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    placeFood();
  }
}

// Handle keyboard input
function handleKey(e) {
  if (e.key === 'ArrowUp' && dy === 0) {
    dx = 0; dy = -1;
  } else if (e.key === 'ArrowDown' && dy === 0) {
    dx = 0; dy = 1;
  } else if (e.key === 'ArrowLeft' && dx === 0) {
    dx = -1; dy = 0;
  } else if (e.key === 'ArrowRight' && dx === 0) {
    dx = 1; dy = 0;
  }
}

// Restart the game
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

// Main game loop
function gameLoop() {
  if (gameOver) return;
  moveSnake();
  render();
  setTimeout(gameLoop, 200);
}

// Initialize the game
createBoard();
render();
placeFood();
document.addEventListener('keydown', handleKey);
restartButton.addEventListener('click', restartGame);
gameLoop();
