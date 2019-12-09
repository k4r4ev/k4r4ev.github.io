let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let ground = new Image();
ground.src = "images/ground.png";

let foodCarrot = new Image();
foodCarrot.src = "images/carrot.jpeg";

let box = 32;

let score = 0;

let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 3)) * box,
};

function draw() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodCarrot, food.x, food.y);
}

let game = setInterval(draw, 1000); // Вызов функции из вне