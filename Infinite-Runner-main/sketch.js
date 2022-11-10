var nextimg, next, next1, next2
var car1, car2, car3, car4, car1img, car2img, car3img, car4img, gardenimg, garden
var obs1, obs2, obs3, obs4, obs5, obs6, obs7, obs8, obs1i, obs2i, obs3i, obs4i, obs5i, obs6i, obs7i, obs8i

var track, trackimg, reset, resetimg
var score = 0
var life = 4
var gameState = "serve"


function preload() {

  nextimg = loadImage("next.png")

  car1img = loadImage("car1.png")
  car2img = loadImage("car2.png")
  car3img = loadImage("car3.png")
  car4img = loadImage("car4.png")

  trackimg = loadImage("track.jpg")
  gardenimg = loadImage("garden.png")

  obs1i = loadImage("obs1.png")
  obs2i = loadImage("obs3.png")
  obs3i = loadImage("obs5.png")
  obs4i = loadImage("obs6.png")
  obs5i = loadImage("obs7.png")
  obs6i = loadImage("obs8.png")

  resetimg = loadImage("reset.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  //track
  track = createSprite(windowWidth - 800, windowHeight - 300)
  track.addImage(trackimg)
  track.scale = 2.6

  //next
  next = createSprite(width - 250, 100, 100, 20)
  next.addImage(nextimg)
  next.visible = false
  next.scale = 0.5

  next1 = createSprite(width - 250, 500, 100, 20)
  next1.addImage(nextimg)
  next1.visible = false
  next1.scale = 0.5

  next2 = createSprite(width - 250, 500, 100, 20)
  next2.addImage(nextimg)
  next2.visible = false
  next2.scale = 0.5

  //cars
  car1 = createSprite(width / 2, height - 200)
  car1.addImage(car1img)
  car1.scale = 0.4
  car1.setCollider('rectangle', 0, -200, 60, 80)

  /*car1.addAnimation("second",car2img)
  car1.addAnimation("third",car3img)
  car1.addAnimation("fourth",car4img)*/

  /*car2=createSprite(width/2,height-200)
  car2.addAnimation(car2img)
  car2.visible=false
  car2.scale=0.4

  /*car3=createSprite(width/2,height-200)
  car3.addAnimation(car3img)
  car3.visible=false
  car3.scale=0.4

  car4=createSprite(width/2,height-200)
  car4.addAnimation(car4img)
  car4.visible=false
  car4.scale=0.4*/

  in1 = createSprite(280, height / 2, 10, height)
  in2 = createSprite(1190, height / 2, 10, height)
  in1.visible = false
  in2.visible = false

  reset = createSprite(width / 2.70, 200, 50, 50)
  reset.addImage(resetimg)
  reset.scale = 0.2
  reset.visible = false

  //obsGroup
  obsg = new Group()

}

function draw() {
  background(gardenimg)

  car1.bounce(in1)
  car1.bounce(in2)
  /*car2.bounce(in1)
  car2.bounce(in2)
  car3.bounce(in1)
  car3.bounce(in2)
  car4.bounce(in1)
  car4.bounce(in2)*/

  //obs1.bounce(obs2)

  if (gameState === "serve") {
    fill("white")
    textSize(30)
    text("NOTE:Press Spacebar", 200, 100)
    text("To Start", 150, 150)
    text("Press Up Arrow", 100, 50)
    text("To Boost", 10, 300)

    if (keyDown("space")) {
      gameState = "PLAY"
    }
  }

  //PlaygameState
  if (gameState === "PLAY") {
    track.velocityY = (8 + 2 * score / 100);
    score = score + Math.round(getFrameRate() / 60)

    reset.visible = false

    if (score == 1000) {
      createObstacles1()
    }

    if (track.y > height / 2 + 240) {
      track.y = track.height / 2;
    }

    if (keyDown("left")) {
      car1.x = car1.x - 10
    }
    if (keyDown("right")) {
      car1.x = car1.x + 10
    }
    if (keyDown("up")) {
      track.velocityY = track.velocityY + 10
      obsg.velocityY = obsg.velocityY + 10

    }
    createObstacles()

    if (car1.isTouching(obsg)) {
      obsg.destroyEach()
      life = life - 1
      gameState = "END"
    }
  }

  //EndgameState
  if (gameState === "END") {
    track.velocityY = 0
    next.visible = true

    //obsg.destroyEach()
    obsg.setVelocityYEach(0)
    obsg.setLifetimeEach(-1)

    if (mousePressedOver(next)) {
      car1.addImage(car2img)
      car1.scale = 0.7
      gameState = "PLAY1"
    }

  }

  //Play1gameState
  if (gameState === "PLAY1") {
    track.velocityY = (8 + 2 * score / 100);
    score = score + Math.round(getFrameRate() / 60)

    reset.visible = false

    next.visible = false

    if (score == 1000) {
      createObstacles1()
    }

    if (track.y > height / 2 + 240) {
      track.y = track.height / 2;
    }

    if (keyDown("left")) {
      car1.x = car1.x - 10
    }
    if (keyDown("right")) {
      car1.x = car1.x + 10
    }
    if (keyDown("up")) {
      track.velocityY = track.velocityY + 10
      obsg.velocityY = obsg.velocityY + 10
    }
    createObstacles()

    if (car1.isTouching(obsg)) {
      obsg.destroyEach()
      life = life - 1
      gameState = "END1"
    }
  }

  //End1gameState
  if (gameState === "END1") {
    track.velocityY = 0
    next.visible = true

    //obsg.destroyEach()
    obsg.setVelocityYEach(0)
    obsg.setLifetimeEach(-1)

    if (mousePressedOver(next)) {
      car1.addImage(car3img)
      car1.scale = 0.5
      gameState = "PLAY2"
    }
  }

  //Play2gameState
  if (gameState === "PLAY2") {
    track.velocityY = (8 + 2 * score / 100);
    score = score + Math.round(getFrameRate() / 60)

    reset.visible = false

    next.visible = false

    if (score == 1000) {
      createObstacles1()
    }

    if (track.y > height / 2 + 240) {
      track.y = track.height / 2;
    }

    if (keyDown("left")) {
      car1.x = car1.x - 10
    }
    if (keyDown("right")) {
      car1.x = car1.x + 10
    }
    if (keyDown("up")) {
      track.velocityY = track.velocityY + 10
      obsg.velocityY = obsg.velocityY + 10
    }
    createObstacles()

    if (car1.isTouching(obsg)) {
      obsg.destroyEach()
      life = life - 1
      gameState = "END2"
    }
  }

  //End2gameState
  if (gameState === "END2") {
    track.velocityY = 0
    next.visible = true

    //obsg.destroyEach()
    obsg.setVelocityYEach(0)
    obsg.setLifetimeEach(-1)

    if (mousePressedOver(next)) {
      car1.addImage(car4img)
      car1.scale = 0.4
      gameState = "PLAY3"
    }
  }

  //Play3gameState
  if (gameState === "PLAY3") {
    track.velocityY = (8 + 2 * score / 100);
    score = score + Math.round(getFrameRate() / 60)

    reset.visible = false

    next.visible = false

    if (score == 1000) {
      createObstacles1()
    }

    if (track.y > height / 2 + 240) {
      track.y = track.height / 2;
    }

    if (keyDown("left")) {
      car1.x = car1.x - 10
    }
    if (keyDown("right")) {
      car1.x = car1.x + 10
    }
    if (keyDown("up")) {
      track.velocityY = track.velocityY + 10
      obsg.velocityY = obsg.velocityY + 10
    }
    createObstacles()

    if (car1.isTouching(obsg)) {
      obsg.destroyEach()
      life = life - 1
      gameState = "END3"
    }
  }

  //End3gameState
  if (gameState === "END3") {
    track.velocityY = 0

    next.visible = false
    reset.visible = true

    //obsg.destroyEach()
    obsg.setVelocityYEach(0)
    obsg.setLifetimeEach(-1)

    score = 0

    if (mousePressedOver(reset)) {
      car1.addImage(car1img)
      car1.scale = 0.4
      gameState = "PLAY"
      life = 4
    }
  }

  drawSprites()
  fill("white")
  textSize(20)
  //Score&Lives
  text("SCORE:" + score, 350, 55)
  text("LIVES:" + life, 525, 55)
}

function createObstacles() {
  if (World.frameCount % 150 == 0) {
    var obs1 = createSprite(Math.round(random(350, 1050), 40, 10, 10));
    var obs2 = createSprite(Math.round(random(350, 1050), 40, 10, 10));
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1: obs1.addImage(obs1i)
        obs2.addImage(obs2i)
        obs1.scale = 0.4
        obs2.scale = 0.4
        break;
      case 2: obs1.addImage(obs2i)
        obs2.addImage(obs1i)
        obs1.scale = 0.6
        obs2.scale = 0.4
        break;
      case 3: obs1.addImage(obs3i)
        obs2.addImage(obs5i)
        obs1.scale = 0.4
        obs2.scale = 0.4
        break;
      case 4: obs1.addImage(obs4i)
        obs2.addImage(obs6i)
        obs1.scale = 0.6
        obs2.scale = 0.4
        break;
      case 5: obs1.addImage(obs5i)
        obs2.addImage(obs3i)
        obs1.scale = 0.4
        obs2.scale = 0.4
        break;
      case 6: obs1.addImage(obs6i)
        obs2.addImage(obs4i)
        obs1.scale = 0.6
        obs2.scale = 0.4
        break;
    }

    obs1.velocityY = 4.5;
    obs1.lifetime = 150;
    obsg.add(obs1);
    obs2.velocityY = 4.5;
    obs2.lifetime = 150;
    obsg.add(obs2);
  }
}

/*function keyPressed(){
  if(keyCode==UP_ARROW){
    track.velocityY = track.velocityY+5
    obs1.velocityY=obs1.velocityY+5
    obs2.velocityY=obs2.velocityY+5
  }
}*/

function createObstacles1() {
  if (World.frameCount % 150 == 0) {
    var obs3 = createSprite(Math.round(random(350, 1050), 40, 10, 10));
    var obs4 = createSprite(Math.round(random(350, 1050), 40, 10, 10));
    var rand = Math.round(random(1, 6))
    switch (rand) {
      case 1: obs3.addImage(obs1i)
        obs4.addImage(obs2i)
        obs3.scale = 0.4
        obs4.scale = 0.4
        break;
      case 2: obs3.addImage(obs2i)
        obs4.addImage(obs1i)
        obs3.scale = 0.6
        obs4.scale = 0.4
        break;
      case 3: obs3.addImage(obs3i)
        obs4.addImage(obs5i)
        obs3.scale = 0.4
        obs4.scale = 0.4
        break;
      case 4: obs3.addImage(obs4i)
        obs4.addImage(obs6i)
        obs3.scale = 0.6
        obs4.scale = 0.4
        break;
      case 5: obs3.addImage(obs5i)
        obs4.addImage(obs3i)
        obs3.scale = 0.4
        obs4.scale = 0.4
        break;
      case 6: obs3.addImage(obs6i)
        obs4.addImage(obs4i)
        obs3.scale = 0.6
        obs4.scale = 0.4
        break;
    }

    obs3.velocityY = (4.5 + 2 * score / 100);
    obs3.lifetime = 150;
    obsg.add(obs3);
    obs4.velocityY = (4.5 + 2 * score / 100);
    obs4.lifetime = 150;
    obsg.add(obs4);
  }
}
//Car Runner Infinite Game - Javascript