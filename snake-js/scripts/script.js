let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let background = new Image();
background.src = "images/background.jpg";

let foodImg = new Image();
foodImg.src = "images/book.png";

let foodOrder = 1;

function changeFood() {
  switch (foodOrder) {
    case 1:
      foodImg.src = "images/carrot.png";
      break;
    case 2:
      foodImg.src = "images/book.png";
      break;
    case 3:
      foodImg.src = "images/coffee.png";
      break;
    case 4:
      foodImg.src = "images/cut.png";
      break;
    case 5:
      foodImg.src = "images/flower.png";
      break;
  }
  if (foodOrder === 5) {
    foodOrder = 1;
  } else {
    foodOrder++;
  }
  console.log(foodOrder);
}

let box = 32;

let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 17 + 1)) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 9 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
  if (event.keyCode == 37 && dir != "right")
    dir = "left";
  else if (event.keyCode == 38 && dir != "down")
    dir = "up";
  else if (event.keyCode == 39 && dir != "left")
    dir = "right";
  else if (event.keyCode == 40 && dir != "up")
    dir = "down";
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
    }
  }
}

function drawGame() {
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    changeFood();
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 17 + 1)) * box,
    };
  } else {
    snake.pop();
  }

  if (snakeX < box || snakeX > box * 17 || snakeY < box || snakeY > box * 17) {
    clearInterval(game);
    location.reload();
  }

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);
  snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);