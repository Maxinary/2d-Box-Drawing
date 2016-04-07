var element = document.getElementById("game");
ctx = element.getContext("2d");
element.width = 300;
element.height = 300;
var blockSize = 1;
var blocks = [element.width/blockSize, element.height/blockSize];

var x = 0;
var interval = 0.01;
var ointerval = interval;
var specificity = 64;
var lis = [];
for(var i=0;i<2*Math.PI;i+=Math.PI/specificity){
  lis.push(Math.sin(i));
}

function sumSin(i,j){
  if(
    lis[Math.floor(i*(1.23*specificity/72*blockSize))%lis.length]+
    lis[Math.floor(j*(1.23*specificity/72*blockSize))%lis.length]>x
    ){
      return true;
    }else{
      return false;
    }
}

function draw(boolfunc){
  for(var i=0;i<blocks[0];i++){
    for(var j=0;j<blocks[1];j++){
      if(boolfunc(i,j)){
        ctx.fillStyle = "#000000";
      }else{
        ctx.fillStyle = "#FFFFFF";
      }
      ctx.fillRect(i*blockSize, j*blockSize, (i+1)*blockSize, (j+1)*blockSize);
    }
  }
}

var encoder = new GIFEncoder();
encoder.setRepeat(0);
encoder.setDelay(10);
encoder.start();
var count = 0;
setInterval(function(){
  if(count < 8/ointerval){
      x+=interval;
      if(Math.abs(x)>=2){
        interval *= -1;
      }
      draw(sumSin);
      encoder.addFrame(ctx);
      count++;
  }else{
    encoder.finish();
    var binary_gif = encoder.stream().getData(); //notice this is different from the as3gif package!
    var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
    console.log(data_url);
    window.location = data_url;
  }
},5);