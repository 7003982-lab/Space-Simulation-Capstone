// Space Sim Capstone
// Caleb Schwab, Adrian Chan
// December 1, 2025

// Global Variables

// Physics Constants
const G = 1;
const sunMass = 1;
let sunD = 200;

// Time
let dt = 100;
let timeBox;
let timeSlider;

// Planet Textures
let sunT;
let mercuryT;
let venusT;
let earthT;
let marsT;
let jupiterT;
let uranusT;
let neptuneT;
let satRingT;

// Planets Array
let planets = [];


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
  planets.push(new Planet(520, 70, jupiterT, -3, 10, 0)); // Jupiter
  planets.push(new Planet(954, 58, saturnT, -26.7, 11, 1)); // Saturn
  planets.push(new Planet(1922, 25, uranusT, 97.8, 17, 2)) // Uranus
  planets.push(new Planet(3007, 24, neptuneT, -28.3, 16, 0)) // Neptune
}

async function loadAssets(){ // Pre load planet textures
  sunT = await loadImage("assets/textures/sun.jpg");
  mercuryT = await loadImage("assets/textures/mercury.jpg");
  venusT = await loadImage("assets/textures/venus.jpg");
  earthT = await loadImage("assets/textures/earth.jpg");
  marsT = await loadImage("assets/textures/mars.jpg");
  jupiterT = await loadImage("assets/textures/jupiter.jpg");
  saturnT = await loadImage("assets/textures/saturn.jpg");
  uranusT = await loadImage("assets/textures/uranus.jpg");
  neptuneT = await loadImage("assets/textures/neptune.jpg");
  satRingT = await loadImage("assets/textures/saturnring.jpg");
  uranusRingT = await loadImage("assets/textures/uranusring.jpg");
}

function draw() {
  background(0);
  star(sunD);

  orbitControl(); // allows camera to orbit and move

  for(let o of planets){
    o.allFunction();
  }

  timeSlider = document.getElementById("timeSlider").value;
  dt = timeSlider;

  // timeBox = document.getElementById("timeBox").value;


  stroke("red"); //x-axis
  line(0,0,1000,0);
  stroke("blue");
  line(0,0,0,1000); //y-axis
  stroke("green");
  line(0,0,0,0,0,1000); //z-axis
}

// function addPlanet(){
  
// }

// function keyPressed(){
//   if(key === " "){
//     dt = timeBox;
//     timeSlider = timeBox;
//   }
// }

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
  }

  calcStar(){
    let r = this.pos.mag(); // sun to planet distance
    let accelMag = -G * sunMass / (r*r); // gravity acceleration
    this.acc = this.pos.copy().normalize().mult(accelMag); // force acting on planets
  }
 
  orbit(){ // adds planetary orbit trails 
    push();
    strokeWeight(2);
    stroke(220);
    line(this.pos.x, this.pos.y, this.pos.x+1, this.pos.y);
    pop();
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
    if(this.ring === 1){  // Saturn
      push();
      // rotateX(90);
      drawRing(67, 137, satRingT, 250)
      // texture(satRingT);
      // torus(137, 60, 100, 2)
      pop();
    }
    else if(this.ring === 2){ // Uranus
      push();
      drawRing(37, 60, uranusRingT, 200)
      // rotateX(90);
      // texture(satRingT);
      // torus(60, 23, 100, 2)
      pop();
    }


    //console.log(this.pos.x, this.pos.y)
    pop();
  }

 

  allFunction(){
    this.calcStar();
    this.move(-dt);
    this.display();
    //this.orbit();

  }
  
}