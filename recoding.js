function setup() {
	noStroke();
	noLoop();
	createCanvas(800, 800);
	radius = 10;

	lines = [];
	nbDots = 80;
	nbLines = nbDots;
	satprmatrix = [[0.7, 0.3],[0.3, 0.7]];
	createLines();
	console.log("HHH");
	console.log(lines);
	
}

function draw() {
	if (frameCount<50){
		background(200,215,245);
		translate(width / 2, height / 2);
		addcolor();
		choosePalette();
		chooseSaturation();
		drawLines();
		console.log("HH");
		console.log(lines);
	}
	
}

function colorproba(x){
    ymin = 0.2;
    ymax = 0.6;
    return (sin(x)+1)/2*(ymax-ymin)+ymin;
}

function nextSaturation(currentSat){
	// console.log(currentSat);
	val = random();
	if (val<satprmatrix[currentSat][0]){
		return 10;
	}
	return 0;
}

function createLines(){
	for (let i = 0; i<nbLines; i++){
		lines.push([]);
	}
}

function addcolor(){
	for (let i = 0; i < nbLines; i++) {
		for (let ii = 0; ii < nbDots; ii++) {
			p = colorproba(ii*4*PI/nbDots-PI/2);
			r = random();
			console.log(r<p);
			if (r<p){
				lines[i][ii] = 1;
			} else {
				lines[i][ii] = 0;
			}
			// text(r, 0, -400+35*ii);
			// text(p, 0, -390+35*ii);
			// text(p-r, 0, -380+35*ii);
			// ellipse(-40*radius+ii*radius, 300*p, radius);
		}
	}
}

function choosePalette(){
	for (let i = 0; i < nbLines; i++) {
		for (let ii = 0; ii < nbDots; ii++) {
			if (lines[i][ii]){
				if(random()<(1-(0.95*(ii>nbDots/2))-(0.05*(ii<nbDots/2)))){
					lines[i][ii] = 1;
				} else {
					lines[i][ii] = 2;
				}
			}
		}
	}
}

function chooseSaturation(){
	for (let i = 0; i < nbLines; i++) {
		for (let ii = 0; ii < nbDots; ii++) {
			if (lines[i][ii]){
				
				lines[i][ii] += nextSaturation(getEnvSaturation(i, ii));
			}
		}
	}
}

function getEnvSaturation(x, y){
	sat=0;
	desat=0;
	for (let i=x-1; i<x+2; i++){
		for (let j=y-1; j<y+2;j++){
			if (i>=0 && j>=0 && i<nbLines && j<nbDots && (i==x && j==y) && lines[i][j]!=0){
				if(lines[i][j]>10){
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
			if (lines[i][ii]>0){
				console.log(i,ii,lines[i][ii],lines[i][ii]>0);
				if (lines[i][ii]==1){
					r = 255;
					g = 211;
					b = 89;
				} else if (lines[i][ii]==2){
					r = 254;
					g = 202;
					b = 254;
				} else if (lines[i][ii]==11){
					r=208;
					g=6;
					b=6;
				} else {
					r=219;
					g=94;
					b=219;
				}
				fill(r,g,b);
			} else {
				fill(255,255,255);
			}
			ellipse((-(nbDots/2)+ii+1/2)*radius, (-(nbLines/2)+i+1/2)*radius, radius);
		}
	}
}