// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
var senseMouse=120;
// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Utility Functions
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor() {
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    //return "#939393"
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Objects
function Snake(x, y, color) {
    this.x = x;
    this.y = y;
    this._x = x;
    this._y = y;
    this.radius = random(2,3);
    this.color = color;
    this.toSet=true;
    this.sw = random(1,2);
    this.speed = random(2,6);
    this.maxwidth=3 ;
    this.special=false;
    this.minwidth = this.sw;
    this.radian = random(0,Math.PI*4);
}

function Change(snake)
{
  snake.radian += Math.random()-0.5;
  var time = random(50,100);
  snake.toSet = false;
  setTimeout(function(){ snake.toSet = true; }, time);
}

Snake.prototype.update = function()
{
    this.draw();
    if(this.toSet)
    {
      Change(this);
    }
    this._x=this.x;
    this._y=this.y;
    this.x = this.x + Math.cos(this.radian) *this.speed;//* this.radius ;
    this.y = this.y + Math.sin(this.radian) *this.speed ;//* this.radius ;
    if(this.x > canvas.width || this.x < 0 || this.y < 0 || this.y > canvas.height )
    {
      remove(objects, this);
      AddRandomSnake();
    }

    if(distance(mouse.x,mouse.y,this.x,this.y)<senseMouse)
    {
      this.sw+=Math.random();
      if(this.sw>this.maxwidth)
      {
        this.sw=this.maxwidth;
      }
    }else {
      this.sw-=Math.random();
      if(this.sw<this.minwidth)
      {
        this.sw=this.minwidth;
      }
    }

}

function remove(array, element) {
    const index = array.indexOf(element);
    console.log("removed snake "+index);
    array.splice(index, 1);
}

Snake.prototype.draw = function() {

    c.beginPath();
    c.lineCap="round";
    c.lineWidth = this.sw;
    c.strokeStyle=this.color;
    c.moveTo(this._x,this._y);
    c.lineTo(this.x,this.y);
    c.stroke();

}

// Implementation
let objects;
function init() {
    objects = []

    for (let i = 0; i < 100; i++) {
      var x = mouse.x;
      var y = mouse.y;
      var color = "#939393"
        let s = new Snake(x,y,color);
        objects.push(s);
    }
    objects[random(0,100)].color="#ff0000"
}

function AddRandomSnake()
{
  console.log("Added Snake");
  var x = random(0,canvas.width);
  var y = random(0,canvas.height);
  var color = randomColor();
  let s = new Snake(x,y,color);
  objects.push(s);

}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)

    objects.forEach(object => {
     object.update();
    });
}

init()
animate()
