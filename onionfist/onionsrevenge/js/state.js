var curr_map_id = null;
var final_score;

var state_blueprint = [{
	id: "loading",
	on_focus: () => {
		$("#controls_overlay").hide();
		$("#ingame_settings_btn").hide();
		$("#fullscreen_btn").hide();
	},
	on_blur: () => {}
}, {
	id: "playing",
	on_focus: async (params) => {
		// var i = 0;
		// for (let map of map_info) {
		// 	i += 1;
		// 	if (map.id == params.map_id) {
		// 		wave_num = i;
		// 		break;
		// 	}
		// }
		curr_map_id = params.map_id;

		await loader.init(`maps/${params.map_id}.js`);
		await map.init();
		size.ingame();
		score.show_high(curr_map_id);
		
		let texture = assets[`bg_${curr_map_id}`];
		console.log("curr_map_id", curr_map_id);
		background.texture = texture;

		audio.play_song(map.song);

		// if (i == 1) {
		// 	$("#controls_overlay").show();
		// }

		$("#ingame_settings_btn").show();
		$("#fullscreen_btn").show();

		if (curr_map_id == "fried_egg_1") {
			var map_scores = await scorekeeper.get_map_stat(curr_map_id, false);
			if (map_scores.tim < SCORE_TO_UNLOCK) {
				roll_reminder.alpha = 1.0;
			} else {
				roll_reminder.alpha = 0.0;
			}
			
		} else {
			roll_reminder.alpha = 0.0;
		}
	},
	on_blur: () => {

		scorekeeper.add_map_exp(curr_map_id);
		scorekeeper.record_map_highscore(curr_map_id, score.num);
		scorekeeper.record_recent_game(curr_map_id, score.num);

		// game reset
		for (let bird of birds) {
			bird.delete();
		}
		birds = [];

		for (let egg of eggs) {
			egg.delete();
		}
		eggs = [];

		rolling.reset_vars();

		var pos = {
			x: 300,
			y: 440
		}
		me.move_to(pos);

		final_score = score.num;

		audio.stop_song();
		
		score.reset();
		if (window.map != null) {
			map.reset();
		}
		map.update = () => {};
		delete map;

		// visual reset
		size.popup();
		$("#controls_overlay").hide();
		$("#ingame_settings_btn").hide();
		$("#fullscreen_btn").hide();
	}
}, {
	id: "story",
	on_focus: async (params) => {
		var url = `msgs/${params.map_id}.js`;
		await loader.init(url);
		await msg.init(params.map_id);
	},
	on_blur: () => {
		story.reset();
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
	on_focus: () => {},
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
	on_focus: () => {},
	on_blur: () => {}
}, {
	id: "death",
	on_focus: async () => {
		if (deployment.is_oworld) {
			$("body").hide();
			state.set("goto_oworld", {show_results: true});
			return;
		}
		
		if (new_highscore) {
			$("#death_results_h1").html(`New highscore!`);
			$("#death_results_p").html(`You survived for:<br>${final_score} pt`);
		} else {
			var info = await scorekeeper.map_promise(curr_map_id);
			$("#death_results_h1").html(`You died!`);
			$("#death_results_p").html(`Your score:<br>${final_score} pt<br>High score:<br>${info.tim} pt`);

			if (settings.auto_restart == "On") {
				setTimeout(function() {
					$("#death_respawn_btn").click();
				}, 200);
				
			}
		}
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
}, {
	id: "goto_oworld",
	on_focus: (params) => {
		let show_results = params.show_results || false;
		fire("game_end", [show_results]);
	},
	on_blur: () => {
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
		fire("game_state_changed", [curr_state.id]);
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
