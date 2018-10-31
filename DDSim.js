var canvas;
var imageRoad;
var imageCar;
function setup() {
  canvas = createCanvas(800, 600);
  imageRoad = loadImage('road.png');
  imageCar = loadImage('car.png');
}

function draw() {
  background(80, 120, 80);
  var light = false;
  var switchColors = 0;
  for (var i = 0; i < height/2; i++) {
    noStroke();
    if (light) fill(150, 150, 150);
    else fill(130, 130, 130);
    switchColors++;
    if (switchColors > 15) {
      light = !light;
      switchColors = 0;
    }
    rect(width/2-(width/4/2)-i, 0+i*2, width/4 + i*2, 2);
//    image(imageRoad.get(0, 0, 200, 2), width/2-(width/4/2)-i, 0+i*2, width/4 + i*2, 2+i*2);
    var dx = width/2-(width/4/2) - i;
    var dy = 0+i*2;
    var dW = (width/4) + i*2;
    var dH = 2;
    var sx = 0;
    var sy = (0+i)/1.5;
    var sW = 200;
    var sH = 2;
    image(imageRoad, dx, dy, dW, dH, sx, sy, sW, sH); 
  }
  fill(100, 100, 200);
  rect(0, 0, width, height / 2);
  fill(0, 0, 0);
  rect(0, (height / 2) - 2, width, 4)
  image(imageCar, 0, 0);
  
  fill(255, 255, 255);
  textSize(25);
  text("Score: ", (width/3)*2, (height/5)*1);
  
  fill(0, 255, 0);
  textSize(15);
  text("Test v1.0", 15, 25);
}
