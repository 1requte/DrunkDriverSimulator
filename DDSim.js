var canvas;
var state = 0;
var paused = false;

var score = 0;
var imageRoad;
var imageCar;
var imageCity;
var imageWheel;

var x = 800;

var hoveredPlay = false;
var hoveredBack = false;
var hoveredCredits = false;

//Definerer al tekst som Strings
var langMenuTitle01 = "Drunk Driving";
var langMenuTitle02 = "Simulator";
var langMenuTitle03 = "2018";
var langMenuPlay01 = "PLAY";
var langMenuPlay02 = "> PLAY <"
var langMenuCredits01 = "CREDITS";
var langMenuCredits02 = "> CREDITS <"
var langGameScore = "Score: ";
var langGamePosition = "X: ";
var langPauseTitle = "Game Paused";
var langPauseResume = "Press ESCAPE to resume";
var langPauseMenu01 = "Return to main menu";
var langPauseMenu02 = "> Return to main menu <";
var langDeathTitle = "You crashed!";
var langDeathScore = "Final score: ";
var langDeathMessage = "Don't drink & drive";
var langDeathMenu = "Press ESCAPE to return to the main menu";
var langGlobalVersion = "v1.3";

function setup() {
  canvas = createCanvas(800, 600);
//Indlæser billedfilerne 
  imageRoad = loadImage("assets/road.png");
  imageCar = loadImage("assets/car.png");
  imageCity = loadImage("assets/background.png");
  imageWheel = loadImage("assets/wheel.png");
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
  else if(state == 2) {
    drawDeath();
  }
  else if(state == 3) {
    drawCredits();
  }
  drawVersion();
}

function drawMenu() {
//Sørger for at spillet aldrig er pauset når man starter
  paused = false;
//Tegner menuen  
  background(80, 80, 80);
  fill(255, 210, 210);
  textSize(50);
  text(langMenuTitle01, width/2-textWidth(langMenuTitle01)/2, 150);
  textSize(35);
  fill(210, 210, 255);
  text(langMenuTitle02, width/2-textWidth(langMenuTitle02)/2 - 50, 180);
  textSize(40);
  fill(210, 255, 210);
  text(langMenuTitle03, width/2-textWidth(langMenuTitle03)/2 +80, 180);
  
  textSize(30);
//Tjekker om musen er over knappen
  if(mouseX > width/2-textWidth(langMenuPlay01)/2 && (mouseX < width/2+textWidth(langMenuPlay01)/2) && mouseY > 400-30 && mouseY < 400) {
    hoveredPlay = true;
  } else {
    hoveredPlay = false;
  }
  
  if(mouseX > width/2-textWidth(langMenuCredits01)/2 && (mouseX < width/2+textWidth(langMenuCredits01)/2) && mouseY > 500-30 && mouseY < 500) {
    hoveredCredits = true;
  } else {
    hoveredCredits = false;
  }
  
//Hvis musen er over knappen, gør teksten fancy  
  if(hoveredPlay) {
    textSize(30);
    fill(255, 255, 210);
    text(langMenuPlay02, width/2-textWidth(langMenuPlay02)/2, 400);
  } else {
    textSize(25);
    fill(240, 240, 240);
    text(langMenuPlay01, width/2-textWidth(langMenuPlay01)/2, 400);
  }
  
  if(hoveredCredits) {
    textSize(30);
    fill(255, 255, 210);
    text(langMenuCredits02, width/2-textWidth(langMenuCredits02)/2, 500);
  } else {
    textSize(25);
    fill(240, 240, 240);
    text(langMenuCredits01, width/2-textWidth(langMenuCredits01)/2, 500);
  }
}

var offset = -1000+800;
function drawGame() {
//Tegner baggrund
  background(0, 0, 0);
//Looper igennem halvdelen af højdens pixels (halvdelen, fordi billedet bliver indlæst 800x2 pixels af gangen
  if(!paused) {
    offset = offset + 10;
    if(offset > 0) offset = -1000+800;
    move();
  }
//Tegner billedet 
  image(imageCity, 0, 78-score/500, imageCity.width/4, imageCity.height/4+100);
  for (var i = 0; i < 800; i++) {
    var dx = 0-i*5;
    var dy = (height/2) + i*2;
    var dW = 800+i*10;
    var dH = 2;
    var sx = 0 + x;
    var sy = i*8-offset;
    var sW = 800;
    var sH = 8;
    image(imageRoad, dx, dy, dW, dH, sx, sy, sW, sH);
  }
//Tegner himmel
  //fill(100, 100, 200);
  //rect(0, 0, width, height / 2);
//Tegner horisont  
  //fill(0, 0, 0);
  //rect(0, (height / 2) - 2, width, 4);
//Tegner bil overlay
  image(imageCar, 0, 0, 800, 600);
  image(imageWheel, 60, 400, imageWheel.width/4, imageWheel.height/4);
  
//Tegner "Score" tekst
  fill(255, 255, 255);
  textSize(25);
  text(langGameScore + score, (width/3)*2, (height/5)*1);
  fill(255, 255, 0);
  textSize(20);
  text(langGamePosition + x, 15, height - 40);
}

function drawPaused() {
//Tegner pauseskærmen
  fill(0, 0, 0, 100);
  rect(0, 0, width, height);
  
  fill(255, 255, 255);
  textSize(50);
  text(langPauseTitle, width/2-textWidth(langPauseTitle)/2, 250);
  textSize(20);
  text(langPauseResume, width/2-textWidth(langPauseResume)/2, 280);
  //Tjekker om musen er over knappen
  if(mouseX > width/2-textWidth(langPauseMenu01)/2 && (mouseX < width/2+textWidth(langPauseMenu01)/2) && mouseY > 280 && mouseY < 300) {
    hoveredBack = true;
  } else {
    hoveredBack = false;
  }
  if(!hoveredBack) {
    text(langPauseMenu01, width/2-textWidth(langPauseMenu01)/2, 300);
  } else {
    textSize(25);
    fill(200, 200, 120);
    text(langPauseMenu02, width/2-textWidth(langPauseMenu02)/2, 300);
  }
}

function drawDeath() {
  background(80, 0, 0);
  fill(255, 255, 255);
  textSize(50);
  text(langDeathTitle, width/2-textWidth(langDeathTitle)/2, 200);
  fill(150, 150, 150);
  textSize(30);
  text(langDeathScore + score, width/2-textWidth(langDeathScore + score)/2, 250);
  fill(255, 255, 150);
  textSize(25);
  text(langDeathMenu, width/2-textWidth(langDeathMenu)/2, 500);
  fill(255, 150, 150);
  noStroke();
  rect((width/5)*1, 300, (width/5)*3, 2);
  textSize(20);
  text(langDeathMessage, width/2-textWidth(langDeathMessage)/2, 330);
}

//Tegner version  
function drawVersion() {
  fill(0, 255, 0);
  textSize(15);
  text(langGlobalVersion, 15, 25);
}

function drawCredits() {  background(80, 80, 80);
  fill(255, 210, 210);
  textSize(50);
  text(langMenuTitle01, width/2-textWidth(langMenuTitle01)/2, 110);
  textSize(35);
  fill(210, 210, 255);
  text(langMenuTitle02, width/2-textWidth(langMenuTitle02)/2 - 50, 140);
  textSize(40);
  fill(210, 255, 210);
  text(langMenuTitle03, width/2-textWidth(langMenuTitle03)/2 +80, 140);
  
  fill(210, 210, 210);
  textSize(30);
  text("Programming", 50, 200);
  textSize(20);
  text("Emil", 50, 230);
  textSize(30);
  text("Graphics and Textures", 50, 300);
  textSize(20);
  text("Kevin", 50, 330);
  text("Emil", 50, 350);
  textSize(30);
  text("Webdesign", 50, 400);
  textSize(20);
  text("William", 50, 430);
  textSize(20);
  text("< Press ESCAPE to return >", width/2-textWidth("< Press ESCAPE to return >")/2, 530);
}

function mouseReleased() {
//Hvis musen er over knappen, gå til spillet  
  if(hoveredPlay && state == 0) {
    score = 0;
    x = 800;
    imageRoadOffset = imageRoad.get(0+x, 0, 1000, 400);
    state = 1;
  }
//Hvis musen er over knappen, gå til menuen  
  if(hoveredBack && state == 1 && paused == true) {
    state = 0;
  }
  
  if(hoveredCredits && state == 0) {
    state = 3;
  }
}

function keyReleased() {
//Hvis der bliver trykket på ESCAPE, sæt boolean variablet 'paused' til det modsatte af hvad det er   
  if(keyCode == ESCAPE) {
    if(state == 1) paused = !paused;
    if(state == 2) state = 0;
    if(state == 3) state = 0;
  }
  
}

var movement = 0;
var inverted = false;
function move() {
  var r = random(0, 100);
  
  if(keyIsDown(RIGHT_ARROW)) {
    movement = 1;
  } else if(keyIsDown(LEFT_ARROW)) {
    movement = 2;
  }
  

  if(r > 98.0) {
    movement = 1;
  } else if(r > 95.0) {
    movement = 2;
  }
  if(r < 10) {
    movement = 0;
  }
  if(r > 99.0) inverted = !inverted;
  
  
  if(movement == 1) {
    if(!inverted) x = x + 5;
    else x = x - 5;
    imageRoadOffset = imageRoad;
  } else if(movement == 2) {
    if(!inverted) x = x - 5;
    else x = x + 5;
    imageRoadOffset = imageRoad;
  }
  
  //if(x > 800) x = 800;
  //if(x < 10) x = 10;
  
  if(x > 700 && x < 1100) {
    score = score + 5;
  } else if(x > 80 && x < 701) {
    score = score + 1;
  } else {
    state = 2;
  }
}
