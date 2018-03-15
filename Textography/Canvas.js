function log(x){ console.log(x); }
var canvas = document.getElementById('can');
var c = canvas.getContext("2d");
c.fillStyle = "#fff";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillRect(0,0,canvas.width,canvas.height);
// Variables
var mouseX;
var mouseY;
var back= "#fff";
var maxSize=40;
var colors = [
  "#292C44",
  "#292C44",
  "#F0F0F1",
  "#18CDCA",
  "#4F80E1",
]
var textarr = [];
var senseMouse = 60;
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

function Text(text,size,x,y,sx,sy,c)
{
  this.x = x;
  this.y = y;
  this.sx = sx;
  this.sy = sy;
  this.size=size;
  this.color =  colors[random(0,5)];
  this.text = text;
  this.width = c.measureText(this.text).width;
  this.height = c.measureText(this.text).height;
  this._size=size;



  this.draw = function()
  {
    this.Update();
    if(this.distance()<senseMouse)
    {
    c.font=this.size+"px Verdana";
    c.fillText(this.text,this.x,this.y);
    }
  }

  this.Update = function (){
    if(this.x > canvas.width || this.x  < 0)
    {
      this.sx = -this.sx;
    }
    if(this.y > canvas.height || this.y < 0)
    {
      this.sy = -this.sy;
    }
    if(this.distance()<senseMouse)
    {
      c.fillStyle=this.color;
      this.size +=1;
      if(this.size>= maxSize)
      {
        this.size=maxSize;
      }

    }else{
      c.fillStyle=back;
      this.size -=1;
      if(this.size<=this._size)
      {
        this.size=this._size;
      }
    }

    this.x+=this.sx;
    this.y+=this.sy;
    log("x="+this.x+"   y="+this.y+"    sx="+this.sx+"     sy="+this.sy);
  }

  this.distance = function(){
    return Math.sqrt( Math.pow(this.x-mouseX,2) + Math.pow(this.y-mouseY,2) );
  }
}

var texts = [
  "Dilroop",
  "Aakash",
  "Parth",
  "Dilroop"
];

function Init()
{
  textarr = []
  for(var i=0;i<400;i++)
  {
    var text = texts[random(0,3)];
    var size = random(4,20);
    var x = random(size,canvas.width-size);
    var y = random(size,canvas.height-size);
    var sx = random(-5,5);
    var sy = random(-5,5);
    var tmp = new Text(text,size,x,y,sx,sy,c);
    textarr.push(tmp);
  }
}

function Distance(x,y){
  return Math.sqrt( Math.pow(x-mouseX,2) + Math.pow(y-mouseY,2) );
}

function animate(){
  requestAnimationFrame(animate);
  c.fillStyle =back;
  c.fillRect(0,0,canvas.width,canvas.height);
  for(var i=0;i<textarr.length;i++)
  {
      var txt = textarr[i];
      txt.draw();
  }
}

Init();
animate();
