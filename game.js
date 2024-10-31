//Variables and Constants

const foodMusic = new Audio("music/food.mp3");
const gameOverMusic = new Audio("music/gameover.mp3");
const movementMusic = new Audio("music/move.mp3");
const backgroundMusic = new Audio("music/music.mp3");

let lastCtimeVal = 0; //to control game function execution time
let framesPerRate;

let food = {
    a: 5,
    b: 7
};

// to handle music state

let musicState = "on";

//to handle difficulty of program
let difficulty;

//for screen width
let screenWidth;

//actual container in game will run
const gameContainer = document.querySelector(".game-container")

//object controlling direction of snake according to user input

let userInputDir = {
    a: 0,
    b: 0
};

//array containing snake head and body

const snake = [
    {
        a: 8,
        b: 10
    }
];

//variable to kepp track of score in game

const scoreBoard = document.querySelector(".score-con span");

let score = 0;

//Some Functions to control and run game

//function to get current screen width

function checkWidth() {

    screenWidth = window.innerWidth;
    if (screenWidth <= 1024) {
        framesPerRate = 7; //speed of game on mobile devices
    } else {
        framesPerRate = 15; //speed of game laptops
    }
}

window.onload = checkWidth;

// functions for this game

//Main function from which the whole execution of game starts

function main(ctime) {

    window.requestAnimationFrame(main);
    if ((ctime - lastCtimeVal) / 1000 < 1 / framesPerRate) {
        return;
    }
    lastCtimeVal = ctime;

    mainGameFunction(snake);

}


// Function to reset the game state
function resetGame() {
    snake.length = 0; // Clear the snake array
    snake.push({
        a: 8,
        b: 10
    }); // Initialize the snake
    food = {
        a: 5,
        b: 7
    }; // Initialize the food
    userInputDir = {
        a: 0,
        b: 0
    }; // Reset user input direction
    score = 0;
}

// Function to handle game over
function gameOver() {
    backgroundMusic.pause();
    if (musicState === "on") {
        gameOverMusic.play();
    }

    alert("Game Over! Press Enter to play again");
    
    resetGame();
    if (musicState === "on") {
        backgroundMusic.play();
    }

}

//Function to Check whether the snake get collides with itself or with the wall

function isBump() {

    for (let index = 1; index < snake.length - 1; index++) {
        if (snake[0].a === snake[index].a && snake[0].b === snake[index].b) {
            return true;
        }
    }

    if (screenWidth <= 1024) {
        if (snake[0].a >= 12 || snake[0].a <= 0 || snake[0].b >= 14 || snake[0].b <= 0) {
            return true;
        }
    } else {
        if (snake[0].a >= 18 || snake[0].a <= 0 || snake[0].b >= 18 || snake[0].b <= 0) {
            return true;
        }

    }

    return false;

}

//function to check whether snake has eaten the food or not

function isFoodEaten() {

    return snake[0].a === food.a && snake[0].b === food.b;

}

//function which will execute when food is being eaten

function ifFoodEaten() {
    if (musicState === "on") {
        foodMusic.play();
    }
    if (screenWidth <= 1024) {

        if (difficulty === "hard") {
            food.a = Math.round(Math.random() * (12 - 1) + 1);
            food.b = Math.round(Math.random() * (14 - 1) + 1);
        } else {
            food.a = Math.round(Math.random() * (10 - 2) + 2);
            food.b = Math.round(Math.random() * (12 - 2) + 2);
        }

    } else {

        if (difficulty === "hard") {
            food.a = Math.round(Math.random() * (18 - 1) + 1);
            food.b = Math.round(Math.random() * (18 - 1) + 1);
        } else {
            food.a = Math.round(Math.random() * (16 - 2) + 2);
            food.b = Math.round(Math.random() * (16 - 2) + 2);
        }
    }

    snake.unshift({
        a: snake[0].a + userInputDir.a,
        b: snake[0].b + userInputDir.b
    })

    score++;

}

// Function to move the snake

function movingSnake() {
    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = {
            ...snake[i]
        };
    }

    snake[0].a += userInputDir.a;
    snake[0].b += userInputDir.b;

}

//function to display snake and food

function displayFoodAndSnake() {

    gameContainer.innerHTML = '';

    snake.forEach((element, index) => {

        const snakeBodyPart = document.createElement("div");
        snakeBodyPart.style.gridColumnStart = element.a;
        snakeBodyPart.style.gridRowStart = element.b;

        if (index === 0) {
            snakeBodyPart.classList.add("snake-head");
        } else if (index === snake.length - 1) {
            snakeBodyPart.classList.add("snake-last-body-part");

        } else {
            snakeBodyPart.classList.add("snake-body");

        }

        gameContainer.appendChild(snakeBodyPart);

    })

    // Displaying the food on the screen 

    const foodElement = document.createElement("div");

    foodElement.style.gridColumnStart = food.a;
    foodElement.style.gridRowStart = food.b;
    foodElement.classList.add("food");

    gameContainer.appendChild(foodElement);

    scoreBoard.innerHTML = score;
}

//game main function which runs the game

const mainGameFunction = () => {

    if (isBump()) {

        gameOver();
        return;

    }

    if (isFoodEaten()) {
        ifFoodEaten();
    }


    movingSnake();
    displayFoodAndSnake();

}

//Starting the game when user click start game button

document.querySelector(".start-game-btn button").addEventListener('click', () => {

    //removing blur filter and hidding the start game button
    document.querySelector(".options").style.filter = "none";
    document.querySelector(".game-main-body").style.filter = "none";
    backgroundMusic.play();

    document.querySelector(".start-game-btn").style.display = "none";

    //starting the game

    window.requestAnimationFrame(main);

});

//to change direction of snake when key presses

document.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowUp') {
        userInputDir.a = 0;
        userInputDir.b = -1;
    } else if (event.key === 'ArrowDown') {
        userInputDir.a = 0;
        userInputDir.b = 1;
    } else if (event.key === 'ArrowRight') {
        userInputDir.a = 1;
        userInputDir.b = 0;
    } else if (event.key === 'ArrowLeft') {
        userInputDir.a = -1;
        userInputDir.b = 0;
    }
});

//Buttons for mobile devices 

//code to make sure it gives the same functioning as the arrow buttons give

document.querySelectorAll(".mobile-btn").forEach((element) => {

    element.addEventListener('click', (event) => {

        userInputDir = {
            a: 0,
            b: 0
        };
        if (event.currentTarget.classList.contains("up")) {
            userInputDir.a = 0;
            userInputDir.b = -1;
        } else if (event.currentTarget.classList.contains("down")) {
            userInputDir.a = 0;
            userInputDir.b = 1;
        } else if (event.currentTarget.classList.contains("right")) {
            userInputDir.a = 1;
            userInputDir.b = 0;
        } else if (event.currentTarget.classList.contains("left")) {
            userInputDir.a = -1;
            userInputDir.b = 0;
        }

    });

})

// Element variables
const gameBody = document.querySelector(".game-main-body");
const mobileMenu = document.querySelector("#menu-icon");
const mainMobileMenu = document.querySelector(".main-mobile-menu");
const diffiMobileMenu = document.querySelector(".diffi-mobile-menu");
const musicMobileMenu = document.querySelector(".music-mobile-menu");

// Difficulty handling
document.querySelectorAll(".diffi-btn").forEach((diffBtn) => {
    diffBtn.addEventListener('click', (event) => {
        
        score = 0;
        
        if (screenWidth <= 1024) {
            const {
                innerHTML
            } = event.target;
            framesPerRate = innerHTML === "Easy" ? 7 : 11;
            difficulty = innerHTML.toLowerCase();

        } else {
            const {
                innerHTML
            } = event.target;
            framesPerRate = innerHTML === "Easy" ? 15 : 20;
            difficulty = innerHTML.toLowerCase();

        }
        diffiMobileMenu.style.display = "none";
        mobileMenu.className = "fa-solid fa-bars";
        gameBody.style.filter = "none";
    });
});

// Music control
document.querySelectorAll(".music-btn").forEach((musicBtn) => {
    musicBtn.addEventListener('click', (event) => {
        musicState = event.target.innerHTML === "ON" ? "on" : "off";
        event.target.innerHTML === "OFF" ? backgroundMusic.pause() : backgroundMusic.play();
        musicMobileMenu.style.display = "none";
        mobileMenu.className = "fa-solid fa-bars";
        gameBody.style.filter = "none";
    
    });
});

// Mobile menu control
mobileMenu.addEventListener('click', () => {
    if (mobileMenu.classList.contains("fa-bars")) {
        gameBody.style.filter = "blur(10px)";
        mainMobileMenu.style.display = "flex";
        mobileMenu.className = "fa-solid fa-xmark";
        userInputDir.a = 0;
        userInputDir.b = 0;
        
    } else {
        gameBody.style.filter = "none";
        mainMobileMenu.style.display = "none";
        musicMobileMenu.style.display = "none";
        diffiMobileMenu.style.display = "none";
        mobileMenu.className = "fa-solid fa-bars";
    }
});

// Menu interactions
document.querySelector(".mobile-menu-diffi").addEventListener('click', () => {
    mainMobileMenu.style.display = "none";
    diffiMobileMenu.style.display = "flex";
});

document.querySelector(".mobile-menu-music").addEventListener('click', () => {
    mainMobileMenu.style.display = "none";
    musicMobileMenu.style.display = "flex";
});
