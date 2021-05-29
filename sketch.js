var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastfed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database = firebase.database;
  createCanvas(1000,400);

  foodObj = new Food();

 // ref = foodObj;
  
  foodStock = database.Food;
 // foodStock.on("value",readStock);
  
  dog = createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedTheDog = createButton("Feed The Dog");
  feedTheDog.position(300, 95);
  feedTheDog.mousePressed(feedDog);
  

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 

  
 
  //write code to display text lastFed time here
 // if(lastfed >= 12) {
   // (last)
  //}

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val<= 0) {
    foodObj.updateFoodStock(food_stock_val*0)
  } else{
    foodObj.updateFoodStock(food_stock_val - 1);
  }

  //write code here to update (Done)food stock and 'last fed time'
  async function lastFed() {
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var dayTime = responseJSON.datetime;
    var hour = dayTime.slice(11, 13);
  }

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
