// Space Sim Capstone
// Caleb Schwab, Adrian Chan
// December 1, 2025

// Global Variables
let G = 6.67e-11;
let sun;
planets = [];
// let cam;
// let camX = 0;
// let camY = 0;
// let camZ = 0;




function setup() {
  loadAssets();
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES)
  // planets.push(new Planet(580,0, 2.4)); // Mercury
  // planets.push(new Planet(-640,0, 6)); // Venus
  // planets.push(new Planet(750,0, 6.2)); // Earth
  // planets.push(new Planet(-1140,0, 3.4)); // Mars
  // planets.push(new Planet(1450,1450, 71.5)); // Jupiter
  planets.push(new Planet(-2121,-2121, 60, 5.67e26)); // Saturn
  // cam = createCamera();x
  // setCamera(cam);
}

async function loadAssets(){
  sun = await loadModel("assets/sun.obj");
}


function draw() {
  background(0);
  star(0,0, 349);
  orbitControl();
  model(sun);
  for(let o of planets){
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
  constructor(x,y,d,m){
    this.x = x;
    this.y = y;
    this.d = d;
    this.m = m;
    this.pos = createVector(this.x,this.y);
    this.vel = createVector((G*this.m/(this.x*10e11))^(1/2)), ((G*this.m/(this.y*10e11))^(1/2));
    this.grav = createVector(1, 50);
  }

  calcStar(){
    this.grav = createVector(0,0);
    this.grav.sub(this.pos);
    this.grav.normalize();
    this.grav.mult(1);
  }
 
  orbit(){
    strokeWeight(5);
    stroke(220);
    noFill();
    push();
    circle(0, 0, (this.x)*3);
    pop();
  }

 display(){
    stroke(150,150,180);
    fill(160,160,180);
    push();
    translate(this.pos.x,this.pos.y,0);
    sphere(this.d);
    console.log(this.pos.x, this.pos.y)
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