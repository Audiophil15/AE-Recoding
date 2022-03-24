function setup() {
	noStroke();
	// noLoop();
	createCanvas(800, 800);
	radius = 10;
	a = 5;

	colR = [255,255,254,208,219]
	colG = [255,211,202,6  ,94 ]
	colB = [255,89 ,254,6  ,219]

	dots = [];
	nbDots = 80;
	nbLines = nbDots;
	satprmatrix = [[0.7, 0.3],[0.3, 0.7]];
	createLines();
	background(255);
	translate(width / 2, height / 2);
	for (let i=0; i<nbLines; i++){
		for (let ii=0; ii<nbDots; ii++){
			addcolor(i,ii);
			choosePalette(i, ii);
			chooseSaturation(i, ii);
		}
	}
	drawLines();
}

function draw() {
	// if (!(frameCount%5)){
		translate(width / 2, height / 2);
		mx = floor(mouseX/10);
		my = floor(mouseY/10);
		if (mx < 80 && mx >= 0 && my < 80 && my >= 0){
			// console.log(mx, my);
			for (let i=-a; i<=a; i++){
				for (let ii=-a; ii<=a; ii++){
					if (mx+ii < 80 && mx+ii >= 0 && my+i < 80 && my+i >= 0){
						// console.log(mx, my);
						addcolor(mx+ii, my+i);
						choosePalette(mx+ii, my+i);
						chooseSaturation(mx+i, my+i);
					}
				}
			}
			drawLines();
		}
	// }
}

function colorproba(x){
    ymin = 0.2;
    ymax = 0.6;
    return (sin(x)+1)/2*(ymax-ymin)+ymin;
}

function nextSaturation(currentSat){
	val = random();
	if (val<satprmatrix[currentSat][0]){
		return 2;
	}
	return 0;
}

function createLines(){
	for (let i = 0; i<nbLines; i++){
		dots.push([]);
	}
}

function addcolor(x, y){
	p = colorproba(x*4*PI/nbDots-PI/2);
	r = random();
	// console.log(r<p);
	if (r<p){
		dots[y][x] = 1;
	} else {
		dots[y][x] = 0;
	}
}

function choosePalette(x, y){
	if (dots[y][x]){
		if(random()<(1-(0.95*(x>nbDots/2))-(0.05*(x<nbDots/2)))){
			dots[y][x] = 1;
		} else {
			dots[y][x] = 2;
		}
	}
}

function chooseSaturation(x, y){
	if (dots[y][x]){
		dots[y][x] += nextSaturation(getEnvSaturation(y, x));
	}
}

function getEnvSaturation(x, y){
	sat=0;
	desat=0;
	for (let i=x-1; i<x+2; i++){
		for (let j=y-1; j<y+2;j++){
			if (i>=0 && j>=0 && i<nbLines && j<nbDots && (i==x && j==y) && dots[i][j]!=0){
				if(dots[i][j]>10){
					sat += 1;
				} else {
					desat += 1;
				}
			}
		}
	}
	if (desat<sat){
		return 0;
	} else {
		return 1;
	}
}

function drawLines(){
	for (let i = 0; i < nbLines; i++) {
		for (let ii = 0; ii < nbDots; ii++) {
			val = dots[i][ii];
			// console.log(val);
			fill(colR[val],colG[val],colB[val]);
			ellipse((-(nbDots/2)+ii+1/2)*radius, (-(nbDots/2)+i+1/2)*radius, radius);
		}
	}
}