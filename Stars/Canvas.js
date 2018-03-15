function log(x) {
  console.log(x);
}
var canvas = document.getElementById('can');
var c = canvas.getContext("2d");
canvas.width = window.innerWidth * 3;
canvas.height = window.innerHeight * 3;

var grd = c.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width, canvas.height, 9000);
grd.addColorStop(0, "#00057c");
grd.addColorStop(0.092, "#000121");
grd.addColorStop(1, "#0097b2");



var centerx = canvas.width / 2;
var centery = canvas.height / 2;
var lx = canvas.width / 3;
var ly = canvas.height / 3;


// Variables
var mouseX;
var mouseY;

var colors = [
  "#ffffff",
  "#00ffff",
  "##ffff00",
  "#00ffff",
  "#ffffff"
]

// Events
window.addEventListener('mousemove', function(event) {
  mouseX = event.x;
  mouseY = event.y;
});

window.addEventListener('resize', function(event) {
  canvas.width = window.innerWidth * 3;
  canvas.height = window.innerHeight * 3;
  centerx = canvas.width / 2;
  centery = canvas.height / 2;
  lx = canvas.width / 3;
  ly = canvas.height / 3;
  grd = c.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width, canvas.height, 9000);
 grd.addColorStop(0, "#00057c");
 grd.addColorStop(0.1, "#000121");
 grd.addColorStop(1, "#0097b2");
  Init()
});

// Functions
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomcolor() {
  return colors[random(0, colors.length - 1)];
}

function Star(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.r = radius - Math.random();
  this._r = radius;
  this.f = -0.1;;
  this.draw = function() {
    c.shadowBlur = 20;
    c.shadowColor = "white";
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fill();
    c.fill();
    c.fill();
    this.update();
  }

  this.update = function() {
    this.radius += this.f;

    if (this.radius < this.r) {
      this.radius = this.r;
      this.f = -this.f;
    } else if (this.radius > this._r) {
      this.radius = this._r;
      this.f = -this.f;
    }
  }

  this.distance = function(x, y) {
    return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
  }
}

var objects = []
var noOfObjects = 380;
var minRadius = 1;
var maxRadius = 2;
var senseMouse = 100;

function Init() {
  objects = []
  for (var i = 0; i < noOfObjects; i++) {
    var radius = random(minRadius, maxRadius);
    var x = random(0, canvas.width);
    var y = random(0, canvas.height);
    var color = randomcolor(); //"#fff";

    var tmp = new Star(x, y, radius, color);

    var dist = tmp.distance(centerx, centery);
    if (dist > lx/2 ) {
      console.log("###")
      i--;
      continue;
    }

    var valid = true;

    if (i > 1) {
      for (var j = 0; j < objects.length - 1; j++) {
        var dist = tmp.distance(objects[j].x, objects[j].x);
        if (dist < 10) {
          valid = false;
          console.log(">>")
          break;
        }
      }
    }

    if (valid) {
      objects.push(tmp);
    } else {
      i--;
    }

  }

  c.translate(-lx, -ly);
}




var rotation = 0.2;

function animate() {
  requestAnimationFrame(animate);

  c.fillStyle = grd;
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.translate(lx * 1.5, ly * 1.5);
  c.rotate(rotation * Math.PI / 180);
  c.translate(-lx * 1.5, -ly * 1.5);

  for (var i = 0; i < objects.length; i++) {
    var obj = objects[i];
    obj.draw();
  }

}

Init();
animate();
