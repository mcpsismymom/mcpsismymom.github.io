const TEXTBOX_WIDTH = 100;

var maker = {
	app: function() {
		var pixi_app = new PIXI.Application({
		    width: 600,//window.innerWidth/1,
		    height: 500,//window.innerHeight/1,
		    transparent: false,
		    resolution: window.devicePixelRatio || 1,
		    backgroundColor: 0x19323C
		});
		document.getElementById("canvas_container").appendChild(pixi_app.view);
		pixi_app.renderer.autoResize = false;

		// pixi_app.renderer.resize(window.innerWidth, window.innerHeight);
		window.onresize = function()
		{
		    // pixi_app.renderer.resize(window.innerWidth, window.innerHeight);
		    if (state.playing) {
		    	size.ingame();
		    }
		    
		}
		return pixi_app;
	},
	container: function() {
		var container = new PIXI.Container();
		app.stage.addChild(container);
		return container;
	},
	floating_label: function(text, pos, tweak_options={}) {
		var default_options = {
			fontFamily : 'Arial',
			fontSize: 14,
			fill : 0xF2545B,
			align : 'center'
		}
		var options2 = {
			...default_options,
			...tweak_options
		}
		var label = new PIXI.Text(text, options2);
		label.pivot.set(label.width / 2, 0);
		label.position.x = pos.x;
		label.position.y = pos.y;
		return label;
	},
	player_nametag: function(name) {
		const options = {
			fontFamily : 'Arial',
			fontSize: 14,
			fill : 0xF2545B,
			align : 'center'
		}
		var label = new PIXI.Text(name, options);
		label.pivot.set(label.width / 2, 28);
		return label;
	},
	background: function() {
		let texture = assets[`bg_boiled_egg1`];
		var sprite = new PIXI.Sprite(texture);
		sprite.x = 0;
		sprite.y = 0;
		// sprite.scale.set(0.7, 0.7);
		// sprite.pivot.set(gsize/2, gsize * 3.2);
		app.stage.addChild(sprite);
		return sprite;
	},
	overlay: function(sprite, scaling) {
		let texture = assets[sprite];
		var sprite = new PIXI.Sprite(texture);
		sprite.pivot.set(sprite.width/2, sprite.height/2);
		sprite.scale.set(scaling, scaling);
		return sprite;
	}
}
