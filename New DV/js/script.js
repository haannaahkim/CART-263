/**
Data Visualization: Honey Production
Hannah Kim

*/

//GLOBAL VARIABLES
let table;
let data= [];
let xP, yP;
let bee;
let bee2;
let bee3;
let beeX = 400;
let beeY = 500;
let bee2X = 5500;
let bee2Y = 2000;
let bee3X = 3000;
let bee3Y = 500;
let posX = 0;
let posY = 0;




function preload(){
  //data
  table = loadTable ("honey_production_data.csv", "csv", "header");

  //images
  bee = loadImage("bee.png");
  bee2 = loadImage("bee2.png");
  bee3 = loadImage("bee3.png");

}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(0);

  let xoffset = 0;
  
  for (var i = 0; i < table.getRowCount(); i++){

   data[i] = new DataPoint(table.getString(i,0),
                                            table.getString(i,1),
                                            table.getString(i,2),
                                            table.getString(i,3),
                                            table.getString(i,4),
                                            table.getString(i,5),
                                            table.getString(i,6),
                                            table.getString(i,7));
  }



  }

  function draw(){

  background(234, 172, 29);

  var space = 52; 
  var w = 28;

  for (var y = 0; y < 130; y++) { //amount of hexagons being produced
    var positiony = y * space * Math.sqrt(2.15) / 2;
    for (var x = 0; x <150; x++) {
      if (y % 2 == 0) hexagon(x * space, positiony, w, w, 5, 0);
      else hexagon(space / 2 + x * space, positiony, w, w, 5, 0);
    }
  }

//space in between each data hexagon
 let xoffset = 0;

  for (var i = 0; i < data.length; i++){
    data[i].draw(xoffset)
  xoffset = xoffset + parseFloat(data[i].productions);
  data[i].hover()

      }

      //display bees
      image(bee, beeX, beeY, 260, 260);
      image(bee2, bee2X, bee2Y, 400, 400);
      image(bee3, bee3X, bee3Y, 260, 260);

  //bee movement
  beeX += random(-5, 10);
  beeY += random(-5, 10);
  bee2X += random(-3, -3);
  bee2Y += random(-5, 5);
  bee3X += random(-2, 8);
  bee3Y += random(-5, 5);
 
  //title
  textSize(100);
  textAlign(CENTER, CENTER);
  fill('white');
  text("Honey Production in the US 2010", width/2, height/2);

}


function hexagon(x, y, radius, r,g,b) {
  fill(r, g, b);
  noStroke();
  angleMode(DEGREES);
  beginShape();
  for (let a = 60; a < 400; a += 60) {
    let vx = x + cos(a) * radius;
    let vy = y + sin(a) * radius;
    vertex(vx, vy);
  }
  endShape(CLOSE);

  }

 

  class DataPoint{
    constructor(state, colony_number, yield_per_colony, productions, average_price, value_of_prod, year,xposition){
      this.state = state;
      this.colony_number = colony_number;
      this.yield_per_colony = yield_per_colony;
      this.productions = productions;
      this.average_price =average_price;
      console.log(this.average_price);
      this.value_of_prod, year=value_of_prod, year;
      this.yposition = parseFloat(this.average_price)/100
      this.xposition = 0;
      this.r = 234;
      this.g = 136;
      this.b = 29;
      this.radius =parseFloat(this.productions);
    }
    draw(xposition){

      this.xposition = xposition;
      hexagon( this.xposition ,this.yposition,this.radius,this.r, this.g, this.b);

  }

  hover(){

  let d = dist(mouseX, mouseY, this.xposition,this. yposition); // calculate the dist between mouse and hexagon center
  if (d < this.radius) { // if the distance is less than the radius, mouse is hovering over the hexagon
    let xP = this.xposition;
    let yP = this.yposition; 

//display production data when hovered and hexagon become white
    textSize(40);
    textAlign(CENTER);
    fill('black');
    text(this.productions, xP, yP);
    this.r = 255;
    this.g = 255;
    this.b = 255;
    
//if not stay original color
  } else {
    this.r = 234;
    this.g = 136;
    this.b = 29;
  }
  }
 
}



///RESOURCES//

// https://editor.p5js.org/zapra/sketches/Hm43xfTxM
// https://www.kaggle.com/datasets/mohitpoudel/honey-production-in-us-20102021
// https://www.youtube.com/watch?v=u-RiEAQsXlw&t=1450s&ab_channel=weidi
// https://p5js.org/examples/image-load-and-display-image.html
// https://editor.p5js.org/enickles/sketches/KrA96VZaD
// https://editor.p5js.org/Cardenb/sketches/hQ-GRGulB