/**
Particle System
Hannah Kim
Theme: When you eat something and you have an allergic reaction
*/

// PRONG
let prong = []; //an empty array to store points
const num = 27;  //how many numbers of points to create
const startRad = 20; ///starting radius of the points
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
var speedBall = 0.9;  //speed that is it falling vertically

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
  palette = [color('white'),
                  color(186, 196, 219,200)];
  
  
  for (var i = 0; i < 200; i++) {
    particles.push(new Particle(0.1 + 1 * i, random(width), random(height), i * 1, i * random(30), palette[floor(random(2))]));
  }
  
}

function draw() {
  
    //PARTICLE: loop all particles and update position 
    for (var i = 0; i < particles.length; i++) {
      particles[i].move();
      particles[i].show(change);
    }


    //red ball
    speedBall += gravity;
  
    // Update ball position
    ballY += speedBall;
    
    // Draw the ball
    fill('orange');
    ellipse(ballX, ballY, ballSize, ballSize);

  
  //POINT: if animation not done, loop over points and update position
  if(!done) {
    prong.forEach(prong => {
      prong.update();
      prong.draw();
    });
    

  change += random(0.01);
  }
}

class Particle {
    constructor(radius, xpos, ypos, roughness, angle, color) {
      this.x = xpos;
      this.y = ypos;
      this.vx = random(-1, 1);
      this.vy = random(1, 0);
      this.radius = radius;
      this.roughness = roughness;
      this.angle = angle;
      this.color = color;
    }
  
  
  move() {

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width){
        this.vx  *= -1;
    }
if(this.y < 0 || this.y > height){
    this.vy *= -1;
}
  }

  show(change) {
    noStroke();
    fill(this.color);
    push();
    translate(this.x, this.y);
    rotate(this.angle + change);
    beginShape();
    for (var i = 0; i < TWO_PI; i += 0.2) {
      var r = this.radius + map(noise(1 + i/0.5, change), 0, 6, -this.roughness, this.roughness);
      vertex(r * sin(i), r * cos(i));
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
    prong.push(new Prong(random(width), random(height), random(), startRad));
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
    this.ang += random(-PI/5, PI/6); //random direction angle for points
    

    //travel in the direction of the angle
    this.x += cos(this.ang) * this.rad * speed; 
    this.y += sin(this.ang) * this.rad * speed;
  }
  
  draw() {
    //color of the reaction
    let startColor = color(55, 200, 255);
    let endColor = color('red');
    
    let col = lerpColor(startColor, endColor, map(this.rad, startRad, 0, 0, 1)); //thatll let the first color show and gradually change to end color using the map function
    fill(col);
    ellipse(this.x, this.y, this.rad * 1.5); //diameter of the burst
    
  }
}

///RESOURCES//
// https://medium.com/creative-coding-space/meet-blobby-in-p5-js-5d9d99232400
// https://www.youtube.com/watch?v=cHlhdhZuZuc&list=LL&index=13&t=12s&ab_channel=BarneyCodes
