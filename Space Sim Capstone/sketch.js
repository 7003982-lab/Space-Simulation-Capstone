// Space Sim Capstone
// Caleb Schwab, Adrian Chan
// December 1, 2025

// Global Variables
let G = 1;
let sun;
let sunT;
let mercuryT;
let venusT;
let earthT;
let marsT;
let jupiterT;
let sunMass = 1;
let planets = [];
let sunD = 200;




async function setup() {
  await loadAssets();
  //frameRate(1);
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  planets.push(new Planet(39, 2.4, 3.3e23, mercuryT, 0)); // Mercury
  planets.push(new Planet(72, 6, 4.9e24, venusT, 0)); // Venus
  planets.push(new Planet(100, 6.3, 5.97e24, earthT, 0)); // Earth
  planets.push(new Planet(152, 3.4, 6.4e23, marsT, 0)); // Mars
  planets.push(new Planet(520, 70, 1.89e27, jupiterT, 0)); // Jupiter
  planets.push(new Planet(954, 58, 5.67e26, saturnT, 1)); // Saturn
}

async function loadAssets(){
  sunT = await loadImage("assets/textures/sun.jpg");
  mercuryT = await loadImage("assets/textures/mercury.jpg");
  venusT = await loadImage("assets/textures/venus.jpg");
  earthT = await loadImage("assets/textures/earth.jpg");
  marsT = await loadImage("assets/textures/mars.jpg");
  jupiterT = await loadImage("assets/textures/jupiter.jpg");
  saturnT = await loadImage("assets/textures/saturn.jpg");
  // uranusT = await loadImage("assets/textures/uranus.jpg");
  // neptuneT = await loadImage("assets/textures/neptune.jpg");
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
  constructor(x,d,m,t,ring){
    let r = this.pos.mag();
    this.x = x;
    this.d = d;
    this.m = m;
    this.t = t;
    this.ring = ring;
    this.pos = createVector(this.x + sunD, 0);
    this.vel = createVector(0, sqrt(G  * sunMass / r)); // ((G*m)/r)^1/2
    this.vel.limit(this.vl);
    
  }

  calcStar(){
    let r = this.pos.mag();
    let forceMag = -G * sunMass / (r*r);
    this.grav = this.pos.copy().normalize().mult(forceMag);
    // this.grav = createVector(0,0);
    // this.grav.sub(this.pos);
    // this.grav.normalize();
    // this.grav.mult(this.gravForce/this.mass);
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
    if(this.ring === 1){
      torus(137, 60, 24, 2)
    }
    //console.log(this.pos.x, this.pos.y)
    pop();
  }

  move(dt){
    this.vel.add(p5.Vector.mult(this.grav, dt));
    this.pos.add(p5.Vector.mult(this.vel, dt));
  }

  allFunction(){
    let dt = 0.01
    this.move(dt);
    this.calcStar();
    this.display();
    this.orbit();
  }
  
}