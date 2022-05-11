class Player {
	constructor(data) {
		this.cont = new PIXI.Container();
		app.stage.addChild(this.cont);

		this.hp = 100;
		this.hp_max = 100;


		this.circle = new Circle(0,0, 20);
		this.cont.addChild(this.circle.ren);

		this.blades = [];
		this.last_hurt = null;


		// var blade1 = weapons.starter_sword(1, -Math.PI/4); //new Blade(0,0, 50, 20, 0, -60, 2, -Math.PI/4);
		// this.cont.addChild(blade1.ren);
		// this.cont.addChild(blade1.ren2);
		// this.blades.push(blade1);


		// var blade2 = weapons.starter_sword(-1, -Math.PI/4); //new Blade(0,0, 50, 20, 0, -60, -2, -Math.PI/4);
		// this.cont.addChild(blade2.ren);
		// this.cont.addChild(blade2.ren2);
		// this.blades.push(blade2);


		// var blade3 = weapons.starter_sword(1, -3*Math.PI/4); //new Blade(0,0, 50, 20, 0, -60, 2, -3*Math.PI/4);
		// this.cont.addChild(blade3.ren);
		// this.cont.addChild(blade3.ren2);
		// this.blades.push(blade3);


		// var blade4 = weapons.starter_sword(-1, Math.PI/4); //new Blade(0,0, 50, 20, 0, -60, -2, Math.PI/4);
		// this.cont.addChild(blade4.ren);
		// this.cont.addChild(blade4.ren2);
		// this.blades.push(blade4);



		let textures = [];
		for (let i=0;i<4;i++) {
			let texture = assets['p_'+i];
			textures.push(texture);
		}
		this.body = new PIXI.AnimatedSprite(textures);
		this.body.loop = true;
		this.body.animationSpeed = 0.2;
		this.body.pivot.set(this.body.width / 2, this.body.height/2);
		this.cont.addChild(this.body);



		this.hpsprite = new PIXI.Graphics();
		this.hpsprite.beginFill(hp_color(this.hp));
		this.hpsprite.drawRect(0, 0, 40, 7);
		this.hpsprite.endFill();
		this.hpsprite.scale.set(1, 1);
		this.hpsprite.pivot.set(this.hpsprite.width/2, -2.5 * this.hpsprite.height);
		this.cont.addChild(this.hpsprite);


		var pos = {
			x: 300,
			y: 200
		}
		this.move_to(pos);
	}
	update(delta) {

		var response = new SAT.Response();
		for (let blade of this.blades) {
			blade.rotate(blade.spin * delta * 0.01);

			for (var i=enemies.length-1;i>=0;i--) {
				let enemy = enemies[i];
				var polygon = blade.col;
				var circle = enemy.circle.col;

				var collided = SAT.testPolygonCircle(polygon, circle, response);

				if (collided == true) {
					enemy.hurt(blade.num, blade.dmg);
					if (enemy.hp <= 0) {
						enemy.delete();
						enemies.splice(i, 1);
						map.spawn_wave();
					}
				}

				response.clear();
			}
			
		}
		
	}

	move_to(pos) {

		this.cont.position.x = pos.x;
		this.cont.position.y = pos.y;

		this.circle.translate(pos.x, pos.y);
		for (let blade of this.blades) {
			blade.translate(pos.x, pos.y);
		}
	}

	equip_dagger(weapon_id) {
		var dir_map = [-1, 1,1,-1];
		var ang_map = [-Math.PI/4, -Math.PI/4, -3*Math.PI/4, Math.PI/4];

		var ind = this.blades.length;
		let fn = weapons[weapon_id];

		var blade = fn(dir_map[ind] * upgrades.find_scale("spin"), ang_map[ind]);
		blade.dmg *= upgrades.find_scale("damage");
		blade.num = ind;

		this.cont.addChild(blade.ren);
		this.cont.addChild(blade.ren2);
		this.blades.push(blade);

		// var blade1 = weapons.starter_sword(1, -Math.PI/4); //new Blade(0,0, 50, 20, 0, -60, 2, -Math.PI/4);
		// this.cont.addChild(blade1.ren);
		// this.cont.addChild(blade1.ren2);
		// this.blades.push(blade1);


		// var blade2 = weapons.starter_sword(-1, -Math.PI/4); //new Blade(0,0, 50, 20, 0, -60, -2, -Math.PI/4);
		// this.cont.addChild(blade2.ren);
		// this.cont.addChild(blade2.ren2);
		// this.blades.push(blade2);


		// var blade3 = weapons.starter_sword(1, -3*Math.PI/4); //new Blade(0,0, 50, 20, 0, -60, 2, -3*Math.PI/4);
		// this.cont.addChild(blade3.ren);
		// this.cont.addChild(blade3.ren2);
		// this.blades.push(blade3);


		// var blade4 = weapons.starter_sword(-1, Math.PI/4); //new Blade(0,0, 50, 20, 0, -60, -2, Math.PI/4);
		// this.cont.addChild(blade4.ren);
		// this.cont.addChild(blade4.ren2);
		// this.blades.push(blade4);
	}

	hurt(dmg) {
		console.log("DMG", dmg);
		if ((this.last_hurt == null) || (Date.now() - this.last_hurt > 800)) {
			this.last_hurt = Date.now();
			this.hp -= dmg;
			
			if (dmg > 0) {
				audio.play("die");
			}
			
			if (this.hp <= 0) {
				state.set("death");
			}
			this.hpsprite.scale.set(1 * this.hp/this.hp_max, 1);
		}
	}
	destroy_daggers() {
		for (let blade of this.blades) {
			blade.kill();
			blade.ren.destroy();
			blade.ren2.destroy();
		}
		this.blades = [];
	}

	delete() {
	}
	
}