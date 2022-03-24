function setup() {
	noStroke();
	// noLoop();
	createCanvas(800, 800);
	radius = 10;

	colR = [255,255,254,208,219]
	colV = [255,211,202,6  ,94 ]
	colB = [255,89 ,254,6  ,219]

	satprmatrix = [[0.7, 0.3],[0.3, 0.7]];

	color = [];
	saturation = [];

	x=0;
	nbDots = 80;
	nbLines = nbDots;
	createLines();
	
}

function draw() {
	background(255);
	translate(width / 2, height / 2);
	addcolor();
	choosePalette();
	if (color[0].length < nbDots){
		chooseSaturation();
	}
	x += 1;
	drawLines();
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
		color.push([]);
		saturation.push([]);
	}
}

function addcolor(){
	for (let i = 0; i < nbLines; i++) {
		p = colorproba(x%nbDots*4*PI/nbDots-PI/2);
		r = random();
		if (r<p){
			color[i].push(1);
		} else {
			color[i].push(0);
		}
		if (color[i].length>nbDots){
			color[i].shift()
		}
	}
}

function choosePalette(){
	xpos = color[0].length-1
	for (let i = 0; i < nbLines; i++) {
		if (color[i][xpos]){
			if(random()<(1-(0.95*(x%nbDots>nbDots/2))-(0.05*(x%nbDots<nbDots/2)))){
				color[i][xpos] = 1;
			} else {
				color[i][xpos] = 2;
			}
		}
	}
}

function chooseSaturation(){
	xpos = color[0].length-1
	for (let i = 0; i < nbLines; i++) {
		saturation[i].push(nextSaturation(getEnvSaturation(i, xpos)));
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
		for (let ii = 0; ii < color[0].length; ii++) {
			val = color[i][ii];
			console.log(val);
			if (val>0){
				val += saturation[i][ii];
			}
			fill(colR[val],colV[val],colB[val]);
			ellipse((-(nbDots/2)+ii+1/2)*radius, (-(nbLines/2)+i+1/2)*radius, radius);
		}
	}
}