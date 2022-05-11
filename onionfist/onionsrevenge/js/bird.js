

class Bird {
	constructor(sprite, bird_scale, init_x, init_y, egg_scripts, bird_speed) {

		this.egg_scripts = egg_scripts;
		for (let i=0;i<this.egg_scripts.length;i++) {
			this.egg_scripts[i] = {
				...this.egg_scripts[i],
				last_spawned: null,
				next_spawn: null
			}
		}

		this.cont = new PIXI.Container();
		app.stage.addChild(this.cont);

		let textures = assets[`bird_${sprite}`];
		this.body = new PIXI.Sprite(textures);
		this.body.pivot.set(this.body.width / 2, this.body.height/2);
		this.body.scale.set(-bird_scale, bird_scale);
		this.cont.addChild(this.body);

		this.dead = false;
		this.bird_speed = bird_speed;
		this.bird_scale = bird_scale;

		this.init_y = init_y;
		this.direction = 1;

		this.cont.position.x = init_x * app.screen.width;
		this.cont.position.y = init_y * app.screen.height;
		
	}
	update(delta) {
		if (this.dead) {
			return;
		}




		for (let i=0;i<this.egg_scripts.length;i++) {
			let scr = this.egg_scripts[i];
			if ((scr.last_spawned == null) || (Date.now() - scr.last_spawned > scr.next_spawn)) {

				scr.fn(this.cont.position);

				scr.last_spawned = Date.now();
				scr.next_spawn = scr.every_low + Math.random() * (scr.every_high - scr.every_low);
			}
		}



		if (this.cont.position.x < app.screen.width * 1/15) {
			this.cont.position.x = app.screen.width * 1/15;
			this.direction = 1;
			this.body.scale.set(-this.bird_scale, this.bird_scale);
		}

		if (this.cont.position.x > app.screen.width * 14/15) {
			this.cont.position.x = app.screen.width * 14/15;
			this.direction = -1;
			this.body.scale.set(this.bird_scale, this.bird_scale);
		}

		let vx = delta * this.bird_speed * this.direction;
		this.cont.position.x += vx;

	}
	delete() {
		if (this.dead) {
			return;
		}
		this.dead = true;

		this.cont.destroy();

	}
	
}