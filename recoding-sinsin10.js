function setup() {
	noStroke();
	noLoop();
	createCanvas(800, 800);
	radius = 10;

	colR = [255,255,254,208,219]
	colG = [255,211,202,6  ,94 ]
	colB = [255,89 ,254,6  ,219]

	colors = [];
	nbDots = 80;
	nbLines = nbDots;
	satprmatrix = [[0.7, 0.3],[0.3, 0.7]];
	createLines();

}

function draw() {
	background(255);
	translate(width / 2, height / 2);
	addcolor();
	choosePalette();
	chooseSaturation();
	drawLines();
}

function scaleValue(x, inmin, inmax, outmin, outmax){
	return (x-inmin)/(inmax-inmin)*(outmax-outmin)+outmin
}

function colorproba(x, pmin, pmax){
    // ymin = 0.2;
    // ymax = 0.6;
    // return (sin(x)+1)/2*(pmax-pmin)+pmax;
	return(sin(x)*sin(5*x))
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
	}
}

function addcolor(){
	for (let i = 0; i < nbLines; i++) {
		for (let ii = 0; ii < nbDots; ii++) {
			p = scaleValue(colorproba(scaleValue(ii, 0, nbDots, -PI/2, 3*PI/2), 0.2, 0.6), -1, 1, 0, 1);
			r = random();
			console.log(r<p);
			if (r<p){
				colors[i][ii] = 1;
			} else {
				colors[i][ii] = 0;
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
			if (colors[i][ii]){
				if(random()<(1-(0.95*(ii>nbDots/2))-(0.05*(ii<nbDots/2)))){
					colors[i][ii] = 1;
				} else {
					colors[i][ii] = 2;
				}
			}
		}
	}
}

function chooseSaturation(){
	for (let i = 0; i < nbLines; i++) {
		for (let ii = 0; ii < nbDots; ii++) {
			if (colors[i][ii]){

				colors[i][ii] += nextSaturation(getEnvSaturation(i, ii));
			}
		}
	}
}

function getEnvSaturation(x, y){
	sat=0;
	desat=0;
	for (let i=x-1; i<x+2; i++){
		for (let j=y-1; j<y+2;j++){
			if (i>=0 && j>=0 && i<nbLines && j<nbDots && (i==x && j==y) && colors[i][j]!=0){
				if(colors[i][j]>10){
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
			val = colors[i][ii];
			console.log(val);
			fill(colR[val],colG[val],colB[val]);
			ellipse((-(nbDots/2)+ii+1/2)*radius, (-(nbDots/2)+i+1/2)*radius, radius);
		}
	}
}