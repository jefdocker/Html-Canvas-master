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
  "#292C44",
  "#292C44",
  "#F0F0F1",
  "#18CDCA",
  "#4F80E1",
]

var minRadius = 4;
var maxRadius = 12;
var zooma= 60;
var zoomb= 40;
var senseMouse=60;
var rectarr = [];
var rectgroup = [];
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

function Rect(x,y,sx,sy,sidea,sideb,c)
{
  this.x = x;
  this.y = y;
  this.sx = sx;
  this.sy = sy;
  this.sidea=sidea;
  this.color =  colors[random(0,5)];
  this.sideb=sideb;
  this.a = sidea;
  this.b = sideb;
  this.index=0;
  this.draw = function()
  {
    this.Update();
    c.beginPath();
    c.rect(this.x,this.y,this.sidea,this.sideb,false);
    c.fill();
    c.stroke();
  }
  this.Update = function (){
    if(this.x + this.sidea > canvas.width || this.x - this.sidea < 0)
    {
      this.sx = -this.sx;
    }
    if(this.y + this.sideb > canvas.height || this.y - this.sideb < 0)
    {
      this.sy = -this.sy;
    }
    if(this.distance()<senseMouse)
    {

      this.sidea +=1;
      this.sideb +=1;
      if(this.sidea>= zooma)
      {
        this.sidea=zooma;
      }
      if(this.sideb>= zoomb)
      {
        this.sideb=zoomb;
      }
      c.fillStyle =this.color;
      c.strokeStyle = "#ff0000";
    }else{
      this.sidea -=1;
      this.sideb -=1;
      if(this.sidea<=this.a)
      {
        this.sidea=this.a;
        c.fillStyle = back;
      }
      if(this.sideb<=this.b)
      {
        this.sideb=this.b;
        c.fillStyle = back;
      }
    }

    if(this.distance()<(senseMouse+20))
    {
      if(this.index==0)
      {
        rectgroup.push(this);
        this.index=1;
      }
    }else {
      if(this.index==1)
      {
        rectgroup.pop(this);
        this.index=0;
      }
    }

    this.x+=this.sx;
    this.y+=this.sy;
  }

  this.distance = function(){
    return Math.sqrt( Math.pow(this.x-mouseX,2) + Math.pow(this.y-mouseY,2) );
  }
}

function Init()
{
  rectarr = []
  for(var i=0;i<100;i++)
  {
    var sidea = random(minRadius,maxRadius);
    var sideb = random(minRadius,maxRadius);
    var x = random(sidea,canvas.width-sidea);
    var y = random(sideb,canvas.height-sideb);
    var sx = random(-5,5)/5;
    var sy = random(-5,5)/5;
    if(sy==sx) sx-=1;

    var tmp = new Rect(x,y,sx,sy,sidea,sideb,c);
    rectarr.push(tmp);
  }
}

function Distance(x,y){
  return Math.sqrt( Math.pow(x-mouseX,2) + Math.pow(y-mouseY,2) );
}

function animate(){
  requestAnimationFrame(animate);
  c.fillStyle =back;
  c.fillRect(0,0,canvas.width,canvas.height);
  for(var i=0;i<rectarr.length;i++)
  {
      var cir = rectarr[i];
      cir.draw();
  }
  if(rectgroup.length!=0)
  {
    c.strokeStyle="#FF0000";
    c.beginPath();
    c.moveTo(mouseX,mouseY);
    c.lineTo(rectgroup[0].x,rectgroup[0].y);
    for(var k=1;k<rectgroup.length;k++)
    {
      if(Distance(rectgroup[k].x,rectgroup[k].y)>(senseMouse+20))
      {
        rectgroup.pop(k);
        continue;
      }

      c.moveTo(mouseX,mouseY);
       c.lineTo(rectgroup[k].x,rectgroup[k].y);

    }
    c.stroke();
  }
}

Init();
animate();
