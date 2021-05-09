const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint;

var engine,world;

var character1,charcter1img,character2img,character2;
var gamestate = 0;
var playercount = 0;
var bot1,bot1img,bot2img,bot2;
var ray1,ray1img,ray2,ray2img;
var backgound1img,background2img;
var killcount10,killcountimg10,killcount20,killcountimg20,killcountimg;
var killcount = 0;
function preload(){

character1img = loadImage("character1.jpg");
character2img = loadImage("character2.jpg");
bot1img = loadImage("bot1.jpg");
bot2img = loadImage("bot2.jpg");
ray1img = loadImage("ray1.jpg");
ray2img = loadImage("ray2.jpg");
killcountimg = loadImage("killcount.img")
killcountimg10 = loadImage("kill10.png");
killcountimg20 = loadImage("kill20.png");
botsGroup = new Group();
raysGroup = new Group();

}

function setup() {
  var canvas = createCanvas(displayWidth, displayHeight);
  engine = Engine.create();
  world = engine.world;
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  character1 = createSprite(displayWidth/2-30,displayHeight/2+30);
  character1.addImage("character1",character1img);
  charcter1.x = Wroldmouse.x;

}

function draw(){
background("white");

character1.display();
text("Kill Count: "+ score + killcountimg, 500,50);
spawnBots();
spawnRays();
}

async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=06 && hour<=19){
      bg = "sprites/backgroung1.jpg";
  }
  else{
      bg = "sprites/background2.jpg";
  }

  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}
function spawnBots(){
if (frameCount % 20 === 0) {
  bots = createSprite(random(100, 1000), 0, 100, 100);
  bots.velocityY = 6;
  var rand = Math.round(random(1,2));
  switch(rand){
      case 1: bots.addImage("bot1",bot1img);
      break;
      case 2: bots.addImage("bot2", bot2img);
      break;
    }
  botsGroup.add(bots);
  bots.lifetime = 98;
  
  }
}

if (keyDown("space")) {
  createRays();
  
}

function createRays() {
  var ray1 = createSprite(character1.x,character.y);
  ray1.addImage(ray1img);
  ray1.x = 360;
  ray1.x=Wroldmouse.x;
  ray1.velocityX = -4;
  ray1.lifetime = 100;
  ray1.scale = 0.3;
  raysGroup.add(ray1);
   
}

if (raysGroup.isTouching(bot1)) {
  bot1.destroyEach();
  raysGroup.destroyEach();
  killcount=killcount+1;
}

if (raysGroup.isTouching(bot2)) {
  bot2.destroyEach();
  raysGroup.destroyEach();
  killcount=killcount+1;
}

if(killcount===10){

killcount10 = createSprite(displayWidth/2,displayHeight/2);p
killcount10.addImage(killcountimg10);

}

if(killcount===20){

killcount20 = createSprite(displayHeight/2,displayHeight/2);
killcount20.addImage(killcountimg20);

}

if(killcount===30){

character1img = character2img;

}
 
if(killcount===30){

gameState = end;

}
