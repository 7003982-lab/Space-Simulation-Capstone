// Space Sim Capstone
// Caleb Schwab, Adrian Chan
// December 1, 2025

// Global Variables
let g;
object = []
// let cam;
// let camX = 0;
// let camY = 0;
// let camZ = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES)
  object.push(new Planet(580,100, 2.4)); // Mercury
  object.push(new Planet(-640,100, 6)); // Venus
  object.push(new Planet(750,100, 6.2)); // Earth
  object.push(new Planet(-1140,100, 3.4)); // Mars
  object.push(new Planet(2050,100, 71.5)); // Jupiter
  object.push(new Planet(-3000,100, 60)); // Saturn
  // cam = createCamera();
  // setCamera(cam);
}

function draw() {
  background(0);
  star(0,0, 349);
  orbitControl()
  for(let o of object){
    o.allFunction();
  }
  pointLight(255,190,50, 0, 0, 0);
  // cam.setPosition(camX,camY,camZ);
  // if(keyIsDown(RIGHT_ARROW)){
  //   camX += 100;
  // }
}

function star(x, y, d){
  stroke(225, 180,50);
  fill(255,190,50);
  sphere(d);
}

class Planet{
  constructor(x,y,d){
    this.pos = createVector(x,y);
    this.vel = createVector(0);
    this.x = x;
    this.y = y;
    this.d = d;
    // this.mass = m;
    
  }

  // calcStar(){
  //   this.grav = createVector(width/2, height/2);
  // }

  display(){
    stroke(150,150,180)
    fill(160,160,180);
    push();
    translate(this.x,0,0);
    sphere(this.d)
    pop();
  }

  orbit(){
    strokeWeight(5);
    stroke(220);
    noFill();
    push();
    circle(0, 0, (this.x)*2);
    pop();
  }

  move(){

  }

  allFunction(){
    this.display();
    this.orbit();
  }
  
}