class Block {
  constructor(mod, xpos, ypos, clr) {
    this.model = mod;
    this.x = xpos;
    this.y = ypos;
    this.c = clr;
// Define Model as 'T", 'Z1', 'Z2', 'L1', 'L2', 'S', 'C'
    if(this.model == 'T'){
      this.cR = 255;
      this.cG = 0;
      this.cB = 0;
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
      this.cR = 0;
      this.cG = 255;
      this.cB = 0;
      this.shape = [3];
      this.shape[0] = [3];
      this.shape[1] = [3];
      this.shape[2] = [3];
      this.shape[0][0] = 0;
      this.shape[0][1] = 1;
      this.shape[0][2] = 0;
      this.shape[1][0] = 0;
      this.shape[1][1] = 1;
      this.shape[1][2] = 1;
      this.shape[2][0] = 0;
      this.shape[2][1] = 0;
      this.shape[2][2] = 1;
      this.value = 4;}
    else if (this.model == 'Z2'){
      this.cR = 0;
      this.cG = 0;
      this.cB = 255;
      this.shape = [3];
      this.shape[0] = [3];
      this.shape[1] = [3];
      this.shape[2] = [3];
      this.shape[0][0] = 0;
      this.shape[0][1] = 1;
      this.shape[0][2] = 0;
      this.shape[1][0] = 1;
      this.shape[1][1] = 1;
      this.shape[1][2] = 0;
      this.shape[2][0] = 1;
      this.shape[2][1] = 0;
      this.shape[2][2] = 0;
      this.value = 4;}
    else if (this.model == 'S'){
      this.cR = 127;
      this.cG = 127;
      this.cB = 0;
      this.shape = [4];
      this.shape[0] = [3];
      this.shape[1] = [3];
      this.shape[2] = [3];
      this.shape[3] = [3];
      this.shape[0][0] = 0;
      this.shape[0][1] = 0;
      this.shape[0][2] = 0;
      this.shape[0][3] = 0;
      this.shape[1][0] = 1;
      this.shape[1][1] = 1;
      this.shape[1][2] = 1;
      this.shape[1][3] = 1;
      this.shape[2][0] = 0;
      this.shape[2][1] = 0;
      this.shape[2][2] = 0;
      this.shape[2][3] = 0;
      this.shape[3][0] = 0;
      this.shape[3][1] = 0;
      this.shape[3][2] = 0;
      this.shape[3][3] = 0;
          this.value = 4;}
    else if (this.model == 'L1'){
      this.cR = 127;
      this.cG = 0;
      this.cB = 127;
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
      this.cR = 0;
      this.cG = 127;
      this.cB = 127;
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
      this.cR = 127;
      this.cG = 127;
      this.cB = 127;
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

  canMove(x_move, y_move, other){
    // canMove() method takes three test move parameters x, y, and the grid where the block exists
    // method checks if any peice of the block is adjacent to the left, right or bottom edges of the grid
    // and returns false if the desired move would move the block ouside the bounds of the grid.
    // Method also checks if the desired move conflicts with any existing blocks that are dead and part of the terrain.
    // Method returns false if the terrain is blocking the move.

    let new_x = this.x + x_move;
    let new_y = this.y + y_move;

    //test if any peice is on edge or floor of grid
    for (let r = 0; r < this.shape.length; r++){
      // console.log(this.shape);
      // console.log(this.shape.length);
      for (let c = 0; c < this.shape[r].length; c++){
        if (x_move < 0 && this.shape[r][c] == 1 && this.x + c == 0){
          console.log('left edge hit');
          return false;
        }
        if (x_move > 0 && this.shape[r][c] == 1 && this.x + c == other.cols - 1){
          console.log('right edge hit');
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
          if (grid.data[new_y + r][new_x + c] == 1){
            return false;
          }
        }
      }
    }
    return true;
  }


  rotate(){
    this.shape = rotateArray(this.shape);
  }

  show() {
    noStroke();
    fill(this.cR, this.cG, this.cB);

    for (let i = 0; i < this.shape.length; i++){
      for (let j = 0; j < this.shape[0].length; j++){
        if (this.shape[i][j] == 1){
          rect((grid.x + (this.x + j) * grid.spacing)+2, (grid.y + (this.y + i) * grid.spacing)+2, grid.spacing-2, grid.spacing-2);
        }

      }
    }
  }




}
