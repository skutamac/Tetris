class ScoreBoard {
	constructor(xpos, ypos, wide, high){
		this.x = xpos;
		this.y = ypos;
		this.w = wide;
		this.h = high;
		this.level;
		this.score;
	}	
	
	show(){
		stroke(255);
		fill(55);
		rect(this.x, this.y, this.w, this.h);
		textFont('Courier New');
		textSize(28);
		text('SCORE: ' + this.score, this.x + (this.w / 8), this.y + 30);
		text('LEVEL: ' + this.level, this.x + (this.w / 8), this.y + 70);
	}
}