// Space Sim Capstone
// Caleb Schwab, Adrian Chan
// December 1, 2025

// Global Variables
const G = 1;
const sunMass = 1;
let dt = 50
let sun;
let sunT;
let mercuryT;
let venusT;
let earthT;
let marsT;
let jupiterT;
let uranusT;
let neptuneT;
let satRingT;
let planets = [];
let sunD = 200;
let gui;
let timeS;



async function setup() {
  await loadAssets();
  push(windowWidth*.8,0);
  createCanvas(windowWidth, windowHeight);
  fill(150);
  rect(windowWidth*0.8, windowHeight);
  pop();
  createCanvas(windowWidth*0.8, windowHeight, WEBGL);
  angleMode(DEGREES);
  gui = createGui();
  timeS = createSlider("Time Slider", 0, 0, 100, 20, -50, 200);
  
  //                      x,  d,    t,      ring
  planets.push(new Planet(39, 2.4, mercuryT, 0, 0)); // Mercury
  planets.push(new Planet(72, 6, venusT, 177.4, 0)); // Venus
  planets.push(new Planet(100, 6.3, earthT, -23.4, 0)); // Earth
  planets.push(new Planet(152, 3.4, marsT, -25.2, 0)); // Mars
  planets.push(new Planet(520, 70, jupiterT, -3, 0)); // Jupiter
  planets.push(new Planet(954, 58, saturnT, -26.7, 1)); // Saturn
  planets.push(new Planet(1922, 25, uranusT, 97.8, 2)) // Uranus
  planets.push(new Planet(3007, 24, neptuneT, -28.3, 0)) // Neptune
}

async function loadAssets(){
  sunT = await loadImage("assets/textures/sun.jpg");
  mercuryT = await loadImage("assets/textures/mercury.jpg");
  venusT = await loadImage("assets/textures/venus.jpg");
  earthT = await loadImage("assets/textures/earth.jpg");
  marsT = await loadImage("assets/textures/mars.jpg");
  jupiterT = await loadImage("assets/textures/jupiter.jpg");
  saturnT = await loadImage("assets/textures/saturn.jpg");
  uranusT = await loadImage("assets/textures/uranus.jpg");
  neptuneT = await loadImage("assets/textures/neptune.jpg");
  satRingT = await loadImage("assets/textures/saturnring2.jpg");
}

function draw() {
  background(0);
  star(sunD);
  orbitControl();
  push();
  scale(100);
  
  pop();
  drawGui();
  for(let o of planets){
    o.allFunction();
  }

  stroke("red"); //x-axis
  line(0,0,1000,0);
  stroke("blue");
  line(0,0,0,1000); //y-axis
  stroke("green");
  line(0,0,0,0,0,1000); //z-axis
}

function star(d){
  //stroke(225, 180,50);
  noStroke();
  fill(0);
  texture(sunT);
  sphere(d, 100, 100);
  
}

class Planet{
  constructor(x,d,t,theta,ring){
    this.x = x;
    this.d = d;
    this.t = t;
    this.theta = theta;
    this.ring = ring;
    this.pos = createVector(this.x + sunD, 0, 0);
    let r = this.pos.mag();
    this.vel = createVector(0, 0, sqrt(G  * sunMass / r)); // ((G*m)/r)^1/2
  }

  calcStar(){
    let r = this.pos.mag();
    let accelMag = -G * sunMass / (r*r);
    this.acc = this.pos.copy().normalize().mult(accelMag);
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
    rotateX(90);
    circle(0, 0, (this.x+sunD)*2);
    pop();
  }

  // rotation(dt){
  //   rotateZ();
  // }

  display(){
    //stroke(150,150,180);
    push();
    translate(this.pos.x, 0, this.pos.z);
    rotateZ(this.theta);

    noStroke();
    //fill(0);
    texture(this.t);
    sphere(this.d, 100, 100);


    // Ring Structures
    if(this.ring === 1){  // Saturn
      push();
      rotateX(90);
      texture(satRingT);
      torus(137, 60, 100, 2)
      pop();
    }
    else if(this.ring === 2){ // Uranus
      push();
      rotateX(90);
      texture(satRingT);
      torus(60, 23, 100, 2)
      pop();
    }


    //console.log(this.pos.x, this.pos.y)
    pop();
  }

  move(dt){
    this.vel.add(p5.Vector.mult(this.acc, dt / 2));
    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.calcStar();
    this.vel.add(p5.Vector.mult(this.acc, dt /2));
  }

  allFunction(){
    this.calcStar();
    this.move(-dt);
    this.display();
    // this.orbit();
    // this.rotation(-dt);
  }
  
}