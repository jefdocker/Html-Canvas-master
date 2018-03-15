function log(x){ console.log(x); }
var canvas = document.getElementById('can');
var c = canvas.getContext("2d");
c.fillStyle = "#ffffffff";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillRect(0,0,canvas.width,canvas.height);
c.fillRect(0,0,canvas.width,canvas.height);
// Variables
var mouseX;
var mouseY;
var back= "#ffffff11";

var colors = [
  "#46B29D",
  "#F0CA4D",
  "#E37B40",
  "#F53855",
  "#4D4CFF"
]

var minRadius = 2;
var maxRadius = 5;
var zoom = 40;
var senseMouse=100;
// Events
window.addEventListener('mousemove', function (event){
  mouseX = event.x;
  mouseY = event.y;
});

window.addEventListener('resize', function (event){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  Init()
});

// Functions
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Circle(x,y,sx,sy,radius,c)
{
  this.x = x;
  this.y = y;
  this._x = x;
  this._y = y;
  this.sx = sx;
  this.sy = sy;
  this.radius=radius;
  this.color = colors[random(1,colors.length)];
  this._radius=radius;
  this.velocity = 0.06;
  this.radians=Math.random()*Math.PI*2;
  this.factorRound = random(60,100);
  this.draw = function()
  {
    this.Update();
    c.beginPath();
    c.moveTo(this._x,this._y);
    c.lineTo(this.x,this.y);
    // c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.lineWidth=this.radius;
    c.strokeStyle = this.color;
    c.stroke();
  }
  this.Update = function ()
  {
    this.radians +=this.velocity;
    this._x=this.x;
    this._y=this.y;
    this.x = Math.cos(this.radians) * this.factorRound + mouseX ;
    this.y = Math.sin(this.radians) * this.factorRound + mouseY ;

  }

  this.distance = function(){
    return Math.sqrt( Math.pow(this.x-mouseX,2) + Math.pow(this.y-mouseY,2) );
  }
}

var cirarr = []
function Init()
{
  cirarr = []
  for(var i=0;i<80;i++)
  {
    var radius = random(minRadius,maxRadius);
    var x = random(radius,canvas.width-radius);
    var y = random(radius,canvas.height-radius);
    var sx = random(-2,2);
    var sy = random(-2,2);
    if(sy==sx) sx-=1;

    var tmp = new Circle(x,y,sx,sy,radius,c);
    cirarr.push(tmp);
  }
}

function animate(){
  requestAnimationFrame(animate);
  c.fillStyle =back;
  c.fillRect(0,0,canvas.width,canvas.height);
  for(var i=0;i<cirarr.length;i++)
  {
      var cir = cirarr[i];
      cir.draw();
  }
}
Init();
animate();
