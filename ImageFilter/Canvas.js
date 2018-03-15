var inc = 2;
var c = document.getElementById("myCanvas");

var ctx = c.getContext("2d");
var img = document.getElementById("scream");
c.width = img.width;
c.height = img.height;
ctx.drawImage(img, 0, 0);
var imgData = ctx.getImageData(0, 0, c.width, c.height);
var i;
ctx.putImageData(imgData, 0, 0);
var pixel=[];
for (i = 0; i < imgData.data.length; i += 4) {
    var rgb = +imgData.data[i]+","+imgData.data[i+1]+","+imgData.data[i+2];
    if(!pixel.includes(rgb))
    {
      pixel.push(rgb);
    }
   //  var temp=imgData.data[i]+imgData.data[i+1]+imgData.data[i+2];
   //  temp/=3;
   //  if(color(imgData.data[i],imgData.data[i+1],imgData.data[i+2],60)==0)
   //  {
   //
   //  }else{
   //    imgData.data[i] =  temp;
   //    imgData.data[i+1] = temp;
   //    imgData.data[i+2] = temp;
   // }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loopx(no)
{
  var rgb=[];
  for(var i=0;i<no;i++)
  {
    rgb.push(pixel[random(0,pixel.length-1)]);
  }
  console.log(rgb);

  ctx.drawImage(img, 0, 0);
  var imgData = ctx.getImageData(0, 0, c.width, c.height);
  for (i = 0; i < imgData.data.length; i += 4)
  {
      var rgbx = imgData.data[i]+","+imgData.data[i+1]+","+imgData.data[i+2];
      var temp=imgData.data[i]+imgData.data[i+1]+imgData.data[i+2];
      temp/=3;

      var isSame=false;
      if(rgb.includes(rgbx))
      {
        isSame = true
      }
      if(!isSame)
      {
        imgData.data[i] =  temp;
        imgData.data[i+1] = temp;
        imgData.data[i+2] = temp;
      }

  }

  ctx.putImageData(imgData, 0, 0);
}




function process(xx)
{
  return (xx / inc);
};

function color(r,g,b,f)
{
  if(r>g+f && r>b+f)
  {
    return 1;
  }else if(g>r+f && g>b+f)
  {
    return 2;
  }else if (b>r+f && b>g+f)
  {
      return 3;
  }else {
    return 0;
  }
};

function timer(){
setTimeout(function(){
    loopx(random(1,3));
    timer();
},100);
}
timer();
