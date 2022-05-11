var canvas = document.getElementById("renderCanvas");

var engine = null;
var scene = null;
var camera;
var light;
var wings;
var player;
var fountain;

var time;

var setup = {
    init: async function() {
        await this.make_engine();
        await this.make_scene();
        await this.load_assets();
        await this.start_rendering();
    },
    make_engine: async function() {
        function createDefaultEngine() {
            return new BABYLON.Engine(canvas, true, {
                preserveDrawingBuffer: true,
                stencil: true,
                disableWebGL2Support: false
            });
        };

        async function asyncEngineCreation() {
            try {
                return createDefaultEngine();
            } catch (e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
            }
        }

        return new Promise(async (resolve) => {
            window.engine = await asyncEngineCreation();

            // Resize
            window.addEventListener("resize", function() {
                window.engine.resize();
            });

            resolve();
        });
    },

    make_scene: async function() {

        var delayCreateScene = function() {
            // Create a scene.
            var scene = new BABYLON.Scene(engine);


            light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
            light.intensity = 1.2;
            light.parent = player;


            var tube_path = [
                new BABYLON.Vector3(0, 0, 0.0),
                new BABYLON.Vector3(0, 0, -300),
            ];

            var groundTexture = new BABYLON.Texture("assets/textures/earth.jpg", scene);
            groundTexture.vScale = groundTexture.uScale = 5;
            var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
            groundMaterial.diffuseTexture = groundTexture;

            // tunnel
            tube = BABYLON.MeshBuilder.CreateTube("tube", {
                path: tube_path,
                radius: 3.5,
                sideOrientation: BABYLON.Mesh.DOUBLESIDE,
                updatable: true
            }, scene);
            tube.material = groundMaterial;
            tube.position.z = 260;


            player = BABYLON.Mesh.CreateBox("player",0.5,scene);
            player.scaling = new BABYLON.Vector3(0.5, 0.15, 0.5)
            player.position = new BABYLON.Vector3(0,0,0);

            camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 2, -10), scene);
            camera.setTarget(new BABYLON.Vector3(0,0,-10000000));

            // camera = new BABYLON.FollowCamera("camera1", new BABYLON.Vector3(0, 10, -10), scene);
            // camera.upperRadiusLimit = 40;
            // camera.lowerRadiusLimit = 10;
            // camera.rotationOffset = 0; //90 * 2.5;//Math.PI;
            // camera.heightOffset = 0; //5;
            // camera.attachControl(canvas, true);
            // camera.inputs.clear();
            // camera.lockedTarget = player;


            // Use cannon physics plugin
            var gravityVector = new BABYLON.Vector3(0, -10, 0)
            var physicsPlugin = new BABYLON.CannonJSPlugin();
            scene.enablePhysics(gravityVector, physicsPlugin);

            if (settings.graphics == "High") {
                fountain = decorations.make_fountain();
                fountain.parent = player;
            }
            


            
            return scene;
        };
        window.scene = delayCreateScene();
    },

    start_rendering: function() {
        if (!engine) throw 'engine should not be null.';
        engine.runRenderLoop(function() {
            if (scene && scene.activeCamera) {
                scene.render();
                if (time == null) {
                    time = Date.now();
                }
                var delta = Date.now() - time;
                update.render_loop(delta);
                time = Date.now();
            }
        });
    },

    load_assets: async function() {
        return new Promise((resolve) => {
            BABYLON.SceneLoader.ImportMesh("", "assets/models/", "jet.obj", scene, function(newMeshes) {
                // Create a default arc rotate camera and light.
                // scene.createDefaultCameraOrLight(true, true, true);

                // The default camera looks at the back of the asset.
                // Rotate the camera by 180 degrees to the front of the asset.
                // scene.activeCamera.alpha += Math.PI;
                wings = newMeshes[0];
                wings.scaling = new BABYLON.Vector3(0.4, 3, 0.4);
                wings.parent = player;
                // wings.visible = false;
                resolve();
            });
        });
    },
    setgrav: function (x, y, z) {
        scene.gravity = new BABYLON.Vector3(x, y, z);
        scene.getPhysicsEngine().setGravity(new BABYLON.Vector3(x, y, z));
        player.applyGravity = true;
    }

}