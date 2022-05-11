var cleanup = {
  reset_rotation: function() {
    player.rotation = new BABYLON.Vector3(0,0,0);
    player.rotationQuaternion = BABYLON.Quaternion.RotationAxis(new BABYLON.Vector3(0,0,0),0);
    player.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,0));
    player.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(0,0,0,0));
  },
  reset_player: function(reset_last_pos=false) {

    if ((last_pos.length == 0) || (reset_last_pos)) {
      last_pos = [];
      player.position = new BABYLON.Vector3(0,4,0);
      update.punch = DEFAULT_PUNCH;
      update.angle = STARTING_ANGLE;
      seconds_since_first_swing = 0;
    } else {
      player.position = last_pos[last_pos.length - 1];
      update.punch = DEFAULT_PUNCH;
    }
    is_flying = true;
    update.stopped_time = 0;
    
    this.reset_rotation();

    const g = new BABYLON.Vector3(0, -10, 0);
    maker.scene.getPhysicsEngine().setGravity(g);

  },
  reset_map: function() {
    for (let i=0;i<maker.plat_count;i++) {
      var mesh_name = `P${i}`;
      var mesh = maker.scene.getMeshByName(mesh_name);
      mesh.dispose();
    }

    for (let i=0;i<maker.end_count;i++) {
      var mesh_name = `E${i}`;
      var mesh = maker.scene.getMeshByName(mesh_name);
      mesh.dispose();
    }

    maker.plat_count = 0;
    maker.end_count = 0;
    endings = [];
  },
}