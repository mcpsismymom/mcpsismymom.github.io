var a = {
    p: function(q,r,s, imat, bounce, mass, friction, jump, air) {
    	maker.plat(q,r,s, imat, bounce, mass, friction, jump, air);
    },
    e: function(q) {
    	maker.end(q);
    },
    re: function(id, q, r, s) { // reset
        console.log("re", id);
        let mesh = maker.scene.getMeshByName(id);
        
        mesh.rotation.x = r[1];
        mesh.rotation.y = r[0];
        mesh.rotation.z = r[2];
        mesh.position.x = q[0];
        mesh.position.y = q[1];
        mesh.position.z = q[2];
        mesh.scaling.x = s[0];
        mesh.scaling.y = s[1];
        mesh.scaling.z = s[2];
        if (mesh.physicsImpostor) {
            mesh.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0,0,0));
            mesh.physicsImpostor.setAngularVelocity(new BABYLON.Quaternion(0,0,0,0));
        }
    },
}