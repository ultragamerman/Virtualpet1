//Create variables here
var dog,happyDog;
var dogImg,happyDogImg;
var dataBase;
var foodS,foodStock;

var database;
var gameState;



var feedButton, addButton;
var lastFed;
var foodObj;

var readState,changeState;

var bedroomImg,gardenImg,washroomImg;

function preload(){
  //load images here
  dogImg = loadImage('images/Dog.png');
  happyDogImg = loadImage('images/happydog.png')

  bedroomImg = loadImage("images/Bed Room.png")
  gardenImg = loadImage("images/Garden.png")
  washroomImg = loadImage("images/Wash Room.png")
  livingImg = loadImage("images/Living Room.png")
}

function setup() {
  var canvas = createCanvas(600,600);
  database = firebase.database();
  


  dog = createSprite(500,350,10,10);
  dog.addImage(dogImg)
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feedButton = createButton("Feed Dog");
  addButton = createButton("Add Food");
  bathButton= createButton("I want to take a Bath");
  sleepyButton = createButton("I am very Sleepy");
  playButton = createButton("Let's Play");
  parkButton = createButton("Let's play in Park");

  feedButton.position(90,50);
  addButton.position(180,50);
  bathButton.position(270,50);
  sleepyButton.position(420,50);
  playButton.position(200,100);
  parkButton.position(300,100);
  

  feedButton.mousePressed(function(){
    foodS = foodS-1;
    gameState = 1;
    database.ref('/').update({'gameState': gameState})
  });
  addButton.mousePressed(function(){
    foodS+= 1;
    gameState = 2;
    database.ref('/').update({'gameState': gameState})
  });
  bathButton.mousePressed(function(){
    gameState = "Bathing"
    database.ref('/').update({'gameState': gameState})
  })
  sleepyButton.mousePressed(function(){
    gameState = "Sleep"
    database.ref('/').update({'gameState': gameState})
  })
  playButton.mousePressed(function(){
    gameState = "Playing"
    database.ref('/').update({'gameState': gameState})
  })
  parkButton.mousePressed(function(){
    gameState = "Park"
    database.ref('/').update({'gameState': gameState})
  })

  foodObj = new Food();

  //game state code
  readState = database.ref('gameState');
  readState.on('value',function(data){
    gameState=data.val();
  })

  
}


function draw() {  
  background(46, 139, 87);
  
  foodObj.display();


  database.ref('FeedTime').on("value",readTime);

  

  drawSprites();

  fill(255);
  textSize(20);
  text("Food Remaining: "+foodS,200,570);

  



  
  if(gameState===1){
  dog.addImage(happyDogImg);
  dog.scale = 0.3;
  dog.x = 500;
  } else if(gameState===2){
    dog.addImage(dogImg);
    dog.scale = 0.3;
    dog.x = 500;
  } else if(gameState==="Bathing"){
    dog.addImage(washroomImg);
    dog.x = 300;
    dog.y = 300;
    dog.width = 600;
    dog.scale=1;
    foodObj.visible = false;
  } else if(gameState==="Sleep"){
    dog.addImage(bedroomImg);
    dog.x = 300;
    dog.y = 300;
    dog.scale=0.9;
    foodObj.visible = false;
  } else if(gameState==="Playing"){
    dog.addImage(livingImg);
    dog.x = 300;
    dog.y = 300;
    dog.scale = 1;
    foodObj.visible = false;
  } else if(gameState==="Park"){
    dog.addImage(gardenImg);
    dog.x = 300;
    dog.y = 300;
    dog.scale = 1;
    foodObj.visible = false;
  } 


  console.log(gameState);

}




//function to read and write food stock from database
function readStock(data){
  foodS = data.val();
  //foodObj.updateFoodStock(foodS);
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}



function readTime(data){
  lastFed = data.val();
}

//function to write values in database

function feedDog(){

  if(gameState==="Hungry")
  dog.addImage(happyDogImg);

  

  if(foodS<=0){
    foodS=0;
    }else{
      foodS = foodS-1;
    }
  
  database.ref('/').update({
    FeedTime:hour(),
    Food:foodS
  })
}



function addFood(){

  foodS = foodS+1;

  database.ref('/').update({
    Food:foodS
  })

}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

  
