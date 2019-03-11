let grid;
let lastStep;
let bucket = [];
let nextBlock;
let nextGrid;
let bucket_index;
let scoreBoard;

let blue_block_img;
let darkgray_block_img;
let gray_block_img;
let green_block_img;
let lightblue_block_img;
let orange_block_img;
let pink_block_img;
let purple_block_img;
let red_block_img;
let red2_block_img;
let white_block_img;


function setup() {
  createCanvas(800, 700);

  // Load Art
  blue_block_img = loadImage('./art/blue.png');
  darkgray_block_img = loadImage('./art/darkgray.png');
  gray_block_img = loadImage('./art/gray.png');
  green_block_img = loadImage('./art/green.png');
  lightblue_block_img = loadImage('./art/lightblue.png');
  orange_block_img = loadImage('./art/orange.png');
  pink_block_img = loadImage('./art/pink.png');
  purple_block_img = loadImage('./art/purple.png');
  red_block_img = loadImage('./art/red.png');
  red2_block_img = loadImage('./art/red2.png');
  white_block_img = loadImage('./art/white.png');

  // Create Game Framework Objects
  grid = new Grid((width / 2) + grid_space, grid_space, width / (2 * grid_space) - 2, height / grid_space - 2, grid_space, 255);
  nextGrid = new Grid((width / 4), (4 * height / 6), 5, 6, grid_space, 255);
  nextBlock = new Block();
  nextBlock.x = 1; 
  nextBlock.y = 1;
  scoreBoard = new ScoreBoard(width/8, height / 8, width / 3, height / 8);
  scoreBoard.score = 0;
  scoreBoard.level = 1;
  lastStep = 0;

  // Start Game as Inactive
  gameActive = false;

}

function draw() {

  // draw game pallete
  background(55);
  grid.show();
  scoreBoard.show();
  nextGrid.show();


  // Game Active Loop
  if(gameActive){

    //Check if game over
    if (grid.full()){
      gameOver();
    }
    
    // check score and increase level and speed
    if (scoreBoard.score / scoreBoard.level > 100){
      scoreBoard.level ++;
    }
    
    // draw block
    block.show(grid);

    // Draw Next Block
    nextBlock = null;
    nextBlock = new Block(bucket[bucket_index], 1, 1, 255);
    nextBlock.show(nextGrid);
    fallPause = 0;

    // drop block on regular basis dependent on level and speed
    if (millis() > (lastStep + (start_speed / scoreBoard.level))) {
      lastStep = millis();
      // check if block can move down without a conflict
      if (block.canMove(0,1,0,grid)){
        block.move(0, 1);
      } else {
          // if block cannot move down then lock block onto grid and get new block - also increase score
          grid.add(block);
          scoreBoard.score += block.value;
          
          // check for completed rows and remove remove
          grid.eliminate();

          // get new block and move index to next block in bucket
          block = null;
          block = new Block(bucket[bucket_index], 5, 0, 255);
          bucket_index ++;
          
          // check if bucket exhausted and refresh if empty
          if(bucket_index >= bucket.length){
          newBucket();
        }
      }
    }
  } else {
    // if game not active then display how to start new game
    text('Press Space Bar', width / 8  ,height / 2);
    text('to Start New Game', width / 8 - 20   ,height / 2 + 40);
  }
}