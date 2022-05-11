const MOVEMENT_SPEED = 1.5;


var motion = {
	update: function(delta) {
		var next_pos_options = this.next_pos(delta);
		for (let next_pos of next_pos_options) {
			if (this.is_in_bounds(next_pos)) {
				me.move_to(next_pos);
				break;
			}
		}

		let follow_camera = {
			x: me.cont.position.x - app.screen.width / 2,
			y: me.cont.position.y - app.screen.height / 2
		}

		app.stage.pivot.copyFrom(follow_camera);

	},
	next_pos: function(delta) {

		var vx = 0;
		var vy = 0;

		if (controls.left) vx -= 1;
		if (controls.right) vx += 1;
		if (controls.up) vy -= 1;
		if (controls.down) vy += 1;
		
		// diagonal
		if (Math.abs(vx) + Math.abs(vy) == 2) {
			vx *= 0.71;
			vy *= 0.71;
		}

		vx *= upgrades.find_scale("speed");
		vy *= upgrades.find_scale("speed");

		return [{
			x: me.cont.position.x + vx * delta * MOVEMENT_SPEED,
			y: me.cont.position.y + vy * delta * MOVEMENT_SPEED
		}, {
			x: me.cont.position.x,
			y: me.cont.position.y + vy * delta * MOVEMENT_SPEED
		}, {
			x: me.cont.position.x + vx * delta * MOVEMENT_SPEED,
			y: me.cont.position.y
		}]
	},
	anim_start: function() {
		me.body.play();
	},
	anim_stop: function() {
		if ((!controls.left) && (!controls.right) && (!controls.up) && (!controls.down)) {
			me.body.stop();
			me.body.currentFrame = 0;
		}
	},
	is_in_bounds: function(next_pos) {
		if (next_pos.x < 0) {
			return false;
		}
		if (next_pos.y < 0) {
			return false;
		}
		if (next_pos.x > 550) {
			return false;
		}
		if (next_pos.y > 425) {
			return false;
		}
		return true;
	}
	
}