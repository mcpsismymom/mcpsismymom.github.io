var cleanup = {
	remove_passed: function() {
		if (id_low == id_big) {
			return;
		}
		var mesh = scene.getMeshByName("mesh" + id_low);
		if (mesh.position.z - 9 > player.position.z) {
			mesh.dispose();
			id_low += 1;
		}
	},
	total_cleanup: function() {

		for (let i=id_low;i<id_big;i++) {
			var mesh = scene.getMeshByName("mesh" + i);
			mesh.dispose();
		}

		id_low = 0;
		id_big = 0;

		player.position = new BABYLON.Vector3(0,0,0);

	}
}