var dog, happyDog, database, foodS , foodStock
var feedpet,addfood;
var feedtime,lastfed;
var foodObj;

function preload()
{
happyDog=loadImage("dogImg.png");
dog=loadImage("dogImg1.png");
//milk = loadImage("milk.png");
}

function setup() {
  createCanvas(1000, 500);
  foodObj = new Food(foodS,lastfed) ;
  dog1 = createSprite(750 ,250,20,20);
  dog1.addImage(dog);
  dog1.scale= 0.2;
                                                                       

feedpet = createButton("feed");
feedpet.position(200,200);
feedpet.mousePressed(feedDog)

addfood = createButton("add food")
addfood.position(250,200);
addfood.mousePressed(addFood)

  database = firebase.database();
  foodStock = database.ref('food1')
  foodStock.on('value',readStock);

  
}


function draw() {  

  background(46, 139, 87);

  foodObj.display();


  
  fill(255,255,254);
  textSize(15);
 
  if(lastfed >= 12)
  {
    text("Last feed : " + lastfed%12  + " pm",350,30)
  }
    else if(lastfed == 0)
    {
     text("Last feed : 12 am",350,30)
    }
      else
      {
      text("Last fed : " + lastfed + " am ",350,30);
     }
   
     feedtime= database.ref('feedTime');
     feedtime.on('value',function (data){
       lastfed = data.val();
     })


     




  drawSprites();
}



function readStock(data)
{
 //if(data !== undefined)

  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
 

function addFood()
{
foodS++
  database.ref('/').update({
   food1: foodS
  })
}

function feedDog(){



foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    food1:foodObj.getFoodStock(),
 //  feedtime:hour()
  })
}





