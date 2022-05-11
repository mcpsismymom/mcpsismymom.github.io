var curr_map_id = null;

var state_blueprint = [{
	id: "loading",
	on_focus: () => {
		$("#controls_overlay").hide();
		$("#fullscreen_btn").hide();
	},
	on_blur: () => {}
}, {
	id: "playing",
	on_focus: async (params) => {
		// energy
		if (!energy.can_play()) {
			state.set("no_energy");
			return;
		} else {
			energy.join_game();
		}


		var i = 0;
		for (let map of map_info) {
			i += 1;
			if (map.id == params.map_id) {
				wave_num = i;
				break;
			}
		}
		curr_map_id = params.map_id;
		await loader.init(`maps/${params.map_id}.js`);
		background = maker.background(map.background);
		await map.init();

		me.destroy_daggers();
		
		var daggers = dagger_selection.equipped;
		for (let dagger of daggers) {
			me.equip_dagger(dagger);
		}
		me.hp = 100 * upgrades.find_scale("health");
		me.max_hp = 100 * upgrades.find_scale("health");
		me.hurt(0);
		
		
		size.ingame();

		if (i == 1) {
			$("#controls_overlay").show();
		}

		$("#fullscreen_btn").show();
	},
	on_blur: () => {
		// game reset
		for (let enemy of enemies) {
			enemy.delete();
		}
		enemies = [];

		var pos = {
			x: 300,
			y: 200
		}
		me.move_to(pos);
		me.destroy_daggers();

		background.destroy();
		background = null;


		// visual reset
		size.popup();
		$("#controls_overlay").hide();
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
	},
	on_blur: () => {}
}, {
	id: "death",
	on_focus: () => {
	},
	on_blur: () => {}
}, {
	id: "daily_gift",
	on_focus: () => {
		daily_gift.open();
	},
	on_blur: () => {
		upgrades.init();
	}
}, {
	id: "no_energy",
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
	id: "victory",
	on_focus: async () => {
		audio.play("levelup");

		let n = await sync.async_get(curr_map_id+"-n") || 0;
		var i = map_info.map(v => v.id).indexOf(curr_map_id);

		upgrades.reward_level_clear(i, n);
		dagger_selection.reward_level_clear(i, n);

		$("#dg_dagsel_reward").html(``);
		$("#dg_dagsel_reward_img").attr('src', ``);

		scorekeeper.add_map_exp(curr_map_id);
		setTimeout(function() {
			scorekeeper.init();
		}, 200);

		
	},
	on_blur: async () => {
		
		
	}
}, {
	id: "settings",
	on_focus: () => {},
	on_blur: () => {}
}, {
	id: "credits",
	on_focus: () => {
	},
	on_blur: () => {}
}, {
	id: "dagsel",
	on_focus: () => {
	},
	on_blur: () => {}
}, {
	id: "dagsel_closeup",
	on_focus: (params) => {
		$("#menu_btn_img").attr("src", "assets/svgs/back.svg");

		$("#dagsel_closeup_img").attr("src", `assets/weapons/${params.weapon_id}.png`);
		$("#dagsel_closeup_name").text(params.name);
		$("#dagsel_closeup_stats").html(`Damage: ${params.dmg}<br>Spin: ${params.spin}<br>Range: ${params.range}<br>Tier: ${params.tier}`);


		if (params.is_equipped) {
			$("#dagsel_closeup_action").html("Un-equip");
			dagger_selection.dagsel_closeup_action_fn = () => {
				dagger_selection.unequip_dagger(params.weapon_id);
			}
		} else {
			$("#dagsel_closeup_action").html("Equip");
			dagger_selection.dagsel_closeup_action_fn = () => {
				dagger_selection.equip_dagger(params.weapon_id);
			}
		}
	},
	on_blur: () => {
		$("#menu_btn_img").attr("src", "assets/svgs/list.svg");
	}
}, {
	id: "error",
	on_focus: (params) => {
		$("#error_h1").text(params.h1);
		$("#error_p").text(params.p);
		$("#error_action").click(function() {
			state.set(params.target);
		});
	},
	on_blur: () => {}
}, {
	id: "upgrades",
	on_focus: () => {
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

		console.log(prev_state.id, ">", curr_state.id)

		if (prev_state.id == curr_state.id) {
			return;
		}

		// apply
		this.index = new_i;

		this[prev_state.id] = false;
		this[curr_state.id] = true;

		$(`#screen_${prev_state.id}`).hide();
		$(`#screen_${curr_state.id}`).show();

		await prev_state.on_blur();
		await curr_state.on_focus(params);
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
