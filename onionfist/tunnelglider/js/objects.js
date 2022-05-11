var objects = {
	update: function(delta) {
		for (var i=id_low;i<id_big;i++) {
			var mesh = scene.getMeshByName("mesh" + i);
			if (settings.graphics == "High") {
				let x = Math.abs(mesh.position.z - player.position.z);
				// let new_color_r = (-0.003) * Math.pow((x - 15),2) + 0.8;
				let new_color_r = (-0.001) * Math.pow((x - 30),2) + 1.2;
				mesh.material.diffuseColor.r = new_color_r;
			}
			
			for (let command of mesh.commands) {

				var euler;
				if (command.prop[0] == "rotation") {
					euler = (mesh.rotationQuaternion != null) ? mesh.rotationQuaternion.toEulerAngles() : mesh.rotation;
				} else {
					euler = mesh.position;
				}
				

				var X = euler._x;
				var Y = euler._y;
				var Z = euler._z;

				var obj = {
					'x': X,
					'y': Y,
					'z': Z
				}
				obj[command.prop[1]] = command.fn(obj, score.temp_num, command.consts, delta);

				const vec = new BABYLON.Vector3(obj.x, obj.y, obj.z);
				mesh[command.prop[0]] = vec;

			}


		}
	}
}