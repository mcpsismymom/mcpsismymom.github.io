var dagger_selection = {
	equipped: [],
	unlocked: [],
	unequipped: [],
	dagsel_closeup_action_fn: () => {},
	init: async function() {
		console.log("INIT");
		this.equipped = [];
		this.unlocked = [];
		this.unequipped = [];

		console.log("__this.unlocked", this.unlocked);
		console.log("__this.equipped", this.equipped);
		console.log("__this.unequipped", this.unequipped);


		this.equipped = await sync.async_get("dagsel_equipped");
		if (this.equipped != null) {
			this.equipped = JSON.parse(this.equipped);
		}
		
		if (this.equipped == null) {
			this.equipped = ["starter_sword"];
			await sync.async_set("dagsel_equipped", JSON.stringify(this.equipped));
			await sync.async_set("w_starter_sword", 1);
		}
		
		for (let weapon_id in weapon_blueprint) {
			var n = await sync.async_get("w_"+weapon_id) || 0;
			if (n > 0) {
				this.unlocked.push({
					id: weapon_id,
					n: n
				});
			}
		}

		
		for (let unlocked of this.unlocked) {
			let weapon_id = unlocked.id;

			var num_equipped = 0;
			for (let equipped of this.equipped) {
				if (equipped == weapon_id) {
					num_equipped += 1;
				}
			}
			var weapon_num = unlocked.n - num_equipped;
			if (weapon_num > 0) {
				this.unequipped.push({
					id: weapon_id,
					n: weapon_num
				});
			}	
		}


		console.log("this.unlocked", this.unlocked);
		console.log("this.equipped", this.equipped);
		console.log("this.unequipped", this.unequipped);


		$("#dagsel_equipped").html("");
		$("#dagsel_unequipped").html("");
		var i=0;
		for (let weapon_id of this.equipped) {
			i += 1;
			this.init_dagger(weapon_id, true, 1, i);
		}

		for (let obj of this.unequipped) {
			i += 1;
			this.init_dagger(obj.id, false, obj.n, i);
		}
	},
	init_dagger: function(weapon_id, is_equipped, weapon_num, index) {
		// alert()
		var html = `<div class="dagsel_cell"><div>${weapon_num}</div><img id="d_${weapon_id}_${index}" src="assets/weapons/${weapon_id}.png"></div>`
		if (is_equipped) {
			$("#dagsel_equipped").append(html);
		} else {
			$("#dagsel_unequipped").append(html);
		}
		

		$(`#d_${weapon_id}_${index}`).click(function() {
			// let parent_id = $(this).parent().attr('id');
			// let is_equipped = (parent_id == "dagsel_equipped");

			let params = {
				...weapon_blueprint[weapon_id],
				is_equipped: is_equipped,
				weapon_id: weapon_id
			}
			state.set("dagsel_closeup", params);
		});
	},
	equip_dagger: async function(weapon_id) {
		if (this.equipped.length < 4) {
			this.equipped.push(weapon_id);
			await sync.async_set("dagsel_equipped", JSON.stringify(this.equipped));
			await this.init();
			state.set("dagsel");
		} else {
			state.set("error", {
				h1: "You are using too many daggers at once.", 
				p: "Please un-equip a dagger first before equipping a new one.",
				target: "dagsel"
			});
		}
	},
	unequip_dagger: async function(weapon_id) {
		var i = this.equipped.indexOf(weapon_id);
		if (i == -1) return;
		this.equipped.splice(i, 1);
		await sync.async_set("dagsel_equipped", JSON.stringify(this.equipped));
		await this.init();
		state.set("dagsel");
	},
	unlock_dagger: async function(val_rule, from_daily_gift) {
		// select
		var weapon_ids = [];
		for (let weapon_id in weapon_blueprint) {
			let weapon = weapon_blueprint[weapon_id];
			if (val_rule(weapon) == true) {
				weapon_ids.push(weapon_id);
			}
			
		}
		let w_index = Math.floor(Math.random() * weapon_ids.length);
		var weapon_id = weapon_ids[w_index]; // CHANGE THIS LATER

		var n = await sync.async_get("w_"+weapon_id) || 0;

		var index = -1;
		var count = 0;
		for (let unlocked_dagger of this.unlocked) {
			if (unlocked_dagger.id == weapon_id) {
				index = count;
				break;
			}
			count += 1;
		}

		// apply
		await sync.async_set("w_"+weapon_id, n+1);

		if (index == -1) {
			this.unlocked.push({
				id: weapon_id,
				n: n + 1
			});
		} else {
			this.unlocked[index].n = n + 1;
		}

		if (from_daily_gift == false) {
			$("#dagsel_reward").html(`Dagger unlocked: ${weapon_blueprint[weapon_id].name}`);
			$("#dagsel_reward_img").attr('src', `assets/weapons/${weapon_id}.png`);
		} else {
			$("#dg_dagsel_reward").html(`Dagger unlocked: ${weapon_blueprint[weapon_id].name}`);
			$("#dg_dagsel_reward_img").attr('src', `assets/weapons/${weapon_id}.png`);
		}
		
		this.init();
	},
	reward_level_clear: function(i, n, from_daily_gift=false) {
		if (!from_daily_gift) {
			if (n > 0) {
				return;
			}
			if (i%2 == 0) {
				return
			}
		}
		

		if (i < 4) {
			this.unlock_dagger((dagger) => {
				if (dagger.tier < 2) {
					return true;
				}
				return false;
			}, from_daily_gift);
		} else if (i < 6) {
			this.unlock_dagger((dagger) => {
				if (dagger.tier < 3) {
					return true;
				}
				return false;
			}, from_daily_gift);
		} else {
			this.unlock_dagger((dagger) => {
				if (dagger.tier < 4) {
					return true;
				}
				return false;
			}, from_daily_gift);
		}

		
	}
}


