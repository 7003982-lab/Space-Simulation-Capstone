// Space Sim Capstone
// Caleb Schwab, Adrian Chan
// December 1, 2025

// Global Variables
let G = 6.67e-11;
let sun;
let sunT;
let sunMass = 2e30;
let planets = [];
let sunD = 349;
// let cam;
// let camX = 0;
// let camY = 0;
// let camZ = 0;




function setup() {
  loadAssets();
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES)
  // planets.push(new Planet(57.9, 0, 2.4, 3.3e23)); // Mercury
  // planets.push(new Planet(108, 0, 6, 4.9e24)); // Venus
  // planets.push(new Planet(149, 0, 6.2, 5.97e24)); // Earth
  // planets.push(new Planet(227, 0, 3.4, 6.4e23)); // Mars
  planets.push(new Planet(778, 0, 71.5, 1.89e27)); // Jupiter
  // planets.push(new Planet(1429, 0, 60, 5.67e26)); // Saturn
}

async function loadAssets(){
  sunT = await loadImage("assets/sun/sun.jpg");
}

function draw() {
  background(0);
  star(0,0, sunD);
  orbitControl();
  push()
  scale(100);
  //model(sun);
  
  pop()
  
  for(let o of planets){
    o.allFunction();
  }
  stroke("red");
  line(0,0,1000,0);
  stroke("blue");
  line(0,0,0,1000);
  stroke("green");
  line(0,0,0,0,0,1000)
}

function star(x, y, d){
  //stroke(225, 180,50);
  noStroke();
  fill(0);
  texture(sunT);
  sphere(d);
  
}

class Planet{
  constructor(x,y,d,m){
    this.x = x;
    this.y = y;
    this.d = d;
    this.m = m;
    this.pos = createVector(this.x+ sunD, this.y);
    this.vel = createVector(0, (sqrt(G*sunMass/(this.x*10e13)))); // ((G*m)/r)^1/2
    this.gravForce = (((G*(this.m*sunMass))/(this.x*10e11)**2))
  }

  calcStar(){
    this.grav = createVector(0,0);
    this.grav.sub(this.pos);
    this.grav.normalize();
    this.grav.mult(this.gravForce/this.mass);
  }
 
  orbit(){
    strokeWeight(5);
    stroke(220);
    noFill();
    push();
    circle(0, 0, (this.x+sunD)*2);
    pop();
  }

 display(){
    stroke(150,150,180);
    fill(160,160,180);
    push();
    translate(this.pos.x,this.pos.y,0);
    sphere(this.d);
    //console.log(this.pos.x, this.pos.y)
    pop();
  }

  move(){
    this.vel.add(this.grav);
    this.pos.add(this.vel);
  }

  allFunction(){
    this.move();
    this.calcStar();
    this.display();
    this.orbit();
  }
  
}