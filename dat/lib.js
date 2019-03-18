function rotateArray(array){
  let oldArray = array;
  let newArray = [];
  for (let i = 0; i < oldArray[0].length; i++){
    newArray[i] = [];
    for(let j = 0; j < oldArray.length; j++){
      newArray[i][oldArray.length - j - 1] = oldArray[j][i];
    }
  }
  return newArray;
}

function shuffle(array) {
    let ctr = array.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
    }
    return array;
}

function newBucket(){
	bucket = ['T', 'L1', 'L2', 'S', 'Z1', 'Z2', 'C'];
  bucket.push(bucket[floor(random(0,7))]);
  bucket.push(bucket[floor(random(0,7))]);
  bucket.push(bucket[floor(random(0,7))]);
  bucket_index = 0;
  bucket = shuffle(bucket);
  console.log(bucket);
  	

}
function keyPressed() {
  // check for key presses and take action based on input
  if (gameActive){
    // check for rotate input from Up Arrow, check if can rotate and then rotate
    if (gameActive && keyCode === UP_ARROW) {
      if (block.canMove(0,0,1,grid)){
        block.rotate(grid);
      }
    }
    // check for move left on Left Arrow and move left if not blocked by wall or terrain
    else if (keyCode === LEFT_ARROW) {
      if (block.canMove(-1,0,0,grid)){
        block.move(-1, 0);
      }
    } 
    // check for move right on right Arrand and move right if not blocked by wall or terrain
    else if (keyCode === RIGHT_ARROW) {
      if (block.canMove(1,0,0,grid)){
        block.move(1, 0);
      }       
    } 
    // check for drop block on Down Arrow and drop block to floor or terrain
    else if (keyCode === DOWN_ARROW) {
      while (block.canMove(0, 1, 0, grid)){
        block.move(0, 1);
      }
      grid.add(block);
      scoreBoard.score += block.value;
      block = null;
      block = new Block(models[ceil(random(0, 5))], 5, 0, 255);
    }
  }
  // check for space bar to start new game
  if (!gameActive && keyCode === 32){
      newGame();
  }
}

function newGame(){
  grid.clear();
  scoreBoard.score = 0;
  scoreBoard.level = 1;
  block = null;
  newBucket();
  block = new Block(bucket[bucket_index], 5, 0, 255);
  bucket_index ++;
  gameActive = true;
}

function gameOver(){
  gameActive = false;
}