// Space Sim Capstone
// Caleb Schwab, Adrian Chan
// December 1, 2025

// Global Variables
let g;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES)
}

function draw() {
  background(0);
  star(0,0, 40);
  orbitControl()
}

function star(x, y, d){
  stroke(225, 180,50);
  fill(255,190,50);
  sphere(d);
}

class Planet{
  constructor(x,y,m){
    this.pos = createVector(x,y);
    this.vel = createVector(0);
    this.mass = m;
    
  }

  calcStar(){
    this.grav = createVector(width/2, height/2);
  }
}