var rot = {
	x:0,
	y:0,
	z:0
}
const ballSpeed = 0.02;
const steerSpeed = 0.002;
var speed_multiplier = 1;

var motion = {
	update: function(delta) {
		this.turn_player(delta);
		this.move_player(delta);
		this.move_tube();
		this.move_camera();
	},
	move_player: function(delta) {
        // apply player movement
        
        var vx = ballSpeed * Math.sin(rot.y - 3.14);
        var vz = ballSpeed * (-1);
        var vy = ballSpeed * Math.sin(rot.x);
        player.position.x += vx * delta * speed_multiplier;
        player.position.z += vz * delta * speed_multiplier;
        player.position.y += vy * delta * speed_multiplier;
    },
	turn_player: function(delta) {
		// steer
		player.rotation.x = rot.x;
		player.rotation.y = rot.y;
		player.rotation.z = rot.z;

		var byy = 0; var byx = 0;
		if (controls.right) {byy = 1};
		if (controls.left)  {byy = -1};
		if (controls.up)    {byx = 1};
		if (controls.down)  {byx = -1};
		rot.y += byy * steerSpeed * delta;
		rot.x += byx * steerSpeed * delta;

		rot.x *= (0.98); rot.y *= (0.98);
		// rot.z = Math.sin(frame * 0.001);
	},
	move_tube: function() {
		tube.position.z = Math.floor(player.position.z / 60) * 60 + 120;
	},
	move_camera: function() {
		camera.position.x = player.position.x * 0.7;
		camera.position.z = player.position.z + 8;
		camera.position.y = player.position.y * 0.7;
	}
}

