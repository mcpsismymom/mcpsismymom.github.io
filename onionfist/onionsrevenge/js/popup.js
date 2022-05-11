const SCORE_TO_UNLOCK = 25; //25;

var popup = {
	init: async function() {
		$("#fullscreen_btn").click(function() {
			let link = "https://onionfist.com/orev/";
			link += `#${curr_map_id}`;
			window.open(link, '_blank').focus();
		});

		$("#play_btn").click(async function() {
			var index = 0;
			var last_scores = {tim: 0};
			for (let map of map_info) {
				var map_scores = await scorekeeper.get_map_stat(map.id, false);
				if ((map_scores.tim == 0) && (last_scores.tim < SCORE_TO_UNLOCK)) {
					break;
				}
				index += 1;
				last_scores = map_scores;
			}
			index -= 1;
			if (index < 0) {
				index = 0;
			}
			
			let map_id = map_info[index].id;
			popup.play_level(map_id);
		});
		$("#levels_btn").click(function() {
			state.set("levels");
		});

		$("#levels_btn").click(function() {
			state.set("levels");
		});
		$("#menu_btn").click(function() {
			if (!deployment.is_oworld) {
				state.set("main_menu");
			} else {
				state.set("goto_oworld");
			}
			
		});
		$("#ingame_settings_btn").click(function() {
			state.set("settings");
		})

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

		$("#credits_btn").click(function() {
			state.set("credits");
		});
		$("#settings_btn").click(function() {
			state.set("settings");
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


		$("#afk_button").click(function() {
			webext.active_again();
		});
	},
	refresh_levels_page: async function() {
		$("#levels").html("");
		var i=0;
		let N = map_info.length;
		var locked_from = INF;

		for (let map of map_info) {
			i+=1;
			var map_scores = await scorekeeper.get_map_stat(map.id, true);
			console.log("map_scores", map_scores)

			if ((locked_from == INF) && (map_scores.tim < SCORE_TO_UNLOCK)) {
				locked_from = i;
			}
			var lock_type = "complete";
			if (i > locked_from) {
				lock_type = "locked";
			}

			$("#levels").append(`<div id="map_${map.id}" class="button ${lock_type}">${map.name}</div>`);
			if (map_scores.tim > 0) {
				$("#levels").append(`<p>${map_scores.tim} pt</p>`);
			} else if (lock_type == "locked") {
				$("#levels").append(`<p>Locked</p>`);
			} else {
				$("#levels").append(`<p>Click to play!</p>`);
			}
			
			if (lock_type != "locked") {
				$(`#map_${map.id}`).click(function() {
					popup.play_level(map.id);
				});
			}

			if (i == locked_from) {
				let percent = 5 + Math.round(map_scores.tim / SCORE_TO_UNLOCK * 95);

				$("#locked_from_h1").html(`Get ${SCORE_TO_UNLOCK} pt on ${map.name} to unlock`);
				$("#locked_progress").css("width", `${percent}%`);
				$("#locked_from_h1_2").html(`${map_scores.tim} / ${SCORE_TO_UNLOCK} pt`);
			}

			$(".locked").on({
			    mouseenter: function () {
			        //stuff to do on mouse enter
			        $("#locked_from").fadeIn();
			    },
			    mouseleave: function () {
			        //stuff to do on mouse leave
			        $("#locked_from").fadeOut();
			    }
			});
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


