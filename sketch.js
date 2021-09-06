var dog,dog_running,dog_collided;
var ground,ground_image;
var coin,coin_image,coGroup,coinsound
var obstacle1,obGroup;
var score=0;
var coin=0;
var lives=3;
var PLAY=0
var END=1
var SERVE=2
var Gamestate=PLAY
var gameover,gameoverimg,gameoversound
var restart,restartimg,restartsound
var won,win
var playing,playimg,playsound


function preload(){
dog_running=loadAnimation("doggy1.jpg","doggy.jpg");
dog_collided=loadImage("dogcollided.jpg")
ground_image=loadImage("ground6.png")
coin_image=loadImage("coin.jpg")
obstacle1=loadImage("cactus1.jpg")

gameoverimg=loadImage("gameover.png")
restartimg=loadImage("restart.png")
win=loadImage("win.jpg")

coinsound=loadSound("coinS.mp3")
gameoversound=loadSound("gameoverS.wav")
restartsound=loadSound("restartS.wav")
playsound=loadSound("playS.wav")

}

function setup() {
createCanvas(500,300)

dog=createSprite(55,130,20,20);
dog.addAnimation("running",dog_running)
dog.addAnimation("collided",dog_collided)
dog.scale=0.5
  
ground=createSprite(245,200,600,30); ground.addImage(ground_image)
ground.scale=2
ground.velocityX=-4
  
gameover=createSprite(225,60,20,20)
gameover.addImage(gameoverimg)
gameover.scale=0.2
  
restart=createSprite(225,120,20,20)
restart.addImage(restartimg)
restart.scale=0.2

won=createSprite(225,80,30,30)
won.addImage(win)
won.scale=0.5
  

  
obGroup=new Group();
coGroup=new Group();
}

function draw() {
 background("white");
 // cat.debug=true  
textSize(20)
text("score:"+score,10,20)
text("lives:"+lives,200,20)
text("coins:"+coin,400,20)
  
  if(Gamestate===PLAY){
 
  score=score+Math.round(getFrameRate()/60);
     
    
  if(keyDown("space")&& dog.y >=120){
    dog.velocityY=-12 
  }
  dog.velocityY = dog.velocityY + 0.8
    
  if(obGroup.isTouching(dog)){
    Gamestate= END
    lives=lives-1
    gameoversound.play();
  }
    
   if(coGroup.isTouching(dog)){
     coin = coin+1
     coGroup[0].destroy()
     coinsound.play();
   }
    
  if(ground.x<220){
    ground.x=ground.width  
  }
    
   if(lives===0){
   Gamestate=SERVE;
  }
  
    Coin();
  Obstacle1();
    
    restart.visible=false;
    gameover.visible=false;
    won.visible=false;
    
  }

  else if (Gamestate===END){
  restart.visible=true  
  gameover.visible=true
    
  dog.changeAnimation("collided",dog_collided)
  obGroup.setVelocityXEach(0)
  coGroup.setVelocityXEach(0)
  ground.velocityX=0  
  obGroup.setLifetimeEach(-1);
  coGroup.setLifetimeEach(-1);
    
  if(mousePressedOver(restart)){
    reset();
    restartsound.play();
   }
  }
  
  else if(Gamestate===SERVE){
    won.visible=true
    
    dog.changeAnimation("collided",dog_collided)
  obGroup.setVelocityXEach(0)
  coGroup.setVelocityXEach(0)
  ground.velocityX=0  
  obGroup.setLifetimeEach(-1);
  coGroup.setLifetimeEach(-1);
    
  
    
  }
  
dog.collide(ground)
dog.setCollider("rectangle",0,0,dog.width,dog.height) 
  
  
 drawSprites();
}

function Coin() {
if(frameCount % 80 ===0) {
 var coins=createSprite(400,150,20,20) 
 coins.y=Math.round(random(80,150))
 coins.addImage(coin_image)
  coins.scale=0.01
  coins.velocityX=-3
  coins.lifetime=200
  coGroup.add(coins)
}
}


function Obstacle1(){
if(frameCount%60===0){
   var obstacles = createSprite(400,145,10,40); 
    var rand = Math.round(random(1,3));
    
    
  obstacles.velocityX=-6
  obstacles.scale=0.7
  obstacles.lifetime=300
  obGroup.add(obstacles);
}
}

function reset(){
  Gamestate=PLAY
  gameover.visible=false
  restart.visible=false
  obGroup.destroyEach();
  coGroup.destroyEach();
  score=0
  coin=0
  dog.changeAnimation("running",dog_running);
  ground.velocityX=-4
} 

function winning(){
  Gamestate=PLAY
  gameover.visible=false
  restart.visible=false
  obGroup.destroyEach();
  coGroup.destroyEach();
  score=0
  coin=0
  lives=3
  dog.changeAnimation("running",dog_running);
  ground.velocityX=-4
}
