class Egg {
	constructor(sprite, egg_scale, init_x, init_y, commands) {
		this.commands = commands;
		this.dead = false;


		this.cont = new PIXI.Container();
		app.stage.addChild(this.cont);

		let textures = assets[`egg_${sprite}`];
		this.body = new PIXI.Sprite(textures);
		this.body.pivot.set(this.body.width / 2, this.body.height/2);
		this.body.scale.set(egg_scale, egg_scale);
		this.cont.addChild(this.body);


		this.circle = new Circle(0, 0, 17 * egg_scale);
		this.cont.addChild(this.circle.ren);
		


		this.cont.position.x = init_x;
		this.cont.position.y = init_y;
		
		
		this.age = 0;
	}

	update(delta) {
		if (this.dead) {
			return;
		}
		this.age += delta;

		for (let i=0;i<this.commands.length;i++) {
			let cmd = this.commands[i];

			if (cmd.prop.length == 2) {
				this.cont[cmd.prop[0]][cmd.prop[1]] = cmd.fn(this.cont[cmd.prop[0]], this.age, cmd.consts, delta);
			} else if (cmd.prop.length == 1) {
				this.cont[cmd.prop[0]] = cmd.fn(this.cont[cmd.prop[0]], this.age, cmd.consts, delta);
			} else {
				console.log("ERROR");
			}
		}

		this.circle.translate(this.cont.position.x, this.cont.position.y);


		var response = new SAT.Response();
		var A = this.circle.col;
		var B = me.circle.col;

		var collided = SAT.testCircleCircle(A, B, response);

		response.clear();

		if (collided == true) {
			this.delete();
			rolling.die();
		}
	}

	delete() {
		this.dead = true;

		this.cont.destroy();
		delete this.col;

	}
	
}