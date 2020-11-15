//variables
var monkey , monkey_running,ground,groundImg,invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var gamestate="play";

function preload(){  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  groundImg=loadImage("jungle.jpg");
   monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  invisibleGround = createSprite(190,height,900,10);
  
  monkey=createSprite(80,height,40,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.2;
  monkey.debug=false;
  monkey.setCollider("rectangle",0,0,500,570,0);
  
  ground = createSprite(width,height,900,60);
  ground.scale=2;
  ground.velocityX=-6;
  ground.addImage(groundImg);
  
  monkey.depth=ground.depth;
  monkey.depth=monkey.depth+4;

  edges = createEdgeSprites();
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
   background("green")
  if(gamestate==="play"){
     monkey.collide(invisibleGround);
     ground.shapeColor="green";
 
  if(ground.x<50){
    ground.x=ground.width/2;
  }
  if(keyDown("space")){
     monkey.velocityY = -15;
    }
  monkey.velocityY = monkey.velocityY +1;
  
    food();
    stones();
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+2;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.velocityY=0;
    obstacleGroup.setVelocityEach(0);
    FoodGroup.setVelocityEach(0);
    obstacleGroup.setLifetime=-1;
    FoodGroup.setLifetime=-1;
    monkey.destroy();
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    gamestate="end";
  }
  
drawSprites();  
  }else if(gamestate==="end"){
    textSize(30);
    fill("yellow");
    text("Game Over",width-400,height-250);
  }
  textSize(20);
  fill("yellow");
  text("Score: "+ score, width-100,30);
  
}

function food(){
  if (frameCount % 200===0){
  banana=createSprite(width,200,10,30);
  banana.velocityX=-4
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.lifeime=200;
  banana.y=Math.round(random(width));
  FoodGroup.add(banana);
  }
}

function stones(){
  if (frameCount % 370===0){
    obstacle = createSprite(width,height-40,40,10);
    obstacle.velocityX=-4;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.lifetime=500;
    obstacleGroup.add(obstacle);
  }
}