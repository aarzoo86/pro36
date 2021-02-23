var dog,sadDog,happyDog;
var foodObj, addFood , feed ;
var foodStock,foodS;
var database

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

feed=createButton("Feed the dog") ;
feed.position (700,95);
feed.mousePressed (feedDog);

addFood=createButton ("Add Food");
addFood.position (800,95);
addFood.mousePressed (addFoods);
foodStock = database.ref('Food')
foodStock.on("value" ,readStock)

}

function draw() {
  background("pink");

  foodObj.display();
  drawSprites();
}

function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<= 0){
  foodObj.updateFoodStock(foodObj.getFoodStock()*0) ;
  }else{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
}

function addFoods (){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}

function readStock(data){

foodS = data.val()
foodObj.updateFoodStock(foodS)
}
