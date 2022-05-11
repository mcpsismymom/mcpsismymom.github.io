const RECHARGE_RATE = 0.01; // 0.01 per sec = 0.6 per min.
const MAX_ENERGY = 150;
const ENERGY_PER_GAME = 10;

var energy = {
	energy: null,
	init: async function() {
		const last_energy_amount = await sync.async_get("energy_amount") || MAX_ENERGY;
		const last_energy_refilled = await sync.async_get("energy_time") || Date.now();

		let seconds_elapsed = Math.floor((Date.now() - last_energy_refilled) / 1000);
		let recharged_level = Number(last_energy_amount) + Number(seconds_elapsed) * RECHARGE_RATE;
		this.energy = Math.min(MAX_ENERGY, recharged_level);
	},
	can_play: function() {
		if (this.energy >= ENERGY_PER_GAME) {
			return true;
		} else {
			return false;
		}
	},
	join_game: async function() {
		// newcomer
		var lv7 = await sync.async_get(map_info[6].id+'-n') || 0;

		if (lv7 == 0) {
			this.energy -= ENERGY_PER_GAME / 2.2;
		} else {
			this.energy -= ENERGY_PER_GAME;
		}
		


		await sync.async_set("energy_amount", this.energy);
		await sync.async_set("energy_time", Date.now());
	},
	clock: function() {
		if (this.energy < MAX_ENERGY) {
			this.energy += RECHARGE_RATE;
		}
		var n = Math.round(this.energy * 100) / 100;
		var s = n.toString();
        if (s.indexOf('.') == -1) s += '.';
        while (s.length < s.indexOf('.') + 3) s += '0';

		$("#energy").html(`Energy:<br>${s}`);
	}
}

