const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

// Game variables
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = getRandomPosition();
let score = 0;
const boxSize = 20;

// Listen for key events and button clicks
document.addEventListener('keydown', changeDirection);
document.getElementById('up').addEventListener('click', () => setDirection(0, -1));
document.getElementById('left').addEventListener('click', () => setDirection(-1, 0));
document.getElementById('down').addEventListener('click', () => setDirection(0, 1));
document.getElementById('right').addEventListener('click', () => setDirection(1, 0));

// Start the game loop
let game = setInterval(drawGame, 100);

function drawGame() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach(segment => {
        ctx.fillStyle = '#59249e';
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    // Move the snake
    const head = { x: snake[0].x + direction.x * boxSize, y: snake[0].y + direction.y * boxSize };
    snake.unshift(head);

    // Check if the snake ate the food
    if (head.x === food.x && head.y === food.y) {
        food = getRandomPosition();
        score++;
    } else {
        snake.pop();
    }

    // Check for collisions
    if (checkCollision(head)) {
        clearInterval(game);
        alert('Game Over! Score: ' + score);
        resetGame();
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            setDirection(0, -1);
            break;
        case 'ArrowLeft':
            setDirection(-1, 0);
            break;
        case 'ArrowDown':
            setDirection(0, 1);
            break;
        case 'ArrowRight':
            setDirection(1, 0);
            break;
    }
}

function setDirection(x, y) {
    // Prevent reverse movement
    if (x !== -direction.x && y !== -direction.y) {
        direction = { x, y };
    }
}

function getRandomPosition() {
    const x = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    const y = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
    return { x, y };
}

function checkCollision(head) {
    return (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    food = getRandomPosition();
    score = 0;
    game = setInterval(drawGame, 100);
}
