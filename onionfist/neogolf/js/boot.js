var transitioning = true;

var boot = {
	init: async function() {
		deployment.init();
		sync.init();
		webadd.init();
		controls.init();
		decorations.init();
		change_state.init();

		lobby.init();
		testing_mode.init();
		size.popup();
		windows.init();

		transitioning = false;
	},
	open_map: async function() {
		transitioning = true;
		await cleanup.reset_player(true);
		await loader.init();
		await change_state.open_map();
		console.log("Map", map);
		await map.init();
		await screen.init();
		await size.ingame();
		transitioning = false;
	}
}