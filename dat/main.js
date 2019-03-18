let timer;
let grid;
let score;
let lastStep;
let level;
let check;
let blue_block_img;
let darkgray_block_img;
let gray_block_img;
let green_block_img;
let lightblue_block_img;
let orange_block_img;
let pink_block_img;
let purple_block_img;
let red1_block_img;
let red2_block_img;
let white_block_img;




function setup() {
  createCanvas(300, 600);

  blue_block_img = loadImage('./art/blue.png');
  darkgray_block_img = loadImage('./art/darkgray.png');
  gray_block_img = loadImage('./art/gray.png');
  green_block_img = loadImage('./art/green.png');
  lightblue_block_img = loadImage('./art/lightblue.png');
  orange_block_img = loadImage('./art/orange.png');
  pink_block_img = loadImage('./art/pink.png');
  purple_block_img = loadImage('./art/purple.png');
  red1_block_img = loadImage('./art/red1.png');
  red2_block_img = loadImage('./art/red2.png');
  white_block_img = loadImage('./art/white.png');

  score = 0;
  level = 1;
  lastStep = 0;

  grid = new Grid(grid_space, grid_space, width / grid_space - 2, height / grid_space - 2, grid_space, 255);

  gameActive = false;

}

function draw() {

  // draw game pallete
  background(55);
  grid.show();
  text('Score = ', 10,10);
  text(score, 55, 10);
  text('Level = ', 100,10);
  text(level, 150, 10);
  text('Speed = ', 200,10);
  text(speed, 250, 10);


  // Game Active Loop
  if(gameActive){

    //Check if game over
    if (grid.full()){
      gameOver();
    }
    
    // check score and increase level and speed
    if (score / level > 100){
      level = level + 1;
      speed = level;
    }
    
    block.show(grid);

    // drop block on regular basis dependent on level and speed
    if (millis() > (lastStep + (start_speed / speed))) {
      lastStep = millis();
      // check if block can move down without a conflict
      if (block.canMove(0,1,grid)){
        block.move(0, 1);
      } else {
        // if block cannot move down then lock block onto grid and get new block - also increase score
        grid.add(block);
        score = score + block.value;
        // check for completed row and remove remove
        grid.eliminate();

        // if not game over get new block
        block = null;
        block = new Block(models[ceil(random(0, 5))], 5, 0, 255);
        }
      }
    }
  else {
    background(55);
    grid.show();
    text('Score = ', 10,10);
    text(score, 55, 10);
    text('Level = ', 100,10);
    text(level, 150, 10);
    text('Speed = ', 200,10);
    text(speed, 250, 10); 
    text('Press Space Bar to Start', width/ 2 - 100 ,height / 2);
  }
}






function keyPressed() {
  // check for key presses and take action based on input
  if (gameActive){
    // check for rotate input from Up Arrow, check if can rotate and then rotate
    if (gameActive &&keyCode === UP_ARROW) {
          block.rotate();
    } 
    // check for move left on Left Arrow and move left if not blocked by wall or terrain
    else if (keyCode === LEFT_ARROW) {
      if (block.canMove(-1,0,grid)){
          block.move(-1, 0);
      }
    } 
    // check for move right on right Arrand and move right if not blocked by wall or terrain
    else if (keyCode === RIGHT_ARROW) {
      if (block.canMove(1,0,grid)){
            block.move(1, 0);
      }
    } 
    // check for drop block on Down Arrow and drop block to floor or terrain
    else if (keyCode === DOWN_ARROW) {
        while (block.canMove(0, 1, grid)){
          block.move(0, 1);
        }
        console.log("Dropped");
        grid.add(block);
        score += block.value;
        block = null;
        block = new Block(models[ceil(random(0, 5))], 5, 0, 255);
        console.log("New Block Added");
    }
  }
  // check for space bar to cancel game or start new game
  if (keyCode === 32){
    //console.log('Space Bar Pressed', gameActive);
    if (gameActive){
      //console.log(gameActive, 'Detected')
      gameOver();
    } 
    else if (!gameActive) {
      //console.log(gameActive, 'Detected')
      newGame();
    }
    //console.log(gameActive, 'Set');
  }
}

function newGame(){
  grid.clear();
  score = 0;
  level = 1;
  speed = 1;
  block = null;
  block = new Block(models[ceil(random(0, 5))], 5, 0, 255);
  gameActive = true;
}

function gameOver(){
  gameActive = false;
}



