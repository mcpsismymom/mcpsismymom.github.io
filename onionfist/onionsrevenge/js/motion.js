const MOVEMENT_SPEED = 2.4; //1.5;
const ROLLING_SPEED = 8;

var motion = {
	direction: null,
	update: function(delta) {
		var next_pos_options = this.next_pos(delta);
		for (let next_pos of next_pos_options) {
			if (this.is_in_bounds(next_pos)) {
				me.move_to(next_pos);
				break;
			}
		}

		// let follow_camera = {
		// 	x: me.cont.position.x - app.screen.width / 2,
		// 	y: me.cont.position.y - app.screen.height * 6 / 7
		// }

		// app.stage.pivot.copyFrom(follow_camera);
	},
	next_pos: function(delta) {

		var vx = 0;
		var vy = 0;

		if (controls.left) vx -= 1;
		if (controls.right) vx += 1;

		if (rolling.time > 0) {
			vx = rolling.direction;
		}

		if (vx < 0) {
			me.body.scale.set(-PLAYER_SCALE, PLAYER_SCALE);
			this.anim_start();
			this.direction = -1;
		} else if (vx > 0) {
			me.body.scale.set(PLAYER_SCALE, PLAYER_SCALE);
			this.anim_start();
			this.direction = 1;
		} else {
			if (rolling.time <= 0) {
				this.anim_stop();
			} else {
				this.anim_start();
			}
		}


		if (rolling.blink_time > 0) {
			me.cont.alpha = (Math.sin(score.temp_num / 5) + 1) / 3;
		} else {
			me.cont.alpha = 1;
		}

		// if (controls.up) vy -= 1;
		// if (controls.down) vy += 1;
		
		// diagonal
		if (Math.abs(vx) + Math.abs(vy) == 2) {
			vx *= 0.71;
			vy *= 0.71;
		}

		var speed = (rolling.time > 0) ? ROLLING_SPEED : MOVEMENT_SPEED;
		return [{
			x: me.cont.position.x + vx * delta * speed,
			y: me.cont.position.y + vy * delta * speed
		}]
	},
	anim_start: function() {
		me.body.play();
	},
	anim_stop: function() {
		me.body.stop();
		me.body.currentFrame = 0;
		// if ((!controls.left) && (!controls.right) && (!controls.up) && (!controls.down)) {
		// 	me.body.stop();
		// 	me.body.currentFrame = 0;
		// }
	},
	is_in_bounds: function(next_pos) {
		if (next_pos.x < app.screen.width * 1/15) {
			return false;
		}
		if (next_pos.x > app.screen.width * 14/15) {
			return false;
		}
		return true;
	}
	
}