var boot = {
	init: async function() {

		await deployment.init();
		await join_params.init();
		await webadd.init();
		await sync.init();
		//await webext.init();
		
		await settings.init();
		await controls.init();
		await decorations.init();
		await state.init();
		await scorekeeper.init();
		await setup.init();
		await popup.init();
		
		await join_params.open_destination();
	}
}


$(document).ready(function() {

	boot.init();
});
