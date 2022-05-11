var testing = false;

class Blade {
	constructor(asset, polygon_nodes, offsetX, offsetY, spin, init_r=0, dmg) {

		this.spin = spin;
		this.dmg = dmg;
		this.dead = false;
		
		// var polygon_nodes = [
		// 	[70, 0],
		// 	[100, 0],
		// 	[100, 128]
		// ];

		let px = 0;
		let py = 0;

		let texture = assets[asset];
		this.ren2 = new PIXI.Sprite(texture);
		this.ren2.position.x = px;
		this.ren2.position.y = py;
		this.ren2.rotation = init_r;
		this.ren2.alpha = (!testing) ? 1 : 0.7;



		if (this.spin < 0) {
			this.ren2.scale.set(-1, 1);
		}




		var points = [];
		var vectors = [];
		// console.log("polygon_nodes", polygon_nodes);
		
		for (let polygon_node of polygon_nodes) {
			var x = polygon_node[0];
			var y = polygon_node[1];
			if (this.spin < 0) {
				// console.log(this.ren2.width);
				x = this.ren2.width - x + offsetX *2;
				console.log(x);
			}
			points.push(new PIXI.Point(x, y));
			vectors.push(new SAT.Vector(x, y));
		}
		if (this.spin < 0) {
			points.reverse();
			vectors.reverse();
		}


		this.ren = new PIXI.Graphics();
	    this.ren.beginFill(0x00ff00);
	    this.ren.drawPolygon(...points);
	    this.ren.endFill();
	    this.ren.position.x = px;
		this.ren.position.y = py;
	    this.ren.rotation = init_r;
	    this.ren.alpha = (!testing) ? 0 : 0.4;


		this.col = new SAT.Polygon(new SAT.Vector(px,py), vectors);


		var offset_x = this.ren2.width/2 + offsetX;
		var offset_y = 0 + offsetY;

	    this.ren.pivot.set(offset_x, offset_y);
	    this.ren2.pivot.set(offset_x, offset_y);
		this.col.setOffset(new SAT.Vector(-offset_x, -offset_y));


	}
	rotate(amount) {
		if (this.dead == true) {
			return;
		}
		this.ren.rotation += amount;
		this.ren2.rotation = this.ren.rotation;
		this.col.setAngle(this.ren.rotation);
	}
	kill() {
		this.dead = true;
	}
	translate(x, y) {
		if (this.dead == true) {
			return;
		}
		this.col.pos.x = x;
		this.col.pos.y = y;
	}
	update(delta) {
		if (this.dead == true) {
			return;
		}
		this.blade.ren.rotation += delta * 0.01;
		this.blade.ren2.rotation = this.blade.ren.rotation;
		this.blade.col.setAngle(this.blade.ren.rotation);
	}

	delete() {
		// this.blade.ren.destroy();
		// this.blade.ren2.destroy();
		
	}
	
}