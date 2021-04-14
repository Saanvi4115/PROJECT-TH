var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

var town, townImage;

var tent, tentImage;

var boy, boyStanding, boy_walking;

function preload(){
  townImage = loadImage("road.png");
  car1Image = loadImage("car.png");
  car2Image = loadImage("car2.png");

  boyStanding = loadImage("boyStatic.png");
  boy_walking = loadImage("walking1.png","walking2.png","walking3.png","walking4.png",
                          "walking5.png","walking6.png","walking7.png","walking8.png");
  boy_died = loadImage("rip.png");

  tentImage = loadImage("tent.png");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);

  town = createSprite(200,100,400,20);
  town.addImage("town1", townImage);
  town.x = town.width/2.5;
  town.velocityX = -5;
  town.scale=2.7

  boy = createSprite(100,100,200,200);
  boy.addImage("stand", boyStanding);
  boy.addImage("walk", boy_walking);

 
  carsGroup = new Group();

  score= 0;
}

function draw() {
  camera.x=boy.x;
 
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    town.velocityX = -5;
    
    boy.changeAnimation("walking", boy_walking);
    
    if(keyIsDown(UP_ARROW) ) {
      boy.velocityY = -5;
      boy.velocityX = 0;
    }
    if(keyIsDown(DOWN_ARROW) ) {
      boy.velocityY = 5;
      boy.velocityX = 0;
    }
    if(keyIsDown(LEFT_ARROW) ) {
      boy.velocityX = -5;
      boy.velocityY = 0;
    }
    if(keyIsDown(RIGHT_ARROW) ) {
      boy.velocityX = 5;
      boy.velocityY = 0;
    }
  
    if (town.x < 0){
      town.x = town.width/2;
    }
  
    if(carsGroup.isTouching(boy)){
        gameState = END;
    }
  }
  else if (gameState === END) {
  
    town.velocityX = 0;
    boy.velocityY = 0;
    carsGroup.setVelocityXEach(0);
    
    boy.changeAnimation("collided",boy_died);
    
    carsGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
}

function spawnCars() {
  if(frameCount % 60 === 0) {
    var car = createSprite(600,165,10,40);
    
    car.velocityX = -(6 + 3*score/100);00
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(car1Image);
              break;
      case 2: obstacle.addImage(car2Image);
              break;
      default: break;
    }
  }
}