const WAIT_TIME = 16 * 60 * 60; // seconds = 16 hours.

var daily_gift = {
	time_remaining: null,
	init: async function() {
		let last_opened = await sync.async_get("daily_gift") || 0;
		console.log("last_opened", last_opened);
		let time_elapsed = Math.floor((Date.now() - last_opened) / 1000);
		
		this.time_remaining = WAIT_TIME - time_elapsed;
		console.log("this.time_remaining", this.time_remaining);

		if (this.time_remaining <= 0) {
			this.time_remaining = 0;
		}
		
	},
	open: async function() {
		audio.play("levelup");

		var xp_amount = 300;

		$("#dg_xp_reward").html(`Gained ${xp_amount} XP!`);

		await sync.async_set("xp", Number(upgrades.xp) + xp_amount);
		this.init();

		let i = scorekeeper.next_map_index;
		dagger_selection.reward_level_clear(i, 0, true);

		await sync.async_set("daily_gift", Date.now());

		this.time_remaining = WAIT_TIME;
		
	},
	clock: function() {
		if (this.time_remaining > 0) {
			this.time_remaining -= 1;
			var s = this.to_analog(this.time_remaining);
			$("#daily_gift").html("Daily Gift:<br>"+s);
		} else {
			$("#daily_gift").html("Daily Gift:<br>Click to Open");
		}
	},
	to_analog: function(num) {
		var hours = Math.floor(num / 60 / 60);
		num -= 60 * 60 * hours;
		var minutes = Math.floor(num / 60);
		num -= minutes * 60;
		var seconds = num

		function str_pad_left(string,pad,length) {
		    return (new Array(length+1).join(pad)+string).slice(-length);
		}
		var finalTime = str_pad_left(hours,'0',2)+':'+str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
		return finalTime;
	}
}