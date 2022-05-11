var app;
var bg_cont;
var background;
var midground;
var me;
var enemies = [];

var wave_num = null;

var start = {
	init: function() {
		app = maker.app();
		bg_cont = new PIXI.Container();
		app.stage.addChild(bg_cont);
		me = new Player();

	}
}