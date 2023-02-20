/**
Particle System
Hannah Kim
Theme: When you eat something and you have an allergic reaction
*/

// PRONG
let prong = []; //an empty array to store points
const num = 27;  //how many numbers of points to create
const radius = 20; ///starting radius of the points
const speed = 0.2;  //constant set of speed of the points
let done = false;   //track burst animation if it is done or not

//PARTICLES
var particles = [];  //store particles, color change and color palette
var change;
var palette;


//BALL
var ballX, ballY;
var ballSize = 80; //ball size
var gravity = 0.01; //gravity of the ball
var speedB = 0.9;  //speed that is it falling vertically

function setup() {
  createCanvas(3000, 3000);
  background('black');


  //BALL location
  ballX = width/2;
  ballY = 0;
  

  //PRONG
  noStroke();
  createReaction();
  
  //PARTICLES
  change = 30;
  palette = [color('white'), color(186, 196, 219,100)];
  
  
  for (var i = 0; i < 150; i++) { //creating x number of particles
    particles.push(new Particle(0.1 + 1 * i, random(width), random(height), i * 2, i * random(30), palette[floor(random(2))]));
  }
  
}

function draw() {
  
    //PARTICLE: loop all particles and update position 
    for (var i = 0; i < particles.length; i++) {
      particles[i].move();
      particles[i].show(change);
    }


    //ball falling
    speedB += gravity;
  
    // Update ball position
    ballY += speedB;
    
    // Draw the ball
    fill('orange');
    ellipse(ballX, ballY, ballSize, ballSize);

  
  //PRONG: if animation not done, loop over points and update position
  if(!done) {
    prong.forEach(prong => {
      prong.update();
      prong.draw();
    });

  change += random(-0.02);
  }
}

class Particle {
    constructor(radius, xpos, ypos, roughness, angle, color) {   ///characteristics of particles
      this.x = xpos;
      this.y = ypos;
      this.vx = random(-1, 1);
      this.vy = random(1, 0);
      this.radius = 2;
      this.roughness = roughness;
      this.angle = random(0, 10);
      this.color = color;
    }
  
  
  move() {  //tells the shape how to move by telling how to change position and make it stay within the canvas
    this.x += this.vx;
    this.y += this.vy;
  }

  show(change) {  //showing the shapes on screen 
    noStroke();
    push();
    fill(this.color);
    translate(this.x, this.y);
    rotate( change);
    beginShape();
    for (var i = 0; i < TWO_PI; i += 0.2) { //vertex points
      var r = this.radius + map(noise(1 + i/0.5, change), 0, 6, -this.roughness, this.roughness);
      var x = r * sin(i);
      var y = r * cos(i);
      vertex(x, y);
    } 
    endShape();
    pop();
  }
}

//CREATING THE ALLERGIC REACTION
function createReaction() {
  background('black');
  done = false;
  prong = [];
  
  for(let i = 0; i < num; i ++) {
    prong.push(new Prong(random(width), random(height), random(), radius));
  }
}

class Prong {
  constructor(x, y, ang, rad) {
    this.x = x;
    this.y = y;
    this.ang = ang;
    this.rad = rad;
  }
  
  update() {
    this.rad -= 0.1;
    this.ang += random(-PI/5, PI/5); //random direction angle for points
    

    //travel in the direction of the angle
    this.x += sin(this.ang) * this.rad * speed; 
    this.y += cos(this.ang) * this.rad * speed;
  }
  
  draw() {
    //color of the reaction
    let startColor = color(55, 200, 255);
    let endColor = color('red');
    
    let col = lerpColor(startColor, endColor, map(this.rad, radius, 0, 0, 1)); //thatll let the first color show and gradually change to end color using the map function
    fill(col);
    ellipse(this.x, this.y, this.rad * 1.5); //diameter of the burst
    
  }
}

///RESOURCES//
// https://medium.com/creative-coding-space/meet-blobby-in-p5-js-5d9d99232400
//https://github.com/playgrdstar/p5_blob/blob/master/sketch.js
// https://www.youtube.com/watch?v=cHlhdhZuZuc&list=LL&index=13&t=12s&ab_channel=BarneyCodes
// https://www.youtube.com/watch?v=Kp070rI_G48&ab_channel=Mr.Erdreich
