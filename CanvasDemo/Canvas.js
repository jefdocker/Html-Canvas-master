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
var back= "#D9E8F5";
var maxSize=30;
var colors = [
  "#FFBC67",
  "#DA727E",
  "#AC6C82",
  "#685C79",
  "#455C7B",
  "#13393D",
  "#204C57",
  "#478594",
]
var textarr = [];
var senseMouse = 220;
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
  }else {
    c.font="3px Verdana";
    c.fillStyle="#929292";
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
  "Java",
  "Python",
  "C#",
  "Django",
  "Ionic",
  "C++",
  "Php",
  "Asp.net",
  "Angular",
  "JSON",
  "Git",
  "Firebase",
  "Html",
  "Css",
  "Jquery",
  "Javascript",
  "Typescript",
  "Android",
  "Ios"
];

function Init()
{
  textarr = []
  for(var i=0;i<300;i++)
  {
    var text = texts[random(0,texts.length-1 )];
    var size = random(4,20);
    var x = random(size,canvas.width-size);
    var y = random(size,canvas.height-size);
    var sx = random(-1,2);
    var sy = random(-1,2);
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
