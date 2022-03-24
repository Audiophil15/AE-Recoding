function setup() {
	noStroke();
	// noLoop();
	createCanvas(800, 800);
	radius = 10;

	colR = [255,255,254,208,219]
	colG = [255,211,202,6  ,94 ]
	colB = [255,89 ,254,6  ,219]

	satprmatrix = [[0.7, 0.3],[0.3, 0.7]];
	drawedDotsX = []
	drawedDotsY = []

	color = [];
	saturation = [];

	nbDots = 80;
	nbLines = nbDots;
	createLines();
	addcolor();
	choosePalette();
	chooseSaturation();
	
	background(255);
}

function draw() {
	translate(width / 2, height / 2);
	drawLines();
	// console.log(saturation);
	
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
		for (let ii = 0; ii < nbDots; ii++) {
			p = colorproba(ii*4*PI/nbDots-PI/2);
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
}

function choosePalette(){
	for (let i = 0; i < nbLines; i++) {
		for (let ii = 0; ii < nbDots; ii++) {
			if (color[i][ii]){
				if(random()<(1-(0.95*(ii>nbDots/2))-(0.05*(ii<nbDots/2)))){
					color[i][ii] = 1;
				} else {
					color[i][ii] = 2;
				}
			}
		}
	}
}

function chooseSaturation(){
	for (let i = 0; i < nbLines; i++) {
		for (let ii = 0; ii < nbDots; ii++) {
			saturation[i].push(nextSaturation(getEnvSaturation(i, ii)));
			if (saturation[i].length > nbDots){
				saturation[i].shift();
			}
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

	// for (let i = 0; i < nbLines; i++) {
	// 	for (let ii = 0; ii < nbDots; ii++) {
			randX = floor(random(0,nbDots));
			randY = floor(random(0,nbLines));
			// while (drawedDotsX.indexOf(randX)!=-1){
			// 	randX = floor(random(0,nbDots));
			// }
			// while(drawedDotsY.indexOf(randY)!=-1) {
			// 	randY = floor(random(0,nbLines));
			// }
			drawedDotsX.push(randX);
			drawedDotsY.push(randY);
			val = color[randY][randX];
			// console.log(val);
			if (val>0){
				val += saturation[randY][randX];
			}
			fill(colR[val],colG[val],colB[val]);
			ellipse((-(nbDots/2)+randX+1/2)*radius, (-(nbDots/2)+randY+1/2)*radius, radius);
	// 	}
	// }
}