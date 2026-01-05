// Space Sim Capstone
// Caleb Schwab, Adrian Chan
// December 1, 2025

// Global Variables
let G = 6.67e-11;
let sun;
let sunT;
let mercuryT;
let venusT;
let earthT;
let marsT;
let jupiterT;
let sunMass = 2e30;
let planets = [];
let sunD = 350
;




async function setup() {
  await loadAssets();
  //frameRate(1);
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  planets.push(new Planet(57.9, 0, 2.4, 3.3e23, 20, mercuryT)); // Mercury
  planets.push(new Planet(108, 0, 6, 4.9e24, 20, venusT)); // Venus
  planets.push(new Planet(149, 0, 6.3, 5.97e24, 20, earthT)); // Earth
  planets.push(new Planet(227, 0, 3.4, 6.4e23, 20, marsT)); // Mars
  planets.push(new Planet(778, 0, 70, 1.89e27, 30, jupiterT)); // Jupiter
  planets.push(new Planet(1429, 0, 58, 5.67e26, 60, mercuryT)); // Saturn
}

async function loadAssets(){
  sunT = await loadImage("assets/textures/sun.jpg");
  mercuryT = await loadImage("assets/textures/mercury.jpg");
  venusT = await loadImage("assets/textures/venus.jpg");
  earthT = await loadImage("assets/textures/earth.jpg");
  marsT = await loadImage("assets/textures/mars.jpg");
  jupiterT = await loadImage("assets/textures/jupiter.jpg");
}

function draw() {
  background(0);
  star(0,0, sunD);
  orbitControl();
  push();
  scale(100);
  
  pop();
  
  for(let o of planets){
    o.allFunction();
  }

  stroke("red");
  line(0,0,1000,0);
  stroke("blue");
  line(0,0,0,1000);
  stroke("green");
  line(0,0,0,0,0,1000);
}

function star(x, y, d){
  //stroke(225, 180,50);
  noStroke();
  fill(0);
  texture(sunT);
  sphere(d);
  
}

class Planet{
  constructor(x,y,d,m,vl,t){
    this.x = x;
    this.y = y;
    this.d = d;
    this.m = m;
    this.t = t;
    this.vl = vl;
    this.pos = createVector(this.x+ sunD, this.y);
    this.vel = createVector(0, (sqrt(G*sunMass/(this.x*10e13)))); // ((G*m)/r)^1/2
    this.gravForce = (((G*(this.m*sunMass))/((this.x*10e11)**2)))
    this.vel.limit(this.vl);
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
    //stroke(150,150,180);
    
    push();
    translate(this.pos.x,this.pos.y,0);
    noStroke();
    //fill(0);
    texture(this.t);
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