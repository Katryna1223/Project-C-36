var dog, sadDog, happyDog, feed, add, foodObj, foodStock, database;
var lastFed, feedTime;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  
  database = firebase.database();

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObj = new Food();

  feed = createButton('Feed Me!');
  feed.position(200, 340);
  feed.mousePressed(feedDog);

  add = createButton('Add Food!');
  add.position(200, 129);
  add.mousePressed(addFood);

  database.ref('/').update({
    Food: 10
  });
  foodObj.getFoodStock();

  getTime();
}

function draw() {
  background(46,139,87);
  //console.log(foodStock);
 
  //addFood();
 
  foodObj.display();

  drawSprites();
}


//function to read food Stock


//function to update food stock and last fed time
function addFood(){
  var currentFood = foodObj.getFoodStock() + 1;
  console.log(currentFood);
  if(foodObj.getFoodStock()<=14){
    database.ref('/').update({
      Food: currentFood
    });
  }
}

//function to add food in stock
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  } else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }

 // database.ref('/').set({
 //   FeedTime: feedTime
 // });
}

async function getTime(){
  var response = await fetch('http://worldtimeapi.org/api/timezone/America/Barbados');
  var responseJSON = await response.json();
  var datetime = responseJSON.utc_datetime;
  var day = datetime.slice(0,10);
  var time = datetime.slice(11, 16);
  feedTime = day + time;
  console.log(feedTime);
}