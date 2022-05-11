const STOP_CONFIRM_TIME = 500; // ms
const DEFAULT_PUNCH = 2;
const STARTING_ANGLE = Math.PI / 2;
const ROLLING_FRICTION = 0.975;
const MAX_PUNCH = 10;
const TURN_SPEED = 0.001;
const DEATH_LEVEL = -10;
const STOP_THRESHOLD = 0.15;

var update = {
	punch: DEFAULT_PUNCH,
	angle: STARTING_ANGLE,
	stopped_time: 0,
	punch_inc: true,
	init: function() {
		
	},
	update: function(delta) {
		if (!ingame) {
			return;
		}
		
		// angular vel
		var is_flying = false;
		var lin_vel = player.physicsImpostor.getLinearVelocity();
		if (Math.abs(lin_vel.x) > STOP_THRESHOLD) is_flying = true;
		if (Math.abs(lin_vel.y) > STOP_THRESHOLD) is_flying = true;
		if (Math.abs(lin_vel.z) > STOP_THRESHOLD) is_flying = true;

		player_ghost.position = player.position;


		if (is_flying) {
			linesystem.isVisible = false;
			this.stopped_time = 0;
		} else {
			// pivot
			if (controls.left) {
				this.angle -= TURN_SPEED * delta;
			}
			if (controls.right) {
				this.angle += TURN_SPEED * delta;
			}
			if ((controls.space) && (this.stopped_time >= STOP_CONFIRM_TIME)) {
				this.punch += 0.003 * delta * ((this.punch_inc) ? 1 : -1);
				if (this.punch > MAX_PUNCH) {
					this.punch = MAX_PUNCH;
					this.punch_inc = false;
				} else if (this.punch < DEFAULT_PUNCH) {
					this.punch = DEFAULT_PUNCH
					this.punch_inc = true;
				}
				var width_percent = Math.round(this.punch / MAX_PUNCH * 100);
				$("#punch_inner").css("width", width_percent + "%");
			}

			linesystem.rotation.y = this.angle;
			linesystem.scaling.z = this.punch / 10;

			if (this.stopped_time < STOP_CONFIRM_TIME) {
				this.stopped_time += delta;
				is_flying = true;
			}
		}

		if (is_flying) {
			camera.rotationOffset = 90 * 2.5;
		} else {
			cleanup.reset_rotation();
			linesystem.isVisible = true;
			player_ghost.rotation.y = linesystem.rotation.y;
			camera.rotationOffset = linesystem.rotation.y + 180;
		}

		// Ang Vel Damping: https://forum.babylonjs.com/t/slowing-moving-sphere-meshes/7427
		const new_ang_vel = player.physicsImpostor.getAngularVelocity().scale(ROLLING_FRICTION);
		player.physicsImpostor.setAngularVelocity(new_ang_vel);

		// ending

		if ((last_pos.length > 0) && (transitioning == false)) {
			seconds_since_first_swing += delta / 1000;
		}
		if (seconds_since_first_swing > 2) {
			for (var i=0;i<maker.end_count;i++) {
				let ending = endings[i];
				if (ending.intersectsPoint(player.position)){
					ending.material = decorations.end_touched;
					change_state.win();
				}
			}

			if (player.position.y < DEATH_LEVEL) {
				player.position.y = DEATH_LEVEL;
				change_state.die();
			}
		}

		
	},
	shoot: function() {
		if (this.stopped_time < STOP_CONFIRM_TIME) {
			return;
		}
		const punch_scaled = this.punch * Math.sqrt(this.punch);

		const vx = punch_scaled * Math.sin(this.angle);
		const vz = punch_scaled * Math.cos(this.angle);
		var vel = new BABYLON.Vector3(vx, 0, vz);
		player.physicsImpostor.setLinearVelocity(vel);

		this.punch = DEFAULT_PUNCH;
		this.punch_inc = true;
		
		last_pos.push(player.position);
		const swings = last_pos.length;
		$("#swings").text(`${swings} SWINGS`);


		var width_percent = Math.round(DEFAULT_PUNCH / MAX_PUNCH * 100);
		$("#punch_inner").animate({"width": width_percent + "%"}, 1000);
	}
}
