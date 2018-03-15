function log(x){ console.log(x); }
var canvas = document.getElementById('can');
var c = canvas.getContext("2d");
c.fillStyle = "#FFBC67";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillRect(0,0,canvas.width,canvas.height);
// Variables
var mouseX;
var mouseY;
var back= "#fff";

var colors = [
  "#18CDCA",
  "#4F80E1",
  "#292C44",
  "#FF5349",
]

var minRadius = 4;
var maxRadius = 12;
var zoom = 20;
var senseMouse=60 ;
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
  this.sx = sx;
  this.sy = sy;
  this.radius=radius;
  this.color = colors[random(1,colors.length)];
  this._radius=radius;
  this.toSet=false;
  this.draw = function()
  {
    this.Update();
    if(this.distance()<senseMouse)
    {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.fillStyle = this.color;
    c.fill();
    }else {
      c.beginPath();
      c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
      c.fillStyle = "#d3d3d3";
      c.fill();
    }
  }
  this.Update = function (){
    if(this.x + this.radius > canvas.width || this.x - this.radius < 0)
    {
      this.sx = -this.sx;
    }
    if(this.y + this.radius > canvas.height || this.y - this.radius < 0)
    {
      this.sy = -this.sy;
    }
    if(this.distance()<senseMouse)
    {
      this.radius +=2;
      if(this.radius>= zoom)
      {
        this.radius=zoom;
      }
      if(this.toSet)
      {
        this.sx/=10;
        this.sy/=10;
        this.toSet=false;
      }
    }else{
      if(!this.toSet)
      {  this.sx*=6;
        this.sy*=6;
      this.toSet=true;
      }

      this.radius -=3;
      if(this.radius<this._radius)
      {
        this.radius=this._radius;
      }
    }

    this.x+=this.sx;
    this.y+=this.sy;
  }

  this.distance = function(){
    return Math.sqrt( Math.pow(this.x-mouseX,2) + Math.pow(this.y-mouseY,2) );
  }
}
var cirarr = []
function Init()
{
  cirarr = []
  for(var i=0;i<600;i++)
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
  for(var i=0;i<800;i++)
  {
      var cir = cirarr[i];
      cir.draw();
  }
}
Init();
animate();
