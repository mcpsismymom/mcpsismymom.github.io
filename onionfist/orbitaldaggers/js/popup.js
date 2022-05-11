var popup = {
	init: async function() {

		$("#fullscreen_btn").click(function() {
			let link = "https://onionfist.com/orbdag/";
			link += `#${curr_map_id}`;
			window.open(link, '_blank').focus();
		});

		$("#play_btn").click(function() {
			popup.play_level(scorekeeper.next_map_id);
		});
		$("#levels_btn").click(function() {
			state.set("levels");
		});
		$("#menu_btn").click(function() {
			if (state.dagsel_closeup == true) {
				state.set("dagsel");
			} else {
				state.set("main_menu");
			}
		});
		$("#dagsel_btn").click(function() {
			state.set("dagsel");
		});
		$("#credits_btn").click(function() {
			state.set("credits");
		});
		$("#upgrades_btn").click(function() {
			state.set("upgrades");
		});
		$("#settings_btn").click(function() {
			state.set("settings");
		});

		$("#death_respawn_btn").click(function() {
			state.set("playing", {map_id: curr_map_id});
		});

		$("#death_quit_btn").click(function() {
			$("#menu_btn").click();
		});

		$("#victory_next_btn").click(function() {
			popup.play_level(scorekeeper.next_map_id);
		});

		$("#victory_quit_btn").click(function() {
			$("#menu_btn").click();
		});

		$("#dagsel_closeup_action").click(function() {
			dagger_selection.dagsel_closeup_action_fn();
		});

		$("#no_energy_btn").click(function() {
			state.set("main_menu");
		})

		$("#daily_gift_img").click(function() {
			if (daily_gift.time_remaining == 0) {
				state.set("daily_gift");
			}
		})
		$("#daily_gift").click(function() {
			if (daily_gift.time_remaining == 0) {
				state.set("daily_gift");
			}
		});
		$("#dg_claim_btn").click(function() {
			audio.play("levelup");
			state.set("main_menu");
		});

		$("#afk_button").click(function() {
			webext.active_again();
		});


		$("#erase_yes").click(function() {
			state.set("data_erase_confirm");
		});
		$("#erase_no").click(function() {
			state.set("main_menu");
		});
		$("#erase_done").click(function() {
			state.set("main_menu");
		});
		$("#erase_data_btn").click(function() {
			state.set("data_erase_ask");
		});

	},
	refresh_levels_page: async function() {
		$("#levels").html("");
		var i=0;
		for (let map of map_info) {
			i+=1;
			var map_scores = await scorekeeper.get_map_stat(map.id, false);

			var lock_type = "locked";
			if (map_scores.exp > 0) {
				lock_type = "complete";
			}
			if (map.id == scorekeeper.next_map_id) {
				lock_type = "next_level";
			}
			$("#levels").append(`<div id="map_${map.id}" class="button ${lock_type}">Level ${i}</div>`);

			if (lock_type != "locked") {
				$(`#map_${map.id}`).click(function() {
					popup.play_level(map.id);
				});
			}
			
		}
	},
	play_level: function(map_id) {
		if (this.state == "playing") {
			return;
		}
		var info;
		for (let map of map_info) {
			if (map.id == map_id) {
				info = map;
				break;
			}
		}
		if (info == null) {
			console.error("Error");
			return;
		}

		var params = {map_id: map_id};
		if (info.msg == true) {
			state.set("story", params);
		} else {
			state.set("playing", params);
		}

	}
}


