
var update = {
	interval: null,
	init: function() {
		// Listen for animate update
		app.ticker.add((delta) => {
			this.render(delta);
		});
		this.interval = setInterval(this.clock, 1000);
	},
	render: function(delta) {
		if (state.playing) {
			me.update(delta);
			motion.update(delta);

			for (let enemy of enemies) {
				enemy.update(delta);
			}
		}

	},
	clock: function() {
		energy.clock();
		daily_gift.clock();
	}
}
