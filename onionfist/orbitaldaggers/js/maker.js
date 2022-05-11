const TEXTBOX_WIDTH = 100;

var maker = {
	app: function() {
		var pixi_app = new PIXI.Application({
		    width: window.innerWidth/1,
		    height: window.innerHeight/1,
		    transparent: false,
		    resolution: window.devicePixelRatio || 1,
		    backgroundColor: 0x000000
		});
		document.getElementById("canvas_container").appendChild(pixi_app.view);
		pixi_app.renderer.autoResize = false;

		pixi_app.renderer.resize(window.innerWidth, window.innerHeight);
		window.onresize = function()
		{
		    pixi_app.renderer.resize(window.innerWidth, window.innerHeight);
		}
		return pixi_app;
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
	background: function(asset) {
		let texture = assets[asset];
		var sprite = new PIXI.Sprite(texture);
		sprite.x = 0;
		sprite.y = 0;
		// sprite.scale.set(0.7, 0.7);
		// sprite.pivot.set(gsize/2, gsize * 3.2);
		bg_cont.addChild(sprite);
		return sprite;
	},
	player_hp1: function(team) {
		let texture = assets['hp1'];
		var sprite = new PIXI.Sprite(texture);
		sprite.pivot.set(-50*team, 17);
		sprite.scale.set(0.8, 0.8);
		return sprite;
	},
	player_hp2: function(team) {
		let texture = assets['hp2'];
		var sprite = new PIXI.Sprite(texture);
		sprite.pivot.set(-50*team, 17);
		sprite.scale.set(0.8, 0.8);
		return sprite;
	},
}
