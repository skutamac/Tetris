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
        this.data[i][j] = 0;
      }
    }
    // // Add some blocks for testing
    // this.data[this.rows - 1][4] = 1;
    // this.data[this.rows - 1][5] = 1;
    // this.data[this.rows - 1][6] = 1;
    // this.data[this.rows - 2][4] = 1;
    // this.data[this.rows - 2][5] = 1;
    // this.data[this.rows - 2][6] = 1;
    // this.data[this.rows - 3][4] = 1;
    // this.data[this.rows - 3][5] = 1;
    // this.data[this.rows - 3][6] = 1;

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
        if (this.data[i][j] == 1) {

          image(darkgray_block_img, this.x + (j * this.spacing), this.y + (i * this.spacing), this.spacing, this.spacing);
        }
      }
    }
  }

  add(other) {
    for (let i = 0; i < other.shape.length; i++) {
      for (let j = 0; j < other.shape[i].length; j++) {
        if (other.shape[i][j] == 1) {
          this.data[other.y + i][other.x + j] = 1;
        }
      }
    }


  }



  eliminate(){

    let row_total = 0;
    let row_elim;

    for (let r = 0; r < this.rows; r++) {
      row_total = 0;
      for (let c = 0; c < this.cols; c++){
        row_total = row_total + this.data[r][c];
        if (row_total == this.cols){
        this.data.splice(r,1);
        this.data.unshift([]);
        for(let i = 0; i < this.cols; i++){
          this.data[0][i] = 0;
        }
        score = score + row_total;
        }
      }
    }  
  }

  clear(){
      for (let i = 0; i < this.data.length; i++){
      for (let j = 0; j < this.data[i].length; j++){
        this.data[i][j] = 0;
      }
    }
  }

  full(){
    let startgrid = 0;
    for (let i = 0; i < this.data[1].length; i++){
        console.log('full check started',i, startgrid)
        startgrid += this.data[1][i];
    }
      if (startgrid > 0){
          return true;
          console.log('Grid Full');
        }
        
  }

  







}
