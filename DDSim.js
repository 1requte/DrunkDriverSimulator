var canvas;
var imageRoad;
var imageCar;
function setup() {
  canvas = createCanvas(800, 600);
//Indlæser billedfilerne 
  imageRoad = loadImage('road.png');
  imageCar = loadImage('car.png');
}

function draw() {
//Tegner baggrund (græsset)
  background(80, 120, 80);
//Looper igennem halvdelen af højdens pixels (halvdelen, fordi billedet bliver indlæst 800x2 pixels af gangen)
  for (var i = 0; i < height/2; i++) {
    var dx = width/2-(width/4/2) - i;
    var dy = 0+i*2;
    var dW = (width/4) + i*2;
    var dH = 2;
    var sx = 0;
    var sy = (0+i)/1.5;
    var sW = 200;
    var sH = 2;
//  Tegner billedet 
    image(imageRoad, dx, dy, dW, dH, sx, sy, sW, sH); 
  }
//Tegner himmel
  fill(100, 100, 200);
  rect(0, 0, width, height / 2);
//Tegner horisont  
  fill(0, 0, 0);
  rect(0, (height / 2) - 2, width, 4);
//Tegner bil overlay
  image(imageCar, 0, 0);
//Tegner "Score" tekst
  fill(255, 255, 255);
  textSize(25);
  text("Score: ", (width/3)*2, (height/5)*1);
//Tegner version  
  fill(0, 255, 0);
  textSize(15);
  text("Test v1.0", 15, 25);
}
