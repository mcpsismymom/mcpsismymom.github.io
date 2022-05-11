var curr_map_id = null;

var state_blueprint = [{
	id: "loading",
	on_focus: () => {
		
		size.popup();
		$("#ingame_settings_btn").hide();
		$("#controls_overlay").hide();
		$("#fullscreen_btn").hide();
	},
	on_blur: () => {}
}, {
	id: "playing",
	on_focus: async (params) => {
		score.reset();

		curr_map_id = params.map_id;

		await loader.init(`maps/${curr_map_id}.js`);
		await map.init();
		await size.ingame();
		score.show_high(curr_map_id);

		audio.start_music(map.music);

		$("#ingame_settings_btn").show();
		$("#fullscreen_btn").show();
	},
	on_blur: () => {
		map.cleanup();
		cleanup.total_cleanup();
		scorekeeper.add_map_exp(curr_map_id);
		scorekeeper.record_map_highscore(curr_map_id, score.num);

		size.popup();
		audio.stop();

		$("#ingame_settings_btn").hide();
		$("#controls_overlay").hide();
		$("#fullscreen_btn").hide();
	}
}, {
	id: "main_menu",
	on_focus: () => {
		$("#menu_btn").hide();
		
	},
	on_blur: () => {
		$("#menu_btn").show();
		
	}
}, {
	id: "levels",
	on_focus: () => {

		popup.refresh_levels_page();
		$("#locked_from").hide();
	},
	on_blur: () => {}
}, {
	id: "credits",
	on_focus: () => {
	},
	on_blur: () => {}
}, {
	id: "data_erase_ask",
	on_focus: () => {

	},
	on_blur: () => {}
}, {
	id: "data_erase_confirm",
	on_focus: async () => {
		await webext.clear_storage_data();
		await sync.async_set("overwrite_web", true);
	},
	on_blur: () => {
		location.reload();
	}
}, {
	id: "settings",
	on_focus: () => {
		if (deployment.is_chrome_ext == true) {
			$("#setting_resolution").hide();
		}
	},
	on_blur: () => {}
}, {
	id: "death",
	on_focus: () => {
		audio.die();

		setTimeout(async function() {
			if (new_highscore) {
				$("#death_results_h1").html(`New highscore!`);
				$("#death_results_p").html(`You flew:<br>${score.num} km`);
			} else {
				var info = await scorekeeper.map_promise(curr_map_id);
				$("#death_results_h1").html(`You crashed!`);
				$("#death_results_p").html(`Your score:<br>${score.num} km<br>High score:<br>${info.tim} km`);

				if (settings.auto_restart == "On") {
					$("#death_respawn_btn").click();
				}
			}

		}, 200);
		
	},
	on_blur: () => {}
}, {
	id: "afk",
	on_focus: () => {
		$("#menu_btn").hide();
	},
	on_blur: () => {
		$("#menu_btn").show();
	}
}];



var state = {
	ignore_id: null,
	index: 0, // curr state index
	init: function() {
		for (let option of state_blueprint) {
			// html
			var screen = $(`#screen_${option.id}`);
			if (screen.length == 1) {
				screen.css("visibility", "visible");
				screen.hide();
			}
			// prop
			if (option.id == state_blueprint[this.index].id) {
				this[option.id] = true;
			} else {
				this[option.id] = false;
			}
		}

		let init_state = state_blueprint[this.index];
		$(`#screen_${init_state.id}`).show();
		init_state.on_focus();
	},
	set: async function(new_id, params={}) {
		if (this.ignore_id == new_id) {
			return;
		}
		let new_i = this.get_index(new_id);

		var prev_state = state_blueprint[this.index];
		var curr_state = state_blueprint[new_i];

		console.log(prev_state.id, ">", curr_state.id);

		if (prev_state.id == curr_state.id) {
			return;
		}

		// apply
		this.index = new_i;

		$(`#screen_${prev_state.id}`).hide();
		this[prev_state.id] = false;
		

		await prev_state.on_blur();
		await curr_state.on_focus(params);

		this[curr_state.id] = true;
		$(`#screen_${curr_state.id}`).show();
	},
	ignore: function(ignore_id) {
		this.ignore_id = ignore_id;
	},
	get_index: function(id) {
		var i = 0;
		for (let option of state_blueprint) {
			if (option.id == id) {
				return i;
			}
			i += 1;
		}
		console.error("State Failed to get index");
		return -1;
	}
}
