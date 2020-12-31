var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var gameState =0;
playerCount=0;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
function preload(){
  
  
  monkey_running =loadAnimation("images/monkey_0.png","images/monkey_1.png","images/monkey_2.png","images/monkey_3.png","images/monkey_4.png","images/monkey_5.png","images/monkey_6.png","images/monkey_7.png","images/monkey_8.png")
  
  bananaImage = loadImage("images/banana.png");
  obstaceImage = loadImage("images/obstacle.png");
 
}



function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  var survivalTime=0;

  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  //creating ground
  ground = createSprite(400,350,900,10);
  ground.velocityX=-0.1;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}


function draw() {

  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2 ){
game.end();
  }
  background(255);
  
  
  if(ground.x<0) {
    ground.x=ground.width/2;
    
  }

  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8
     
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  
   monkey.velocityY = monkey.velocityY + 0.8;
  
   monkey.collide(ground);   
   spawnFood();
   spawnObstacles();

  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50); 

  if(obstaclesGroup.isTouching(monkey)){
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
     background (180)
    text("better Luck Next Time!",200,200);
  }

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
  
  
}
function spawnFood() {
  
    if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
//assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
      //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



