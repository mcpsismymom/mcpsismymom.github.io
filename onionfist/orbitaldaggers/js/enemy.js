class Enemy {
	constructor(px, py, blades, enemy_radius=1, enemy_speed=1, interval, hp=100) {

		this.enemy_radius = enemy_radius;
		this.enemy_speed = enemy_speed;
		this.interval = interval;
		this.hp_max = hp;
		this.hp = hp;
		this.last_hurts = [null, null, null, null];

		this.dead = false;
		this.age = 0;

		this.cont = new PIXI.Container();
		app.stage.addChild(this.cont);


		this.circle = new Circle(0,0, 20*enemy_radius);
		this.cont.addChild(this.circle.ren);

		this.blades = blades;
		var rand_amount = Math.random() * 2 * Math.PI;
		for (let blade of this.blades) {
			blade.ren.rotation += rand_amount;
			this.cont.addChild(blade.ren);
			this.cont.addChild(blade.ren2);
		}

		let textures = [];
		for (let i=0;i<4;i++) {
			let texture = assets['e_'+i];
			textures.push(texture);
		}
		this.body = new PIXI.AnimatedSprite(textures);
		this.body.loop = true;
		this.body.animationSpeed = 0.2;
		this.body.pivot.set(this.body.width / 2, this.body.height/2);
		this.body.play();
		this.cont.addChild(this.body);

		this.body.scale.set(enemy_radius, enemy_radius);

		this.hpsprite = new PIXI.Graphics();
		this.hpsprite.beginFill(hp_color(this.hp));
		this.hpsprite.drawRect(0, 0, 40, 7);
		this.hpsprite.endFill();
		this.hpsprite.pivot.set(this.hpsprite.width/2, -2.5 * this.hpsprite.height);
		this.hpsprite.scale.set(enemy_radius, enemy_radius);
		this.cont.addChild(this.hpsprite);

		this.move_to({x: px, y: py});
	}
	update(delta) {
		if (this.dead) {
			return;
		}
		this.age += delta;

		var vx = (this.cont.position.x > me.cont.position.x) ? -1 : 1;
		var vy = (this.cont.position.y > me.cont.position.y) ? -1 : 1;
		vx *= delta * 0.4 * this.enemy_speed;
		vy *= delta * 0.4 * this.enemy_speed;

		let new_x = this.cont.position.x + vx;
		let new_y = this.cont.position.y + vy;

		this.move_to({x: new_x, y: new_y});



		for (let blade of this.blades) {
			blade.rotate(blade.spin * delta * 0.01);
		}

		if (this.age < 120) {
			return;
		}


		var response = new SAT.Response();
		for (let blade of this.blades) {

			var polygon = blade.col;
			var circle = me.circle.col;

			var collided = SAT.testPolygonCircle(polygon, circle, response);

			response.clear();

			if (collided == true) {
				me.hurt(blade.dmg);
				break;
			}
		}
	}

	hurt(blade_num, dmg) {
		let last_hurt = this.last_hurts[blade_num];
		
		if ((last_hurt == null) || (Date.now() - last_hurt > 800)) {
			this.last_hurts[blade_num] = Date.now();
			this.hp -= dmg;
			console.log("dmg", dmg);
			if (this.hp < 0) {
				audio.play("D");
			} else {
				audio.play("F");
			}
			this.hpsprite.scale.set(this.enemy_radius * this.hp/this.hp_max, this.enemy_radius);
		}
	}

	move_to(pos) {
		if (this.dead) {
			return;
		}
		this.cont.position.x = pos.x;
		this.cont.position.y = pos.y;

		this.circle.translate(pos.x, pos.y);
		for (let blade of this.blades) {
			blade.translate(pos.x, pos.y);
		}
	}

	delete() {
		this.dead = true;
		for (let blade of this.blades) {
			blade.kill();
		}
		if (this.interval != null) {
			clearInterval(this.interval);
		}
		if (this.cont.destroy != null) {
			this.cont.destroy();
		}
		
		// delete this.circle;
		// delete this.blades;

	}
	
}
function hp_color(hp) {
	if (hp <= 100) {
		return 0x00ff00;
	} else if (hp <= 200) {
		return 0x00ff22;
	} else {
		return 0xffff00;
	}



	// function rgbToHex(r, g, b) {
	//   return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	// }

	// function n_to_color(n) {
	// 	n -= 255;
	// 	if (n < 0) {
	// 		return rgbToHex(-n, 255, 0);
	// 	} else {
	// 		return rgbToHex(0, 255, n);
	// 	}
	// }
	// // 0 - 510
	// return n_to_color(hp / 100);
}



