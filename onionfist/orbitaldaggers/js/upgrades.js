var MAX_LEVEL = 7;
var upgrade_blueprint = {
	damage: {
		name: "Damage",
		// for each level, how much you need to pay
		// to get to the next level
		costs: [0, 1000, 3000, 9000, 27000, 81000, 81000*3, 81000*9],
		scale_fn: function(level) {
			return 1 + (level - 1) / 3;
		}
	},
	speed: {
		name: "Speed",
		costs: [0, 1000, 3000, 9000, 27000, 81000, 81000*3, 81000*9],
		scale_fn: function(level) {
			return 1 + (level - 1) / 7;
		}
	},
	spin: {
		name: "Spin",
		costs: [0, 1000, 3000, 9000, 27000, 81000, 81000*3, 81000*9],
		scale_fn: function(level) {
			return 1 + 0.4 + (level - 1) / 3;
		}
	},
	health: {
		name: "Armour",
		costs: [0, 1000, 3000, 9000, 27000, 81000, 81000*3, 81000*9],
		scale_fn: function(level) {
			return 1 + (level - 1) / 5;
		}
	}
}


var upgrades = {
	xp: null,
	find_scale: function(upgrade) {
		return upgrade_blueprint[upgrade].scale_fn(upgrades[upgrade]);
	},
	init: async function() {
		$("#upgrades").html("");
		for (let upgrade_id in upgrade_blueprint) {
			let level = await sync.async_get(upgrade_id) || 1;
			upgrade_blueprint[upgrade_id].level = level;
			this[upgrade_id] = level;
		}

		for (let upgrade_id in upgrade_blueprint) {
			this.init_upgrade(upgrade_id);
		}

		this.xp = await sync.async_get("xp") || 0;
		// this.xp = Number(this.xp);

		$("#upgrades_xp").text(`${this.xp} XP`);
	},
	init_upgrade: function(upgrade_id) {
		let upgrade = upgrade_blueprint[upgrade_id];
		let {name, level, costs} = upgrade;
		let cost = costs[level];

		var circles = "";
		for (var i=0;i<level;i++) {
			circles += `<img class="circle" src="assets/svgs/circle-fill.svg">`;
		}
		for (var i=level;i<MAX_LEVEL;i++) {
			circles += `<img class="circle" src="assets/svgs/circle.svg">`;
		}

		let btn = `<div class="button upgrade_btn" id="upgrade_btn_${upgrade_id}">Upgrade (${cost}XP)</div>`;
		if (level == MAX_LEVEL) {
			btn = "";
		}
		let html = `
			<div>
				<div class="upgrade_row">
					<div class="upgrade_name">${name}</div>
					${btn}
				</div>
				<div class="circles">
					${circles}
				</div>
				
			</div>
		`;
		$("#upgrades").append(html);

		$(`#upgrade_btn_${upgrade_id}`).click(function() {
			upgrades.upgrade(upgrade_id);
		});
	},
	upgrade: async function(upgrade_id) {
		let level = this[upgrade_id];
		let cost = upgrade_blueprint[upgrade_id].costs[level];
		if ((this.xp >= cost) && (level < MAX_LEVEL)) {
			this.xp -= cost;
			await sync.async_set("xp", this.xp);
			await sync.async_set(upgrade_id, level + 1);
			audio.play("levelup");
		}
		this.init();
	},
	reward_level_clear: async function(i, n) {
		let xp_per_clear = [1000, 300, 50, 10, 0];
		var xp_amount = (n < 5) ? xp_per_clear[n] : 0; // first clear = max XP.
		xp_amount *= 1 + i / 20; // later levels = more XP.

		$("#xp_reward").html(`Gained ${xp_amount} XP!`);

		await sync.async_set("xp", this.xp + xp_amount);
		this.init();
	}

}


