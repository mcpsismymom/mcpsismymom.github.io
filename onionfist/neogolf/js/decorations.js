var decorations = {
	init: function() {

        this.plat1 = new BABYLON.StandardMaterial("plat1", maker.scene);
        this.plat1.diffuseColor = new BABYLON.Color3(1, 0, 1);
        this.plat1.emissiveColor = new BABYLON.Color3(0, 0, 0);


        this.plat2 = new BABYLON.StandardMaterial("plat2", maker.scene);
        this.plat2.diffuseColor = new BABYLON.Color3(1, 0, 1);
        this.plat2.emissiveColor = new BABYLON.Color3(0, 0, 0.7);

        this.plat3 = new BABYLON.StandardMaterial("plat3", maker.scene);
        this.plat3.diffuseColor = new BABYLON.Color3(1, 0, 1);
        this.plat3.emissiveColor = new BABYLON.Color3(0, 0.3, 0.3);


        this.plat4 = new BABYLON.StandardMaterial("plat3", maker.scene);
        this.plat4.diffuseColor = new BABYLON.Color3(1, 0, 1);
        this.plat4.emissiveColor = new BABYLON.Color3(0.7, 0, 0);




        this.end = new BABYLON.StandardMaterial("end", maker.scene);
        this.end.diffuseColor = new BABYLON.Color3(1, 0, 1);
        this.end.emissiveColor = new BABYLON.Color3(0, 1, 0);

        this.end_touched = new BABYLON.StandardMaterial("end_touched", maker.scene);
        this.end_touched.diffuseColor = new BABYLON.Color3(1, 0, 1);
        this.end_touched.emissiveColor = new BABYLON.Color3(0, 0, 1);


        // var pbr = new BABYLON.PBRMetallicRoughnessMaterial("pbr", this.scene);
        // pbr.baseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        // pbr.metallic = 0.9;
        // pbr.roughness = 0.1;
        // pbr.glossiness = 1.0;
        // ground.material = pbr;

        // var plat1 = new BABYLON.StandardMaterial("plat1", this.scene);
        // plat1.diffuseTexture = new BABYLON.Texture("textures/pm1.png", this.scene);
        // plat1.diffuseTexture.uScale = plat1.diffuseTexture.vScale = 1.0;
        // // plat1.backFaceCulling = false;
        // // plat1.freeze();
        // ground.material = plat1;

	}
}