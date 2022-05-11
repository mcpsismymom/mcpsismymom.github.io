var id_low = 0;
var id_big = 0;


var maker = {
	makeBox: function(posList, rotList, sizList, matIndex, commands=[]) {
		let pX = posList[0]; let pY = posList[1]; let pZ = posList[2];
		let rX = rotList[0]; let rY = rotList[1]; let rZ = rotList[2];
		let sX = sizList[0]; let sY = sizList[1]; let sZ = sizList[2];
		// mesh item
		var mesh = BABYLON.Mesh.CreateBox("mesh" + id_big, 1, scene);
		mesh.scaling = new BABYLON.Vector3(sX,sY,sZ);
		// mesh.position.x = pX * (-1);
		// mesh.position.y = pY;
		// mesh.position.z = pZ;
		mesh.position = new BABYLON.Vector3(-pX, pY, pZ);
		mesh.rotation = new BABYLON.Vector3(rX * (Math.PI / 180), rY * (Math.PI / 180), rZ * (Math.PI / 180))
		// mesh.rotation.x = rX * (Math.PI / 180);
		// mesh.rotation.y = rY * (Math.PI / 180);
		// mesh.rotation.z = rZ * (Math.PI / 180);
		// material
		var new_mat = new BABYLON.StandardMaterial("new_mat" + id_big, scene);
		if (settings.graphics == "High") {
			new_mat.diffuseColor = new BABYLON.Color3(10/255, 10/255, 20/255);
		} else {
			new_mat.diffuseColor = new BABYLON.Color3(190/255, 10/255, 20/255);
		}
		
		new_mat.alpha = 0.8;
		mesh.material = new_mat;

		// collision/physics
		mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0.0, restitution: 0.0 }, scene);
		mesh.commands = commands;
		id_big += 1;
	},
	makeCylin: function(posList, rotList, sizList, matIndex) {
		let pX = posList[0]; let pY = posList[1]; let pZ = posList[2];
		let rX = rotList[0]; let rY = rotList[1]; let rZ = rotList[2];
		let sX = sizList[0]; let sY = sizList[1]; let sZ = sizList[2];
		// mesh item
		var mesh = BABYLON.Mesh.CreateCylinder("mesh" + id_big, sY, sX, sZ, 12, 1, scene, false, BABYLON.Mesh.DEFAULTSIDE);
		mesh.scaling = new BABYLON.Vector3(sX,sY,sZ);
		mesh.position.x = pX * (-1);
		mesh.position.y = pY;
		mesh.position.z = pZ;
		mesh.rotation.x = rX;// * (Math.PI / 180);
		mesh.rotation.y = rY;// * (Math.PI / 180);
		mesh.rotation.z = rZ;// * (Math.PI / 180);
		// material
		mesh.material = matList[matIndex];
		// physics
		mesh.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 0.0, restitution: 0.0 }, scene);
	}
}

