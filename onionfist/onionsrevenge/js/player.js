const PLAYER_SCALE = 0.27;

class Player {
	constructor(data) {
		this.cont = new PIXI.Container();
		app.stage.addChild(this.cont);




		this.circle = new Circle(0,0, 19);
		this.cont.addChild(this.circle.ren);


		let textures = [];
		for (let i=0;i<8;i++) {
			let texture = assets['p_'+i];
			textures.push(texture);
		}
		this.body = new PIXI.AnimatedSprite(textures);
		this.body.loop = true;
		this.body.animationSpeed = 0.2;
		this.body.pivot.set(this.body.width / 2, this.body.height/2);
		this.body.scale.set(PLAYER_SCALE, PLAYER_SCALE);
		this.cont.addChild(this.body);

		this.body.onFrameChange = function() {
			// alert("Fchange");
			if ((me.body.currentFrame > 1) && (rolling.time <= 0)) {
				me.body.gotoAndPlay(0);
			}
		};

		var pos = {
			x: 300,
			y: 440
		}
		this.move_to(pos);
	}
	update(delta) {

		// var response = new SAT.Response();
		// for (let blade of this.blades) {
		// 	blade.rotate(blade.turnspeed * delta * 0.01);

		// 	for (var i=enemies.length-1;i>=0;i--) {
		// 		let enemy = enemies[i];
		// 		var polygon = blade.col;
		// 		var circle = enemy.circle.col;

		// 		var collided = SAT.testPolygonCircle(polygon, circle, response);

		// 		response.clear();

		// 		if (collided == true) {
		// 			enemy.delete();
		// 			enemies.splice(i, 1);
		// 			map.spawn_wave();
		// 		}
		// 	}
			
		// }
		
	}

	move_to(pos) {

		this.cont.position.x = pos.x;
		this.cont.position.y = pos.y;

		this.circle.translate(pos.x, pos.y);
		// for (let blade of this.blades) {
		// 	blade.translate(pos.x, pos.y);
		// }
		
	}

	delete() {
	}
	
}