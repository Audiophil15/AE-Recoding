function setup() {
	noStroke();
	// noLoop();
	createCanvas(800, 800);
	radius = 10;

	colR = [255,255,254,208,219]
	colG = [255,211,202,6  ,94 ]
	colB = [255,89 ,254,6  ,219]

	satprmatrix = [[0.7, 0.3],[0.3, 0.7]];

	colors = [];
	saturation = [];

	x = 0;
	nbDots = 20;
	nbLines = nbDots;
	createLines();
}

function draw() {
	background(255);
	translate(width / 2, height / 2);
	addcolor();
	x += 1;
	choosePalette();
	chooseSaturation();
	drawLines();
	console.log(saturation);
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
		colors.push([]);
		saturation.push([]);
	}
}

function addcolor(){
	for (let i = 0; i < nbLines; i++) {
		p = colorproba(x%nbDots*4*PI/nbDots-PI/2);
		r = random();
		if (r<p){
			colors[i].push(1);
		} else {
			colors[i].push(0);
		}
		if (colors[i].length>nbDots){
			colors[i].shift()
		}
	}
}

function choosePalette(){
	xpos = colors[0].length-1
	for (let i = 0; i < nbLines; i++) {
		if (colors[i][xpos]){
			if(random()<(1-(0.95*(x%nbDots>nbDots/2))-(0.05*(x%nbDots<nbDots/2)))){
				colors[i][xpos] = 1;
			} else {
				colors[i][xpos] = 2;
			}
		}
	}
}

function chooseSaturation(){
	xpos = colors[0].length-1
	for (let i = 0; i < nbLines; i++) {
		saturation[i].push(nextSaturation(getEnvSaturation(i, xpos)));
		if (saturation[i].length > nbDots){
			saturation[i].shift();
		}
	}
}

function getEnvSaturation(x, y){
	sat=0;
	desat=0;
	for (let i=x-1; i<x+2; i++){
		for (let j=y-1; j<y+2;j++){
			if (i>=0 && j>=0 && i<nbLines && j<saturation[0].length && (i==x && j==y) && saturation[i][j]!=0){
				if(saturation[i][j]==2){
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
		for (let ii = 0; ii < colors[0].length; ii++) {
			val = colors[i][ii];
			console.log(val);
			if (val>0){
				val += saturation[i][ii];
			}
			fill(colR[val],colG[val],colB[val]);
			ellipse((-(nbDots/2)+ii+1/2)*radius, (-(nbDots/2)+i+1/2)*radius, radius);
		}
	}
}