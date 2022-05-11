
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
			rolling.update(delta);
			score.update(delta);

			for (let bird of birds) {
				bird.update(delta);
			}

			for (let egg of eggs) {
				egg.update(delta);
			}

			if (window.map != null) {
				map.update(score.num, delta);
			}

			cleanup.update();
		}
	},
	clock: function() {

	}
}
