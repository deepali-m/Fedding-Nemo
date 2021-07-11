// Feeding Nemo Game in Javascript by Deepali Mokashi
//defining required varibales for the game

var bg, nemo, nemoImg;
var fish1Group, fish2Group, shark1Group, shark2Group;
var fish1Img, fish2Img, shark2Img, shark2Img;
var score = 0;
var gulpImg, gameOverImg, restartImg, restart, gameOver;
var gameState = "play"
var scoreB, gulpSound;

function preload() {
  //loading all the game assests
  bg = loadImage("ocean.jpg");

  nemoImgRight = loadImage("nemo.png");
  nemoImgLeft = loadImage("nemo_left.png");

  fish1Img = loadImage("fish1.png");

  fish2Img = loadImage("fish2.png");
  shark1Img = loadImage("shark1.png");
  shark2Img = loadImage("shark2.png");
  gulpImg = loadImage("gulp.png");

  restartImg = loadImage("gameOverImg.PNG");
  gameOverImg = loadImage("GO.png")
  scoreBImg = loadImage("scoreb.PNG");
  gulpSound = loadSound("gulp.mp3")
}
function setup() {
  //creating the canvas
  createCanvas(windowWidth, windowHeight);

  //creating nemo sprite and adding image
  nemo = createSprite(400, 200, 50, 50);
  nemo.addImage(nemoImgLeft)
  nemo.scale = 0.5;

  //creating gulp sprite and adding image
  gulp = createSprite(300, 200, 10, 10);
  gulp.addImage(gulpImg);
  gulp.visible = false;

  //creating the groups
  fishGroup = new Group();
  sharkGroup = new Group();

  //creating game over and restart sprite and adding image
  gameOver = createSprite(windowWidth / 2, windowHeight / 2 - 200)
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  restart = createSprite(windowWidth / 2, windowHeight / 2 + 100)
  restart.addImage(restartImg);
  restart.scale = 0.4
  restart.visible = false;

  //creating scoreboard sprite and adding image
  scoreB = createSprite(90, 60, 200, 80)
  scoreB.addImage(scoreBImg);
}


function draw() {
  //adding background image
  background(bg);
  drawSprites();

  //dividing the game into two game states
  if (gameState === "play") {
    //moving nemo as per mouse
    nemo.x = mouseX;
    nemo.y = mouseY;

    //adding animation to the nemo
    if (nemo.x < windowWidth / 2) {
      nemo.addImage(nemoImgLeft)
    }
    else {
      nemo.addImage(nemoImgRight)
    }

    //styling the text to display score
    textSize(50);
    stroke("brown")
    fill("orange");
    strokeWeight(5);
    textFont('comic')
    text(score, 50, 100);

    //spawning different objects in the game by calling functions 
    spawnFish()
    spawnFish1()
    spawnSharks()
    spawnSharks1()

    //checking if the the nemo is touching the sharks
    if (sharkGroup.isTouching(nemo)) {
      gameState = "end"
    }

    gulp.visible = false;

    //checking if the nemo is touching the fish and destroying the fish
    for (var i = 0; i < fishGroup.length; i++) {
      if (fishGroup.get(i).isTouching(nemo)) {
        fishGroup.get(i).destroy();
        score += 1;
        gulp.visible = true;
        gulp.x = nemo.x;
        gulp.y = nemo.y;
        gulpSound.play()

      }
    }

  }

  //assigning functionality to the objects when game state is 'end'
  else if (gameState === "end") {
    textSize(50);
    fill(255)
    gameOver.visible = true;
    restart.visible = true;
    sharkGroup.destroyEach();
    fishGroup.destroyEach();
    nemo.visible = false;
    textSize(50);
    stroke("brown")
    fill("orange");
    strokeWeight(5);
    textFont('Arial Black')
    scoreB.visible = false;
    text("YOU SCORED " + score + " POINTS", windowWidth / 2 - 300, windowHeight / 2);

    //checking if user clicks on the restart and uplon calling reset() function
    if (mousePressedOver(restart)) {
      reset()
    }
  }

}

//defining reset() function
function reset() {
  gameState = "play";
  score = 0;
  sharkGroup.destroyEach();

  fishGroup.destroyEach();

  gameOver.visible = false;
  restart.visible = false;
  nemo.visible = true;

  scoreB.visible = true;
}

//defining spawnFish() function
function spawnFish() {
  if (frameCount % 80 === 0) {
    var fish1 = createSprite(windowWidth, random(0, windowHeight), 20, 20);
    fish1.velocityX = -8;
    fish1.addImage(fish1Img);
    fish1.scale = 0.2;
    fishGroup.add(fish1);
  }
}

//defining spawnSharks() function
function spawnSharks() {
  if (frameCount % 130 === 0) {
    var shark1 = createSprite(0, random(0, windowHeight), 20, 20);
    shark1.velocityX = 5;
    shark1.addImage(shark1Img);
    shark1.scale = 0.8
    sharkGroup.add(shark1);
  }
}

//defining spawnSharks() function
function spawnSharks1() {
  if (frameCount % 200 === 0) {
    var shark1 = createSprite(windowWidth, random(0, windowHeight), 20, 20);
    shark1.velocityX = -4;
    shark1.addImage(shark2Img);
    shark1.scale = 0.5
    sharkGroup.add(shark1);
  }
}

//defining spawnFish1() function
function spawnFish1() {
  if (frameCount % 100 === 0) {
    var fish2 = createSprite(0, random(0, windowHeight), 20, 20);
    fish2.velocityX = 8;
    fish2.addImage(fish2Img);
    fish2.scale = 0.2
    fishGroup.add(fish2);
  }
}