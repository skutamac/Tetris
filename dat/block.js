class Block {
  constructor(mod, xpos, ypos) {
    this.model = mod;
    this.x = xpos;
    this.y = ypos;
// Define Model as 'T", 'Z1', 'Z2', 'L1', 'L2', 'S', 'C'
    if(this.model == 'T'){
      this.img = green_block_img;
      this.shape = [3];
      this.shape[0] = [3];
      this.shape[1] = [3];
      this.shape[2] = [3];
      this.shape[0][0] = 0;
      this.shape[0][1] = 0;
      this.shape[0][2] = 0;
      this.shape[1][0] = 1;
      this.shape[1][1] = 1;
      this.shape[1][2] = 1;
      this.shape[2][0] = 0;
      this.shape[2][1] = 1;
      this.shape[2][2] = 0;
      this.value = 4;}
    else if (this.model == 'Z1'){
      this.img = pink_block_img;
      this.shape = [3];
      this.shape[0] = [3];
      this.shape[1] = [3];
      this.shape[2] = [3];
      this.shape[0][0] = 0;
      this.shape[0][1] = 1;
      this.shape[0][2] = 1;
      this.shape[1][0] = 1;
      this.shape[1][1] = 1;
      this.shape[1][2] = 0;
      this.shape[2][0] = 0;
      this.shape[2][1] = 0;
      this.shape[2][2] = 0;
      this.value = 4;}
    else if (this.model == 'Z2'){
      this.img = white_block_img;
      this.shape = [3];
      this.shape[0] = [3];
      this.shape[1] = [3];
      this.shape[2] = [3];
      this.shape[0][0] = 1;
      this.shape[0][1] = 1;
      this.shape[0][2] = 0;
      this.shape[1][0] = 0;
      this.shape[1][1] = 1;
      this.shape[1][2] = 1;
      this.shape[2][0] = 0;
      this.shape[2][1] = 0;
      this.shape[2][2] = 0;
      this.value = 4;}
    else if (this.model == 'S'){
      this.img = purple_block_img;
      this.shape = [4];
      this.shape[0] = [3];
      this.shape[1] = [3];
      this.shape[2] = [3];
      this.shape[3] = [3];
      this.shape[0][0] = 0;
      this.shape[0][1] = 1;
      this.shape[0][2] = 0;
      this.shape[0][3] = 0;
      this.shape[1][0] = 0;
      this.shape[1][1] = 1;
      this.shape[1][2] = 0;
      this.shape[1][3] = 0;
      this.shape[2][0] = 0;
      this.shape[2][1] = 1;
      this.shape[2][2] = 0;
      this.shape[2][3] = 0;
      this.shape[3][0] = 0;
      this.shape[3][1] = 1;
      this.shape[3][2] = 0;
      this.shape[3][3] = 0;
      this.value = 4;}
    else if (this.model == 'L1'){
      this.img = blue_block_img;
      this.shape = [3];
      this.shape[0] = [3];
      this.shape[1] = [3];
      this.shape[2] = [3];
      this.shape[0][0] = 0;
      this.shape[0][1] = 0;
      this.shape[0][2] = 0;
      this.shape[1][0] = 1;
      this.shape[1][1] = 1;
      this.shape[1][2] = 1;
      this.shape[2][0] = 0;
      this.shape[2][1] = 0;
      this.shape[2][2] = 1;
      this.value = 4;}
    else if (this.model == 'L2'){
      this.img = orange_block_img;
      this.shape = [3];
      this.shape[0] = [3];
      this.shape[1] = [3];
      this.shape[2] = [3];
      this.shape[0][0] = 0;
      this.shape[0][1] = 0;
      this.shape[0][2] = 0;
      this.shape[1][0] = 1;
      this.shape[1][1] = 1;
      this.shape[1][2] = 1;
      this.shape[2][0] = 1;
      this.shape[2][1] = 0;
      this.shape[2][2] = 0;
      this.value = 4;}
    else if (this.model == 'C'){
      this.img = red_block_img;
      this.shape = [2];
      this.shape[0] = [2];
      this.shape[1] = [2];
      this.shape[0][0] = 1;
      this.shape[0][1] = 1;
      this.shape[1][0] = 1;
      this.shape[1][1] = 1;
      this.value = 4;}
}

	move(x_move, y_move){
    this.x = this.x + x_move;
    this.y = this.y + y_move;
  }

  canMove(x_move, y_move, rotation, other){
    // canMove() method takes three test move parameters x, y, and the grid where the block exists
    // method checks if any peice of the block is adjacent to the left, right or bottom edges of the grid
    // and returns false if the desired move would move the block ouside the bounds of the grid.
    // Method also checks if the desired move conflicts with any existing blocks that are dead and part of the terrain.
    // Method returns false if the terrain is blocking the move.

    let new_x = this.x + x_move;
    let new_y = this.y + y_move;
    let rotate = rotation;
    let new_shape;

    //test if any peice is on edge or floor of grid
    for (let r = 0; r < this.shape.length; r++){
      // console.log(this.shape);
      // console.log(this.shape.length);
      for (let c = 0; c < this.shape[r].length; c++){
        if (x_move < 0 && this.shape[r][c] == 1 && this.x + c == 0){
          // console.log('left edge hit');
          return false;
        }
        if (x_move > 0 && this.shape[r][c] == 1 && this.x + c == other.cols - 1){
          // console.log('right edge hit');
          return false;
        }
        if (y_move > 0 && this.shape[r][c] == 1 && this.y + r == other.rows - 1){
          return false;
        }
      }
    }

    //test each solid peice in the shape and test if the move results in a conflict
    for (let r = 0; r < this.shape.length; r++){
      for (let c = 0; c < this.shape[r].length; c++){
        if (this.shape[r][c] == 1){
          if (other.data[new_y + r][new_x + c][0] == 1){
            return false;
          }
        }
      }
    }
    return true;
  }


  rotate(other){
    let clash = false;
        // if rotate check if matrix is already outside of grid area
    if (this.x < 0){
      this.x = 0;
    }
    if (this.x > other.cols - this.shape[0].length){
      this.x = other.cols - this.shape[0].length;
    }

    let newShape = rotateArray(this.shape);
    for (let i = 0; i < newShape.length; i++){
      for (let j = 0; j < newShape[i].length; j++){
        if (newShape[i][j] == 1 && other.data[i+this.y][j+this.x][0] == 1){
          clash = true;
          return;
        } else {
          clash = false;
        }
      }
    }
    if(!clash){
      this.shape = newShape;
    }
  }

  show(other) {
    for (let i = 0; i < this.shape.length; i++){
      for (let j = 0; j < this.shape[0].length; j++){
        if (this.shape[i][j] == 1){
          image(this.img, (other.x + (this.x + j) * other.spacing)+1, (other.y + (this.y + i) * other.spacing)+1, other.spacing-1, other.spacing-1);
        }
      }
    }
  }
}
