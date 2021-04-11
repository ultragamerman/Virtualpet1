//Create variables here
var foodS,doggo,doggohappy,doggonormal,database;

function preload()
{
	//load images here
  doggohappy = loadImage("images/dogImg1.png");
  doggonormal =loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(800, 800);
  database = firebase.database();
  foodS = database.ref('Food');
  foodS.on("value",readFood);
  doggo = createSprite(400,400,20,20);
}


function draw() {  
doggo.addImage(doggonormal);
doggo.scale = 0.1;
if(keyCode === 32){
  writeFood();
  for(var i = World.frameCount;i < i + 50;i=i){
    doggo.changeImage(doggohappy);
  }
  doggo.changeImage(doggonormal);
}
if(keyCode === UP_ARROW){
  database.ref('Food').set({
    'Food': foodStash + 5
  })
}

  drawSprites();
  //add styles here

}

function readFood(data){
  foodStash = data.val();
  foodS = foodStash;
}

function writeFood(){
  database.ref('Food').set({
    'Food':foodStash - foodS
  })
}