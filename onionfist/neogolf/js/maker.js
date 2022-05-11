var maker = {
    scene: null,
    plat_count: 0,
    end_count: 0,
    plat: function(pos, rot, siz, imat, bounce, mass, friction, jump, air) {
        // Create physics impostors
        var ground = BABYLON.Mesh.CreateBox("P"+this.plat_count, 1, this.scene);

        imat = Math.round(Number(imat));
        ground.material = decorations["plat"+imat];
        
        ground.scaling = new BABYLON.Vector3(siz[0], siz[1], siz[2]);
        ground.position = new BABYLON.Vector3(pos[0], pos[1], pos[2]);
        ground.rotation = new BABYLON.Vector3(rot[1], rot[0], rot[2]);

        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, {
            mass: mass,
            restitution: bounce,
            friction: friction
        });
        this.plat_count += 1;
    },
    end: function(pos) {
        // Create physics impostors
        var ground = BABYLON.Mesh.CreateBox("E"+this.end_count, 1, this.scene);

        ground.material = decorations.end;

        ground.position = new BABYLON.Vector3(pos[0], pos[1], pos[2]);

        endings.push(ground);

        this.end_count += 1;
    }
}