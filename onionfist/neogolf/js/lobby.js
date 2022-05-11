var lobby = {
	next_index: 0,
	init: function() {
		// general
		$("#lobby_table").hide();

		$("#ingame").hide();
		$(".screen").css("visibility", "visible");
		$("#overlay").css("visibility", "visible");
		$("#lobby_inner").css("visibility", "visible");
		$(".screen").hide();
		$("#loading").remove();

		$("#play_button").click(function() {
			lobby.play_next_level();
		});

		this.recompute_map_stats();
	},
	play_map: function(map_id) {
		settings.map_id = map_id;
		boot.open_map();
		$("#ingame").show();
		$("#lobby").hide();
	},
	play_next_level: function() {
		var callback = function() {
			const next_index = lobby.next_index;
			const next_level = map_info[next_index];
			lobby.play_map(next_level.i);
		}
		this.recompute_map_stats(callback);
	},
	re_focus: function() {
		$("#ingame").hide();
		$("#lobby").show();
		$("#die_screen").hide();
		$("#win_screen").hide();
		size.popup();
		ingame = false;
		this.recompute_map_stats();
		windows.activate_main();
	},
	recompute_map_stats: async function(done) {
		const stats = await this.all_promise();
		this.next_index = 0;
		var index = 0;
		for (let map of stats) {
			console.log(index, map);

			if ((map.exp == 0) && (this.next_index == 0)) {
				this.next_index = index;
			}
			index += 1;
		}
		if (done != null) {
			done();
		}

		// HTML
		$("#play_subtext").text(`Lvl ${this.next_index + 1} of ${map_info.length}`);

		$("#maps").html("");
		
		var i = 0;	
		for (let map of map_info) {
			const stat = stats[i];

			var left = stat.exp;
			if (left == 0) {
				left = "";
			}
			var right = stat.tim;
			if (right > INF/2) {
				right = "";
			}

			var HTML = `<div class="map"><div class="map_stat_left">${left}</div><div id="map_${map.i}" class="map_button button">${map.n}</div><div class="map_stat_right">${right}</div></div><br>`;
			$("#maps").append(HTML);
			
			$(`#map_${map.i}`).click(function() {
				lobby.play_map(map.i);
			});

			i += 1;
		}

	},
	all_promise: function() {
		return new Promise((resolve, reject) => {
			var map_promises = [];
			for (const map of map_info) {
				map_promises.push(lobby.map_promise(map.i));
			}
			Promise.all(map_promises).then((values) => {
				resolve(values);
			});
		});
	},
	map_promise: function(this_map_id) {
		return new Promise((resolve, reject) => {
			sync.get(this_map_id+"-n", function(data) {
				sync.get(this_map_id+"-h", function(data2) {
					var map_exp = (data == null) ? 0 : Number(data);
					var map_tim = (data2 == null) ? INF : Number(data2);

					resolve({
						id: this_map_id,
						exp: map_exp,
						tim: map_tim
					});
				});
			});
		});
	}
	
}