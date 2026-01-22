// Space Sim Capstone
// Caleb Schwab, Adrian Chan
// December 1, 2025

// Global Variables
// Physics Constants  
const G = 1;

// Sun 
let sunMass = 1;
let sunR = 200;

// Planets
let merX = 39, venX = 72, earX = 100, marX = 152;
let jupX = 520, satX = 954, uraX = 1922, nepX = 3007;

// Time
let dt = 1;
let timeBox = dt;
let timeSlider;

// Planet Textures
let sunT;
let mercuryT, venusT, earthT, marsT;
let jupiterT, saturnT, uranusT, neptuneT;
let jupRingT, satRingT, uraRingT, nepRingT;

// Additional Planets Textures
let terrestrialT = [];
let gasT = [];

// Planets Array
let planets = [];
let terPlanets = [];
let gasPlanets = [];

// Orbit 
let orbit = [];
let orbitCheckBox;

async function setup() {
  await loadAssets();

  const canvas = createCanvas(windowWidth * 0.75, windowHeight, WEBGL);
  canvas.parent("canvas-container");
  angleMode(DEGREES);
  textureMode(NORMAL);

  pushPlanets();

  // Button
  let addTerButton = document.getElementById("addTer");
  let remTerButton = document.getElementById("remTer");
  let addGasButton = document.getElementById("addGas");
  let remGasButton = document.getElementById("remGas");

  let updateButton = document.getElementById("update");
  let resetButton = document.getElementById("reset");

  // Call function when button clicked
  addTerButton.addEventListener("click", addTerPlanet);
  remTerButton.addEventListener("click", removeAllTer);
  addGasButton.addEventListener("click", addGasPlanet);
  remGasButton.addEventListener("click", removeAllGas);

  updateButton.addEventListener("click", updateAll);
  resetButton.addEventListener("click", resetAll);
}

async function loadAssets() { // Pre load textures
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

  // Additional Planets
  for (let i = 0; i < 5; i++) {
    terrestrialT.push(await loadImage("assets/textures/terrestrial" + i + ".jpg"));
    gasT.push(await loadImage("assets/textures/gas" + i + ".jpg"));
  }

}

function draw() {
  background(0);

  star(sunR);

  orbitControl(); // allows camera to orbit and move

  // Existing Planets
  for (let p of planets) {
    p.allFunction();
  }

  // Additional Terrestrial Planets
  for (let t of terPlanets) {
    t.allFunction();
  }

  // Additional Gas Planets
  for (let g of gasPlanets) {
    g.allFunction();
  }

  // Time Slider
  dt = parseInt(document.getElementById("timeSlider").value);

  // Axis
  // stroke("red"); //x
  // line(0, 0, 1000, 0);
  // stroke("blue");
  // line(0, 0, 0, 1000); //y
  // stroke("green");
  // line(0, 0, 0, 0, 0, 1000); //z

}

function pushPlanets(){
  // Add planets to the planets array
  //                      x,  d,    t,    angle, rotHr, ring
  planets.push(new Planet(merX, 2.4, mercuryT, 0, 1408, 0)); // Mercury
  planets.push(new Planet(venX, 6, venusT, 177.4, 5832, 0)); // Venus
  planets.push(new Planet(earX, 6.3, earthT, -23.4, 24, 0)); // Earth
  planets.push(new Planet(marX, 3.4, marsT, -25.2, 25, 0)); // Mars
  planets.push(new Planet(jupX, 70, jupiterT, -3, 10, 1)); // Jupiter
  planets.push(new Planet(satX, 58, saturnT, -26.7, 11, 2)); // Saturn
  planets.push(new Planet(uraX, 25, uranusT, 97.8, 17, 3)); // Uranus
  planets.push(new Planet(nepX, 24, neptuneT, -28.3, 16, 4)); // Neptune
}

function updateAll(){
  // Update all variables in ui
  // Time
    timeBox = parseInt(document.getElementById("timeTextBox").value);
    timeBox = constrain(timeBox, -500, 500);
    document.getElementById("timeSlider").value = timeBox;
    document.getElementById("timeTextBox").value = timeBox;

    // Sun
    sunMass = parseInt(document.getElementById("sunMassText").value);
    sunMass = constrain(sunMass, 0, 50);
    document.getElementById("sunMassText").value = sunMass;

    // Mercury
    merX = parseInt(document.getElementById("merXText").value);
    merX = constrain(merX, 20, 500);
    document.getElementById("merXText").value = merX;
    if (planets[0].targetR !== merX) {
      planets[0].x = merX;
      planets[0].startTransfer(merX);
    }

    // Venus
    venX = parseInt(document.getElementById("venXText").value);
    venX = constrain(venX, 20, 500);
    document.getElementById("venXText").value = venX;
    if (planets[1].targetR !== venX) {
      planets[1].x = venX;
      planets[1].startTransfer(venX);
    }

    // Earth
    earX = parseInt(document.getElementById("earXText").value);
    earX = constrain(earX, 20, 500);
    document.getElementById("earXText").value = earX;
    if (planets[2].targetR !== earX) {
      planets[2].x = earX;
      planets[2].startTransfer(earX);
    }

    // Mars
    marX = parseInt(document.getElementById("marXText").value);
    marX = constrain(marX, 20, 500);
    document.getElementById("marXText").value = marX;
    if (planets[3].targetR !== marX) {
      planets[3].x = marX;
      planets[3].startTransfer(marX);
    }

    // Jupiter
    jupX = parseInt(document.getElementById("jupXText").value);
    jupX = constrain(jupX, 500, 3010);
    document.getElementById("jupXText").value = jupX;
    if (planets[4].targetR !== jupX) {
      planets[4].x = jupX;
      planets[4].startTransfer(jupX);
    }

    // Saturn
    satX = parseInt(document.getElementById("satXText").value);
    satX = constrain(satX, 500, 3010);
    document.getElementById("satXText").value = satX;
    if (planets[5].targetR !== satX) {
      planets[5].x = satX;
      planets[5].startTransfer(satX);
    }

    // Uranus
    uraX = parseInt(document.getElementById("uraXText").value);
    uraX = constrain(uraX, 500, 3010);
    document.getElementById("uraXText").value = uraX;
    if (planets[6].targetR !== uraX) {
      planets[6].x = uraX;
      planets[6].startTransfer(uraX);
    }

    // Neptune
    nepX = parseInt(document.getElementById("nepXText").value);
    nepX = constrain(nepX, 500, 3010);
    document.getElementById("nepXText").value = nepX;
    if (planets[7].targetR !== nepX) {
      planets[7].x = nepX;
      planets[7].startTransfer(nepX);
    }
}

function resetAll(){
  // Reset all variables
  removeAllTer();
  removeAllGas();

  document.getElementById("timeSlider").value = 1;
  document.getElementById("timeTextBox").value = 1;

  document.getElementById("orbitCheckBox").checked = false;

  sunMass = 1;
  document.getElementById("sunMassText").value = sunMass;

  merX = 39;
  document.getElementById("merXText").value = merX;

  venX = 72;
  document.getElementById("venXText").value = venX;

  earX = 100;
  document.getElementById("earXText").value = earX;

  marX = 152;
  document.getElementById("marXText").value = marX;

  jupX = 520;
  document.getElementById("jupXText").value = jupX;

  satX = 954;
  document.getElementById("satXText").value = satX;

  uraX = 1922;
  document.getElementById("uraXText").value = uraX;

  nepX = 3007;
  document.getElementById("nepXText").value = nepX;

  document.getElementById("terMText").value = 0.05;
  document.getElementById("terDText").value = 3;
  document.getElementById("terXText").value = 20;
  document.getElementById("terAText").value = 0;
  document.getElementById("terHrText").value = 20;

  document.getElementById("gasMText").value = 10;
  document.getElementById("gasDText").value = 15;
  document.getElementById("gasXText").value = 500;
  document.getElementById("gasAText").value = 0;
  document.getElementById("gasHrText").value = 5;

  planets = [];
  pushPlanets();
}

function addTerPlanet() {
  // Add terrestrial planets
  let terM = parseInt(document.getElementById("terMText").value);
  terM = constrain(terM, 0.05, 1.5);
  document.getElementById("terMText").value = terM;

  let terD = parseInt(document.getElementById("terDText").value);
  terD = constrain(terD, 3, 10);
  document.getElementById("terDText").value = terD;

  let terX = parseInt(document.getElementById("terXText").value);
  terX = constrain(terX, 20, 500);
  document.getElementById("terXText").value = terX;

  let terA = parseInt(document.getElementById("terAText").value);
  terA = constrain(terA, -180, 180);
  document.getElementById("terAText").value = terA;

  let terHr = parseInt(document.getElementById("terHrText").value);
  terHr = constrain(terHr, 20, 3000);
  document.getElementById("terHrText").value = terHr;

  if (terPlanets.length < 5) {
    terPlanets.push(new Planet(terX, terD, terrestrialT[terPlanets.length], terA, terHr, 0));
  }
}

function addGasPlanet() {
  // Add gas giants
  let gasM = parseInt(document.getElementById("gasMText").value);
  gasM = constrain(gasM, 10, 350);
  document.getElementById("gasMText").value = gasM;

  let gasD = parseInt(document.getElementById("gasDText").value);
  gasD = constrain(gasD, 15, 80);
  document.getElementById("gasDText").value = gasD;

  let gasX = parseInt(document.getElementById("gasXText").value);
  gasX = constrain(gasX, 500, 3000);
  document.getElementById("gasXText").value = gasX;

  let gasA = parseInt(document.getElementById("gasAText").value);
  gasA = constrain(gasA, -180, 180);
  document.getElementById("gasAText").value = gasA;

  let gasHr = parseInt(document.getElementById("gasHrText").value);
  gasHr = constrain(gasHr, 5, 20);
  document.getElementById("gasHrText").value = gasHr;

  if (gasPlanets.length < 5) {
    gasPlanets.push(new Planet(gasX, gasD, gasT[gasPlanets.length], gasA, gasHr, 0));
  }
}

function removeAllTer() {
  // Remove all user terrestrial planets
  terPlanets = [];
}

function removeAllGas() {
  // Remove all user gas giants
  gasPlanets = [];
}

function mouseDragged() {
  // Slider is dragged
  let sliderValue = document.getElementById("timeSlider").value
  document.getElementById("timeTextBox").value = sliderValue;
}

function star(r) {
  // Draw Sun
  texture(sunT);
  noStroke();
  sphere(r, 100, 100);
}

// Credit: ChatGPT
function drawRing(innerR, outerR, tex, detail) {
  // Draw 2D rings for gas giants
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


class Planet {
  constructor(x, d, t, theta, rotHr, ring) {
    this.x = x;
    this.d = d;
    this.t = t;
    this.theta = theta;
    this.rotHr = rotHr;
    this.ring = ring;

    this.pos = createVector(this.x + sunR, 0, 0); // vector for g calcs in x-axis
    let r = this.pos.mag();
    this.vel = createVector(0, 0, sqrt(G * sunMass / r)); // ((G*m)/r)^1/2

    this.spin = 0;        // current rotation angle
    this.spinRate = (360 / this.rotHr);

    this.planetOrbit = [];
    this.startAngle = atan2(this.pos.z, this.pos.x);
    this.dAngle = 0;
    this.totalAngle = 0;
    this.lastAngle = this.startAngle;

    this.maxOrbit = (2 * PI * this.x);// /abs(dt/30);
    //this.generateOrbit();

    this.transferState = false;
    this.targetR = this.x;
    this.transferSpeed = 0.02 * dt;
  }

  calcStar() {
    let r = this.pos.mag(); // sun to planet distance
    let accelMag = -G * sunMass / (r * r); // gravity acceleration
    this.acc = this.pos.copy().normalize().mult(accelMag); // force acting on planets
  }

  startTransfer(newR) {
    this.targetR = newR + sunR;
    this.transferState = true;
  }

  transferOrbitR() {
    // Smoothly moves planet to new orbit
    if (!this.transferState) return;

    let r = this.pos.mag();
    let dr = this.targetR - r;

    if (abs(dr) < 0.01) {
      this.transferState = false;
      let tangent = createVector(-this.pos.z, 0, this.pos.x).normalize();
      this.pos.set(p5.Vector.mult(this.pos.copy().normalize(), this.targetR));
      this.vel = p5.Vector.mult(tangent, sqrt(G * sunMass / this.targetR));
      return;
    }
    let radial = this.pos.copy().normalize();
    let maxSpeed = 0.01;
    let moveDist = constrain(dr, -maxSpeed * dt, maxSpeed * dt);
    this.pos.add(p5.Vector.mult(radial, moveDist));

    let speed = sqrt(G * sunMass / this.pos.mag());
    let tangent = createVector(-this.pos.z, 0, this.pos.x).normalize();
    this.vel = p5.Vector.mult(tangent, speed);
  }

  orbit() { // Adds planetary orbit trails 
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

  updateOrbit() {
    // Update orbit array
    let currentAngle = atan2(this.pos.z, this.pos.x);
    let dAngle = currentAngle - this.lastAngle;

    if(abs(dAngle) >1){
      if(abs(dt)>0){
      this.planetOrbit.push(createVector(this.pos.x, 0, this.pos.z));
      }
      this.lastAngle = currentAngle;
    }
    
    if (this.planetOrbit.length > 360) {
      this.planetOrbit.shift();
    }
  }


  move(dt) {
    this.vel.add(p5.Vector.mult(this.acc, dt / 2));
    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.calcStar();
    this.vel.add(p5.Vector.mult(this.acc, dt / 2));
  }



  display() {
    push();
    translate(this.pos.x, 0, this.pos.z);

    // Axis tilt
    rotateZ(this.theta);

    // Spin (day/night)
    this.spin += this.spinRate * dt;
    rotateY(this.spin);

    noStroke();
    //fill(0);
    texture(this.t);
    sphere(this.d, 100, 100);

    // Ring Structures
    if (this.ring === 1) {  // Jupiter
      push();
      drawRing(92, 226, jupRingT, 250)
      pop();
    }
    else if (this.ring === 2) {  // Saturn
      push();
      drawRing(67, 137, satRingT, 250)
      pop();
    }
    else if (this.ring === 3) { // Uranus
      push();
      drawRing(37, 60, uraRingT, 200)
      pop();
    }
    else if (this.ring === 4) { // Neptune
      push();
      drawRing(41, 64, nepRingT, 200)
      pop();
    }

    pop();
  }

  allFunction() {
    // All class methods in planets
    this.calcStar();
    this.transferOrbitR(dt);
    this.move(-dt);
    this.display();
    this.updateOrbit();
    if (document.getElementById("orbitCheckBox").checked) {
      this.orbit();
    }
  }

}