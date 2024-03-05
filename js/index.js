let inputDir = {x: 0, y: 0}; 
let gamePaused = false; 

const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/straner-things-124008.mp3');
const musicSound = new Audio('./music/music.mp3');

let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{x: 13, y: 15}];

let food = {x: 6, y: 7}; 

function main(ctime) {
    window.requestAnimationFrame(main);
   
    if(gamePaused) return; 
   
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
 
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        document.getElementById('outMessage').innerText = "You are out";
        setTimeout(() => {
            document.getElementById('outMessage').innerText = "";
        }, 2000); 
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

   
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

  
    for (let i = snakeArr.length - 2; i >= 0; i--) { 
        snakeArr[i + 1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    const board = document.getElementById('board');
   
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
   
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}

musicSound.play();
let hiscore = localStorage.getItem("hiscore");
let hiscoreval;
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} 
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});

// Button event listeners
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const pauseButton = document.getElementById('pauseButton');

upButton.addEventListener('click', () => {
    inputDir = {x: 0, y: -1};
    moveSound.play();
});

downButton.addEventListener('click', () => {
    inputDir = {x: 0, y: 1};
    moveSound.play();
});

leftButton.addEventListener('click', () => {
    inputDir = {x: -1, y: 0};
    moveSound.play();
});

rightButton.addEventListener('click', () => {
    inputDir = {x: 1, y: 0};
    moveSound.play();
});


pauseButton.addEventListener('click', () => {
    gamePaused = !gamePaused; 
    if (gamePaused) {
        pauseButton.innerText = "Resume";
        musicSound.pause(); 
    } else {
        pauseButton.innerText = "Pause";
        musicSound.play(); 
    }
});


const touchArea = document.getElementById('controls');

let touchStartX = 0;
let touchStartY = 0;

touchArea.addEventListener('touchstart', handleTouchStart, false);
touchArea.addEventListener('touchmove', handleTouchMove, false);

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    event.preventDefault();
    const touchEndX = event.touches[0].clientX;
    const touchEndY = event.touches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
           
            inputDir = {x: 1, y: 0};
        } else {
           
            inputDir = {x: -1, y: 0};
        }
    } else {
        if (deltaY > 0) {
           
            inputDir = {x: 0, y: 1};
        } else {
           
            inputDir = {x: 0, y: -1};
        }
    }
}

