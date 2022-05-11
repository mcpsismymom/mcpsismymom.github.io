var change_state = {
	init: function() {
		$(".back_to_menu").click(function() {
			cleanup.reset_map();
			lobby.re_focus();
		});
		$("#next_level").click(function() {
			if (transitioning) {
				return;
			}
			transitioning = true;

			cleanup.reset_map();
			setTimeout(function() {
				lobby.play_next_level();
				transitioning = false;
			}, 200);
		});
		$("#overlay_restart").click(function() {
			map.reset();
			cleanup.reset_player(true);
			// last_pos = [];
			const swings = last_pos.length;
			$("#swings").text(`${swings} SWINGS`);
		});
	},
	open_map: function() {
		$("#win_screen").hide();

		$("#swings").text(`0 SWINGS`);
		ingame = true;
		won = false;
	},
	win: function() {
		if (won) {
			return;
		}
		won = true;
		const g = new BABYLON.Vector3(0, 5, 0);
		maker.scene.getPhysicsEngine().setGravity(g);

		const swings = last_pos.length;
		$("#win_text").text("HOLE IN " + swings);
		$("#win_screen").show();
		$("#win_text_n").text("");
		$("#win_text_h").text("");

		const this_map_id = settings.map_id;

		// COMPLETE COUNT
		sync.get(this_map_id+"-n", function(data) {
			var map_exp = (data == null) ? 0 : Number(data);
			console.log("map_exp", map_exp);

			map_exp += 1;

			// add one
			sync.set(this_map_id+"-n", map_exp, function() {
				// display UI
				console.log("-n changed");
				$("#win_text_n").text("Completed " + map_exp + " times!");
			});
		});

		// HIGHSCORE
		sync.get(this_map_id+"-h", function(data) {
			var map_tim = (data == null) ? INF : Number(data);
			console.log("map_tim", map_tim);

			if (swings < map_tim) {
				map_tim = swings;
				// add one
				sync.set(this_map_id+"-h", map_tim, function() {
					// display UI
					console.log("-h changed");
					$("#win_text_h").text("New Highscore: Hole in " + map_tim);
				});
			} else {
				console.log("-h no change");
				$("#win_text_h").text("Highscore: Hole in " + map_tim);
			}
		});

	},
	die: function() {
		if (window.map != null) {
			map.reset();
		}
		cleanup.reset_player();
	}
}