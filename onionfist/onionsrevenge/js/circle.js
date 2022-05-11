class Circle {
	constructor(px, py, radius) {
		this.ren = new PIXI.Graphics();
		this.ren.beginFill(0xff0000);
		this.ren.drawCircle(px, py, radius);
		this.ren.endFill();
		this.ren.position.x = px;
		this.ren.position.y = py;
		this.ren.alpha = 0.0;

		this.col = new SAT.Circle(new SAT.Vector(px,py), radius);
		// this.col = this.col.toPolygon();
	}
	translate(x, y) {
		// this.col.translate(x, y);
		this.col.pos.x = x;
		this.col.pos.y = y;
		// this.ren.position.x += x * delta;
		// this.ren.position.y += y * delta;
	}
	delete() {
	}
	
}


