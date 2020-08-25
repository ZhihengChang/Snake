var dx = 10;
var dy = 0;
var score = 0;
var foodX, foodY;

var canvas = document.getElementById("field");
var ctx = canvas.getContext('2d');

let snake = [  
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
    {x: 100, y: 150},
];

const keycodes = [
    {name: "left", code: 37, dx: -10, dy: 0},
    {name: "right", code: 39, dx: 10, dy: 0},
    {name: "up", code: 38, dx: 0, dy: -10},
    {name: "down", code: 40, dx: 0, dy: 10},
];

function drawSnakePart(snakePart) {  
    ctx.fillStyle = 'lightgreen';  
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
};

function drawSnake() {  
    snake.forEach(drawSnakePart);
};

function move() {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score++;
        document.getElementById('myScore').innerHTML = score;
        generateFood();
    }else{
        snake.pop();
    }
};

function clear() {  
    ctx.fillStyle = "white";  
    ctx.fillRect(0, 0, canvas.width, canvas.height);  
}

function main() {  
    if(isEnd()) return;
    setTimeout(function onTick() {
        clear();
        drawFood();
        move();
        drawSnake();
        main();
    }, 100)
}

function changeDirection(event) {
    let keyPressed = event.keyCode;
    let direction = keycodes.find(key => key.code == keyPressed);
    if(!isReverse(direction)){
        dx = direction.dx;
        dy = direction.dy;
    }
}

function isReverse(direction) {
    if(typeof direction == 'object'){
        if(direction.name == 'left'){
            return dx == 10;
        }
        else if(direction.name == 'right'){
            return dx == -10;
        }
        else if(direction.name == 'up'){
            return dy == 10;
        }
        else if(direction.name == 'down'){
            return dy == -10
        }
    }
    return null;
}

function randomNum(min, max) {  
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
};

function generateFood() {
    foodX = randomNum(0, canvas.width - 10); 
    foodY = randomNum(0, canvas.height - 10);
    snake.forEach(function isFoodOnSnake(part) {
        if (part.x == foodX && part.y == foodY){
            generateFood();  
        }
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.strokestyle = "darkred";
    ctx.fillRect(foodX, foodY, 10, 10);
    ctx.strokeRect(foodX, foodY, 10, 10);
}

function isEnd() {
    for(let i = 4; i < snake.length; i++) {    
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            return true
        }
    }
    return hitWall();
}

function hitWall(){
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > canvas.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > canvas.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

let start = confirm("Press OK to START the game");
if(start){
    generateFood();
    main();
    document.addEventListener("keydown", changeDirection);
    alert("you lost");
}
