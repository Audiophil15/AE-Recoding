function setup() {
	// noStroke();

	createCanvas(800, 800);
	radius = 10;

	nbDots = 80
	nbLines = nbDots;

	createLines();

}

function draw() {
	if (frameCount<50){
		background(200,215,245);
		translate(width / 2, height / 2);
		drawLines();
	}

}

function colorproba(x){
	min = 0.5;
	factorshift = 1;
	return (sin(x)+1+min)/(2+min+factorshift);
}

function createLines(){
	line = [];
	for (let i = 0; i<nbDots; i++){
		line.push([]);
	}
	for (let i = 0; i < nbLines; i++) {
		for (let ii = 0; ii < nbDots; ii++) {
			p = colorproba(ii*4*PI/nbDots-PI/2);
			r = random();
			console.log(r<p);
			if (r<p){
				line[i][ii] = 1;
			} else {
				line[i][ii] = 0;
			}
			// text(r, 0, -400+35*ii);
			// text(p, 0, -390+35*ii);
			// text(p-r, 0, -380+35*ii);
			// ellipse(-40*radius+ii*radius, 300*p, radius);
		}
	}
}

function drawLines(){
	for (let i = 0; i < nbLines; i++) {
		for (let ii = 0; ii < nbDots; ii++) {
			if (line[i][ii]){
				// if(random()<(1-(0.95*(ii>nbDots/2))-(0.05*(ii<nbDots/2)))){
				// 	fill(100,65,150);
				// } else {
				// 	fill(175,175,0);
				// }
				fill(255,255,255);
			} else {
				fill(0,0,0);
			}
			ellipse((-(nbDots/2)+ii+1/2)*radius, (-(nbLines/2)+i+1/2)*radius, radius);
		}
	}
}