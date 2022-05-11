var decorations = {
    particleSystem: null,
	init: function() {

	},
    make_fountain: function(scene) {
        var fountain = BABYLON.Mesh.CreateBox("foutain", 1.0, scene);
        var invisibleTeture = new BABYLON.StandardMaterial("waterTexture", scene);
        invisibleTeture.alpha = 0.0;
        fountain.material = invisibleTeture;
        // Create a particle system
        this.particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
        //Texture of each particle
        this.particleSystem.particleTexture = new BABYLON.Texture("assets/textures/flare.png", scene);
        // Where the particles come from
        this.particleSystem.emitter = fountain; // the starting object, the emitter
        this.particleSystem.minEmitBox = new BABYLON.Vector3(-0.2, 0, 0); // Starting all from
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(0.2, 0, 0); // To...
        // Colors of all particles
        this.particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        this.particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        this.particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
        // Size of each particle (random between...
        this.particleSystem.minSize = 0.1;
        this.particleSystem.maxSize = 0.5;
        // Life time of each particle (random between...
        this.particleSystem.minLifeTime = 0.1;
        this.particleSystem.maxLifeTime = 0.3;
        // Emission rate
        this.particleSystem.emitRate = 100;
        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        // Set the gravity of all particles
        this.particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
        // Direction of each particle after it has been emitted
        this.particleSystem.direction1 = new BABYLON.Vector3(-2, 0.0, 3);
        this.particleSystem.direction2 = new BABYLON.Vector3(2, 0.0, -3);
        // Angular speed, in radians
        this.particleSystem.minAngularSpeed = 0;
        this.particleSystem.maxAngularSpeed = Math.PI;
        // Speed
        this.particleSystem.minEmitPower = 1;
        this.particleSystem.maxEmitPower = 3;
        this.particleSystem.updateSpeed = 0.009; // 0.005
        this.particleSystem.start();
        return fountain;
    }
}