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
var distort=false;

var colors = [
  "#18CDCA",
  "#4F80E1",
  "#292C44",
  "#FF5349",
];
var o1 = document.getElementById("Dil");
var o2 = document.getElementById("Aakash");

var Images = [
   o1,o2
];


var pixels = [];

var counter=0;
var canvas2 = document.createElement('canvas');
var context = canvas2.getContext('2d');
var img = document.getElementById('Dil');
img.setAttribute('crossOrigin', '');
canvas2.width = img.width;
canvas2.height = img.height;
var Iw=img.width;
var Ih=img.height;
context.drawImage(img, 0, 0 );
for(var i=0;i<canvas2.height;i++)
{
  for(var j=0;j<canvas2.width;j++)
  {
    var rgba  =context.getImageData(j, i, 1, 1).data;
    pixels[counter] = rgbaToHex("rgba("+rgba[0]+","+rgba[1]+","+rgba[2]+","+rgba[3]+")");
    counter++;
  }
}

console.log(pixels);

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

function trim(str) {
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

function rgbaToHex (rgba) {
    var parts = rgba.substring(rgba.indexOf("(")).split(","),
        r = parseInt(trim(parts[0].substring(1)), 10),
        g = parseInt(trim(parts[1]), 10),
        b = parseInt(trim(parts[2]), 10),
        a = parseFloat(trim(parts[3].substring(0, parts[3].length - 1))).toFixed(2);

    return ('#' + r.toString(16) + g.toString(16) + b.toString(16));
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Circle(x,y,sx,sy,radius,color,c)
{
  this.x = x;
  this.y = y;
  this._x=x;
  this._y=y;
  this.sx = sx;
  this.sy = sy;
  this.radius=radius;
  this.color = color;
  this._radius=radius;
  this.lastDistance =0;
  this.draw = function()
  {
      this.Update();
      c.beginPath();
      c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
      c.fillStyle = this.color;
      c.fill();
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

    if(!distort)
    {
      var dis =this.distance();
      if(dis>2)
      {
        var dx = this._x-this.x;//this._x>this.x?this._x-this.x:this.x-this._x;
        var dy = this._y-this.y;//this._y>this.y?this._y-this.y:this.y-this._y;
        var angle = Math.atan2(dy,dx);
        var magnitude =1;
        this.sx = Math.cos(angle) * magnitude;
        this.sy = Math.sin(angle) * magnitude;
        this.x+=this.sx;
        this.y+=this.sy;
        this.lastDistance=dis;
      }else {
        this.x = this._x;
        this.y = this._y;
      }
    }else {
      this.x+=this.sx;
      this.y+=this.sy;
    }

  }

  this.distance = function(){
    return Math.sqrt( Math.pow(this.x-this._x,2) + Math.pow(this.y-this._y,2) );
  }
}
var cirarr = []
// 0 0 0 0 0
// 0 0 0 0 0
// 0 0 0 0 0
25/8
function Init()
{
  cirarr = []
  var radius = 3;
  var startx = ( canvas.width - (radius * Iw *2))/2;
  var starty = ( canvas.height - (radius * Ih *2))/2;
  for(var i=0;i<pixels.length;i++)
  {
    var x = i%Iw * (2*radius) + startx;
    var y = Math.floor(i/Iw)*(2*radius)+ starty;
    var sx = (Math.random()-0.5)*3;
    var sy = (Math.random()-0.5)*3;
    if(sy==sx) sx-=1;

    var tmp = new Circle(x,y,sx,sy,radius,pixels[i],c);
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
setTimeout(function(){ distort=true; }, 1000);
setTimeout(function(){ distort=false; }, 40000);
