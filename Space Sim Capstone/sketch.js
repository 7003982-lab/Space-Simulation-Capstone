// Space Sim Capstone
// Caleb Schwab, Adrian Chan
// December 1, 2025

// Global Variables

// Physics Constants
const G = 1;
let sunMass = 1;
let sunD = 200;

// Time
let dt = 1;
let timeBox = dt;
let timeSlider;

// Planet Textures
let sunT;
let mercuryT, venusT, earthT, marsT;
let jupiterT, saturnT, uranusT, neptuneT; 
let jupRingT, satRingT, uraRingT, nepRingT;

// Planets Array
let planets = [];

// Orbit 
let orbit = [];
let orbitCheckBox;

async function setup(){

  await loadAssets();
 
  const canvas = createCanvas(windowWidth*0.75, windowHeight, WEBGL);
  canvas.parent("canvas-container");
  angleMode(DEGREES);
  textureMode(NORMAL);
   
  //                      x,  d,    t,    angle, rotHr, ring
  planets.push(new Planet(39, 2.4, mercuryT, 0, 1408, 0)); // Mercury
  planets.push(new Planet(72, 6, venusT, 177.4, 5832, 0)); // Venus
  planets.push(new Planet(100, 6.3, earthT, -23.4, 24, 0)); // Earth
  planets.push(new Planet(152, 3.4, marsT, -25.2, 25, 0)); // Mars
  planets.push(new Planet(520, 70, jupiterT, -3, 10, 1)); // Jupiter
  planets.push(new Planet(954, 58, saturnT, -26.7, 11, 2)); // Saturn
  planets.push(new Planet(1922, 25, uranusT, 97.8, 17, 3)) // Uranus
  planets.push(new Planet(3007, 24, neptuneT, -28.3, 16, 4)) // Neptune
}

async function loadAssets(){ // Pre load textures
  // Planets
  sunT = await loadImage("assets/textures/sun.jpg");
  mercuryT = await loadImage("assets/textures/mercury.jpg");
  venusT = await loadImage("assets/textures/venus.jpg");
  earthT = await loadImage("assets/textures/earth.jpg");
  marsT = await loadImage("assets/textures/mars.jpg");
  jupiterT = await loadImage("assets/textures/jupiter.jpg");
  saturnT = await loadImage("assets/textures/saturn.jpg");
  uranusT = await loadImage("assets/textures/uranus.jpg");
  neptuneT = await loadImage("assets/textures/neptune.jpg");

  // Rings
  jupRingT = await loadImage("assets/textures/jupiterring.jpg");
  satRingT = await loadImage("assets/textures/saturnring.jpg");
  uraRingT = await loadImage("assets/textures/uranusring.jpg");
  nepRingT = await loadImage("assets/textures/neptunering.png");
}

function draw() {
  background(0);
  star(sunD);

  orbitControl(); // allows camera to orbit and move

  for(let o of planets){
    o.allFunction();
  }


  // Slider
  dt = document.getElementById("timeSlider").value;
  
  stroke("red"); //x-axis
  line(0,0,1000,0);
  stroke("blue");
  line(0,0,0,1000); //y-axis
  stroke("green");
  line(0,0,0,0,0,1000); //z-axis

  
}

// function addPlanet(){
  
// }

function mouseDragged(){  
  // Slider is dragged
  let sliderValue = document.getElementById("timeSlider").value
  document.getElementById("timeTextBox").value = sliderValue;
}

function keyPressed(){
  if(keyCode === 13){   // ENTER is pressed
    // Time
    timeBox = parseInt(document.getElementById("timeTextBox").value);
    timeBox = constrain(timeBox, -500, 500);
    document.getElementById("timeSlider").value = timeBox;
    document.getElementById("timeTextBox").value = timeBox;

    // Sun
    sunMass = parseInt(document.getElementById("sunMassText").value)
  }
}

function star(d){
  texture(sunT);
  noStroke();
  sphere(d, 100, 100);
}

// Credit: ChatGPT
function drawRing(innerR, outerR, tex, detail) {
  // angleMode(RADIANS);
  texture(tex);
  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i <= detail; i++) {
    let a = 360 * i / detail;
    let u = i / detail;

    vertex(cos(a) * outerR, 0, sin(a) * outerR, u, 0);
    vertex(cos(a) * innerR, 0, sin(a) * innerR, u, 1);
  }
  endShape(CLOSE);
}


class Planet{
  constructor(x,d,t,theta,rotHr,ring){
    this.x = x;
    this.d = d;
    this.t = t;
    this.theta = theta;
    this.rotHr = rotHr;
    this.ring = ring;
    
    this.pos = createVector(this.x + sunD, 0, 0); // vector for g calcs in x-axis
    let r = this.pos.mag();
    this.vel = createVector(0, 0, sqrt(G  * sunMass / r)); // ((G*m)/r)^1/2
    this.spin = 0;        // current rotation angle
    this.spinRate = (360/this.rotHr); 

    this.planetOrbit = [];
    this.maxOrbit = (2*PI*this.x);// /abs(dt/30);

    this.generateOrbit();
  }

  calcStar(){
    let r = this.pos.mag(); // sun to planet distance
    let accelMag = -G * sunMass / (r*r); // gravity acceleration
    this.acc = this.pos.copy().normalize().mult(accelMag); // force acting on planets
  }
 
  orbit(){ // adds planetary orbit trails 
    push();
    stroke(220);
    strokeWeight(1);
    noFill();

    beginShape();
    for (let p of this.planetOrbit) {
      vertex(p.x, 0, p.z);
    }
    endShape();

    pop();
  }

  updateOrbit(){
    this.planetOrbit.push(createVector(this.pos.x, 0, this.pos.z));
  
    if (this.planetOrbit.length > this.maxOrbit) {
      this.planetOrbit.shift();
    }
  }

  generateOrbit(){
    
    let angle = (atan2(this.pos.z, this.pos.x));
    this.planetOrbit = [];
    let vel = this.vel.copy();
    let pos = this.pos.copy();
    let r = pos.mag(); // sun to planet distance
    let accelMag = -G * sunMass / (r*r); // gravity acceleration
    let acc = pos.copy().normalize().mult(accelMag); // force acting on planets
    // while(angle<0 || angle>1){
    for(let i = 0; i<100; i++){
      vel.add(p5.Vector.mult(acc, -dt / 2));
      pos.add(p5.Vector.mult(vel, -dt));
      r = pos.mag(); // sun to planet distance
      accelMag = -G * sunMass / (r*r); // gravity acceleration
      acc = pos.copy().normalize().mult(accelMag); // force acting on planets
      vel.add(p5.Vector.mult(acc, -dt /2));
      this.planetOrbit.push(createVector(pos.x, 0, pos.z));
    }

  }

  move(dt){
    this.vel.add(p5.Vector.mult(this.acc, dt / 2));
    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.calcStar();
    this.vel.add(p5.Vector.mult(this.acc, dt /2));
  }



  display(){
    //stroke(150,150,180);
    push();
    translate(this.pos.x, 0, this.pos.z);

    // Axis tilt
    rotateZ(this.theta);

    // Spin (day/night)
    
    this.spin += this.spinRate *dt;
    rotateY(this.spin);

    noStroke();
    //fill(0);
    texture(this.t);
    sphere(this.d, 100, 100);


    // Ring Structures
    if(this.ring === 1){  // Jupiter
      push();
      drawRing(92, 226, jupRingT, 250)
      pop();
    }
    else if(this.ring === 2){  // Saturn
      push();
      drawRing(67, 137, satRingT, 250)
      pop();
    }
    else if(this.ring === 3){ // Uranus
      push();
      drawRing(37, 60, uraRingT, 200)
      pop();
    }
    else if(this.ring === 4){ // Neptune
      push();
      drawRing(41, 64, nepRingT, 200)
      pop();
    }


    //console.log(this.pos.x, this.pos.y)
    pop();
  }

 

  allFunction(){
    this.calcStar();
    this.move(-dt);
    this.display();
    //this.updateOrbit();
    if(document.getElementById("orbitCheckBox").checked){
      this.orbit();
    }
    
    

  }
  
}