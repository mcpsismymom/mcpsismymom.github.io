var app;
var background;
var midground;
var me;
var birds = [];
var eggs = [];

var roll_reminder;

var wave_num = null;


var start = {
	init: function() {
		app = maker.app();
		background = maker.background();

		midground = maker.container();
		let pos = {
			x: app.screen.width / 2,
			y: app.screen.height / 2
		}
		let options = {
			fontSize: 30,
			fill: 0x000000
		}
		roll_reminder = maker.floating_label("Down arrow key to roll!", pos, options);
		midground.addChild(roll_reminder);
		roll_reminder.alpha = 0.0;

		me = new Player();
	}
}