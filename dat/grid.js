class Grid {
  constructor(x, y, w, h, s, c) {
    this.x = x;
    this.y = y;
    this.rows = h;
    this.cols = w;
    this.col = c;
    this.spacing = s;
    this.data = [];
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j]=[]
        for (let k = 0; k < 2; k++){
          this.data[i][j][k] = 0;
        }
      }
    }
  }

  show() {
    noFill();
    stroke(255);
    rect(this.x, this.y, this.cols * this.spacing, this.rows * this.spacing);
    stroke(100);
    for (let i = 0; i < this.rows - 1; i++) {
      line(this.x, this.y + (i + 1) * this.spacing, this.x + this.cols * this.spacing, this.y + (i + 1) * this.spacing);
    }
    for (let j = 0; j < this.cols - 1; j++) {
      line(this.x + (j + 1) * this.spacing, this.y, this.x + (j + 1) * this.spacing, this.y + this.rows * this.spacing);
    }
    fill(255);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.data[i][j][0] == 1) {

          image(this.data[i][j][1], this.x + (j * this.spacing)+1, this.y + (i * this.spacing)+1, this.spacing-1, this.spacing-1);
        }
      }
    }
  }

  add(other) {
    for (let i = 0; i < other.shape.length; i++) {
      for (let j = 0; j < other.shape[i].length; j++) {
        if (other.shape[i][j] == 1) {
          for (let k = 0; k < 2; k++){
            this.data[other.y + i][other.x + j][0] = 1;
            this.data[other.y + i][other.x + j][1] = other.img;
          }
        }
      }
    }
  }

  eliminate(){
    // console.log('eliminate Called')

    let row_total = 0;
    let row_elim;

    for (let r = 0; r < this.rows; r++) {
      row_total = 0;
      for (let c = 0; c < this.cols; c++){
        row_total = row_total + this.data[r][c][0];
        // console.log('Row', r, 'total is', row_total);
        if (row_total == this.cols){
          this.data.splice(r,1);
          this.data.unshift([]);
          for(let i = 0; i < this.cols; i++){
            this.data[0][i] = [];
            for (let k = 0; k <2; k++){
              this.data[0][i][k] = 0;
            }
          }
        scoreBoard.score += row_total;
       } 
      }
    }  
  }

  clear(){
      for (let i = 0; i < this.data.length; i++){
        for (let j = 0; j < this.data[i].length; j++){
          for (let k =0; k <2; k++){
            this.data[i][j][k] = 0;
          }
        }
      }
  }

  full(){
    let startgrid = 0;
    for (let i = 0; i < this.data[1].length; i++){
        // console.log('full check started',i, startgrid)
        startgrid += this.data[1][i][0];
    }
      if (startgrid > 0){
          return true;
          // console.log('Grid Full');
        }
  }
}
