var canvas = document.getElementById("my");
let ctx = canvas.getContext('2d');

var NUM = 300;

var centerX = 300;
var centerY = 300;
var VarRadius, x, y, teta;

var settings = {
	radius: 100,
	period: Math.floor(30 * Math.random()),
	amp: Math.floor(30 * Math.random()),
	speed: Math.floor(100 * Math.random()),
	numberOfCircles: Math.floor(30 * Math.random()),
	stroke: false
}

var gui = new dat.GUI();
gui.add(settings, 'amp', 0, 40).step(1);
gui.add(settings, 'speed', 0, 400).step(1);
gui.add(settings, 'period', 0, 40).step(1);
gui.add(settings, 'numberOfCircles', 10, 40).step(1);
gui.add(settings, 'stroke');

function DrawCircle(radius, color, offset) {

	ctx.fillStyle = color;
	ctx.beginPath();

	for (let i = 0; i <= NUM; i++) {

		teta = i * 2 * Math.PI/NUM;
		VarRadius = radius + settings.amp * Math.cos(teta * settings.period + offset);
		x = centerX + VarRadius * Math.cos(teta);
		y = centerY + VarRadius * Math.sin(teta);

		if(i === 0) {
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
		}

	}

	ctx.closePath();
	ctx.strokeStyle = '#ffffff';
	if(settings.stroke == true) {
		ctx.stroke();
	} else {
		ctx.fill();
	}

}

var time = 0;

function Draw() {
	time++;
	ctx.clearRect(0, 0, 600, 600);
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, 600, 600);
	for (let i = 0; i < settings.numberOfCircles; i++) {
		var color = (i%2)?'black':'white';
		color = 'black';
		DrawCircle(
			200 - i *10,
			'hsl(' + i * 5 + ', 50%, 50%)',
			// color,
			i * time / settings.speed
		);	
	}
}

function render() {
	Draw();
	window.requestAnimationFrame(render);
}
render();