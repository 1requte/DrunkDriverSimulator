var canvas;
var state = 0;
var paused = false;

var score = 0;
var imageRoad;
var imageCar;

var hoveredPlay = false;

function setup() {
  canvas = createCanvas(800, 600);
//Indlæser billedfilerne 
  imageRoad = loadImage('assets/road.png');
  imageCar = loadImage('assets/car.png');
}

function draw() {
//Vælger om den skal tegne menuen eller spillet  
  if(state == 0) drawMenu();
  else if(state == 1) {
    drawGame();
    if(paused) {
      drawPaused();
    }
  }
}

function drawMenu() {
//Sørger for at spillet aldrig er pauset når man starter
  paused = false;
//Tegner menuen  
  background(80, 80, 80);
  fill(255, 210, 210);
  textSize(50);
  text("Drunk Driving", width/2-textWidth("Drunk Driving")/2, 150);
  textSize(35);
  fill(210, 210, 255);
  text("Simulator", width/2-textWidth("Simular")/2 - 50, 180);
  textSize(40);
  fill(210, 255, 210);
  text("2018", width/2-textWidth("2018")/2 +80, 180);
  
  textSize(30);
//Tjekker om musen er over knappen
  if(mouseX > width/2-textWidth("PLAY")/2 && (mouseX < width/2+textWidth("PLAY")/2) && mouseY > 400-30 && mouseY < 400) {
    hoveredPlay = true;
  } else {
    hoveredPlay = false;
  }
  
//Hvis musen er over knappen, gør teksten fancy  
  if(hoveredPlay) {
    textSize(30);
    fill(255, 255, 210);
    text("> PLAY <", width/2-textWidth("> PLAY< ")/2, 400);
  } else {
    textSize(25);
    fill(240, 240, 240);
    text("PLAY", width/2-textWidth("PLAY")/2, 400);
  }
}

function drawGame() {
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
  text("Score: " + score, (width/3)*2, (height/5)*1);
//Tegner version  
  fill(0, 255, 0);
  textSize(15);
  text("Test v1.0", 15, 25);
}

function drawPaused() {
//Tegner pauseskærmen
  fill(0, 0, 0, 100);
  rect(0, 0, width, height);
  
  fill(255, 255, 255);
  textSize(50);
  text("Game Paused", width/2-textWidth("Game Paused")/2, 250);
  textSize(20);
  text("Press ESC to resume", width/2-textWidth("Press ESC to resume")/2, 280);
}

function mouseReleased() {
//Hvis musen er over knappen, gå til spillet  
  if(hoveredPlay == true) {
    state = 1;
  }
}

function keyReleased() {
//Hvis der bliver trykket på ESCAPE, sæt boolean variablet 'paused' til det modsatte af hvad det er   
  if(keyCode == ESCAPE) {
    paused = !paused;
  }
}
