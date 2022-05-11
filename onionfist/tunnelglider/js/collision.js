var collision = {
	update: function() {
		this.wall_hit();
		this.obstacle_hit();
	},
	wall_hit: function() {

		// wall collision
		let from_center = Math.pow((Math.pow(player.position.x,2) + Math.pow(player.position.y,2)),0.5);
		if (from_center > 3.0) {
			player.position.x *= 3 / from_center;
			player.position.y *= 3 / from_center;
		}
	},
	obstacle_hit: function() {
		for (var i=id_low;i<id_big;i++) {
			var mesh = scene.getMeshByName("mesh" + i);

			if (player.intersectsMesh(mesh,true)) {
				state.set("death");
			}
		}
	}
}
