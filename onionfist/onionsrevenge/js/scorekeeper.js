const INF = 9999999;
var new_highscore = false;

var scorekeeper = {
	info: {},
	next_map_index: null,
	next_map_id: null,
	init: async function() {
		this.info = await this.all_promise();
		for (let i=0;i<this.info.length;i++) {
			let map = this.info[i];
			if (map.exp == 0) {
				this.next_map_index = i;
				this.next_map_id = map.id;
				break;
			}
		}
	},
	get_map_stat: async function(map_id, refresh_data=true) {
		if (refresh_data == true) {
			return await this.map_promise(map_id);
		} else {
			for (var i=0;i<this.info.length;i++) {
				if (this.info[i].id == map_id) {
					return this.info[i];
				}
			}
		}
	},
	add_map_exp: async function(map_id) {
		// get
		var info = await this.map_promise(map_id);

		// add
		var new_exp = info.exp + 1;

		// set
		await new Promise((resolve, reject) => {
			sync.set(map_id+"-n", new_exp, function() {
				resolve();
			});
		});
	},
	record_map_highscore: async function(map_id, new_hs) {
		// get
		var info = await this.map_promise(map_id);

		var prev = Number(info.tim);
		var curr = Number(new_hs);


		// add
		if (prev < curr) {
			// alert("new highscore");
			new_highscore = true;
		} else {
			new_highscore = false;
		}

		var highscore = Math.max(prev, curr);

		// set
		await new Promise((resolve, reject) => {
			sync.set(map_id+"-h", highscore, function() {
				resolve();
			});
		});
	},
	record_recent_game: async function(map_id, score) {
		// set
		await new Promise((resolve, reject) => {
			sync.set("last_game_map_id", map_id, function() {
				sync.set("last_game_score", score, function() {
					resolve();
				});
			});
		});
	},
	all_promise: function() {
		return new Promise((resolve, reject) => {
			var map_promises = [];
			for (const map of map_info) {
				map_promises.push(scorekeeper.map_promise(map.id));
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
					var map_tim = (data2 == null) ? 0 : Number(data2);

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