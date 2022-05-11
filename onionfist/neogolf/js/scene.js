var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var sceneToRender = null;
var linesystem = null;
var player;
var camera;
var endings = [];
var player_ghost;
var ingame = false;
var won = false;
var last_pos = [];
const INF = 9999999999;
var seconds_since_first_swing = 0;

var createDefaultEngine = function() {
    return new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true,
        disableWebGL2Support: false
    });
};

var loadMeshes = async function(scene) {
    var spellL = await BABYLON.SceneLoader.LoadAssetContainerAsync("assets/models/spellDisk.glb");
    scene.addMesh(spellL.meshes[0], true)

    var spellR = await BABYLON.SceneLoader.LoadAssetContainerAsync("assets/models/spellDisk.glb");
    scene.addMesh(spellR.meshes[0], true)
    spellR.meshes[0].scaling.z = 1;

    var orbG = await BABYLON.SceneLoader.LoadAssetContainerAsync("assets/models/greenEnergyBall.glb");

    spellL.animationGroups[0].speedRatio = 1
    spellR.animationGroups[0].speedRatio = -1
    var res = {
        animationGroupL: spellL.animationGroups[0],
        animationGroupR: spellR.animationGroups[0],
        spellL: spellL.meshes[0],
        spellR: spellR.meshes[0],
        orbs: [orbG.meshes[0]],
        lights: []
    }
    res.spellL.scaling.scaleInPlace(0)
    res.spellR.scaling.scaleInPlace(0)

    res.orbs = res.orbs.map((o, i) => {
        // Create lights
        var pointLight = new BABYLON.PointLight("light1", new BABYLON.Vector3(0, 3, 0), scene);
        pointLight.intensity = 0.3;
        res.lights.push(pointLight)

        // Add physics root for spheres
        var sphere = BABYLON.Mesh.CreateSphere("s", 16, 0.7, scene)
        sphere.isVisible = false
        o.setParent(sphere);
        sphere.position.y = 3;
        sphere.scaling.scaleInPlace(0.3)
        o.scaling.scaleInPlace(0.03)
        o.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI)
        o.scaling.z *= Math.random() > 0.5 ? -1 : 1;
        scene.addMesh(o, true)
        return sphere
    })
    return res
}
var createScene = async function() {
    // Create scene and environment
    var scene = new BABYLON.Scene(engine);
    // scene.getEngine().displayLoadingUI()

    // var camera = new BABYLON.ArcRotateCamera("cam", Math.PI * 5 / 4, Math.PI / 4, 12, BABYLON.Vector3.Zero());
    // camera.wheelDeltaPercentage = 0.0001;
    // camera.lowerRadiusLimit = 15 * 3;
    // camera.upperRadiusLimit = 20 * 3;

    camera = new BABYLON.FollowCamera("camera1", new BABYLON.Vector3(0, 10, -10), scene);
    camera.upperRadiusLimit = 40;
    camera.lowerRadiusLimit = 10;
    camera.rotationOffset = 90 * 2.5;//Math.PI;
    camera.heightOffset = 5;
    

    camera.attachControl(canvas, true);
    camera.inputs.clear();

    var environment = scene.createDefaultEnvironment({
        skyboxSize: 300
    });

    // environment.setMainColor(new BABYLON.Color3(0.05, 0.05, 0.05));

        //Light direction is up and left
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
    light.diffuse = new BABYLON.Color3(0, 0, 0.3);
    light.specular = new BABYLON.Color3(0, 1, 0);
    light.groundColor = new BABYLON.Color3(0, 1, 0);
    

    // Set up new rendering pipeline
    var pipeline = new BABYLON.DefaultRenderingPipeline("default", true, scene, [camera]);
    scene.imageProcessingConfiguration.toneMappingEnabled = true;
    scene.imageProcessingConfiguration.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_ACES;
    scene.imageProcessingConfiguration.exposure = 3;
    pipeline.glowLayerEnabled = true;
    pipeline.glowLayer.intensity = 0.5;



    //Array of lines to construct linesystem
    const myLines = [
        [   new BABYLON.Vector3(0, 0, 0),
            new BABYLON.Vector3(0, 0, 10)
        ]
    ];

    //Create linesystem
    linesystem = BABYLON.MeshBuilder.CreateLineSystem("linesystem", {lines: myLines}); 
    linesystem.color = new BABYLON.Color3(0, 1, 0);

    // Use cannon physics plugin
    var gravityVector = new BABYLON.Vector3(0, -10, 0)
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(gravityVector, physicsPlugin);

    // Load assets
    var assets = await loadMeshes(scene);


    // Add trail to orbs
    assets.orbs.forEach((orb, i) => {
        player = orb;

        player_ghost = BABYLON.MeshBuilder.CreateSphere("player_ghost", scene);
        player_ghost.isVisible = false;

        orb.physicsImpostor = new BABYLON.PhysicsImpostor(orb, BABYLON.PhysicsImpostor.SphereImpostor, {
            mass: 1,
            restitution: 0.8,
            friction: 1
        });
        var trail = new BABYLON.TrailMesh('orb trail', orb, scene, 0.2, 30, true);
        var sourceMat = new BABYLON.StandardMaterial('sourceMat', scene);
        var color = new BABYLON.Color3.Red();
        if (i == 1) {
            color = new BABYLON.Color3.Green();
        } else if (i == 2) {
            color = new BABYLON.Color3.Yellow();
        }
        sourceMat.emissiveColor = sourceMat.diffuseColor = color;
        sourceMat.specularColor = new BABYLON.Color3.Black();
        assets.lights[i].diffuse = color.scale(0.5);
        assets.lights[i].specular = color.scale(0.5);
        trail.material = sourceMat;

        // attach parent
        linesystem.parent = player;
        // camera.parent = player;
        // camera.target = player.position;
        camera.lockedTarget = player_ghost;
    });





    // Setup controller data

    // On every frame listen to controller input
    scene.onBeforeRenderObservable.add(() => {
        var delta = scene.getEngine().getDeltaTime();
        update.update(delta);

        // Position lights on orbs
        assets.lights.forEach((l, i) => {
            l.position.copyFrom(assets.orbs[i].position);
        })

    })

    scene.getEngine().hideLoadingUI();
    return scene;
};
window.initFunction = async function() {

    var asyncEngineCreation = async function() {
        try {
            return createDefaultEngine();
        } catch (e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    window.scene = createScene();
};
initFunction().then(() => {
    scene.then(returnedScene => {
        sceneToRender = returnedScene;
        maker.scene = sceneToRender;
        boot.init();
    });

    engine.runRenderLoop(function() {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
});

// Resize
window.addEventListener("resize", function() {
    engine.resize();
});


