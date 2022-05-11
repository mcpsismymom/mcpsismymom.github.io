
const MAX_MANA = 30
const MANA_PER_ROLL = 10;
const MANA_REGEN = 0.06;
const ROLL_TIME = 15; //30;
const MAX_BLINK_TIME = 140;

var rolling = {
	time: 0,
	blink_time: 0,
	mana: MAX_MANA / 2,
	cont: null,
	hearts: [],
	rolls: [],
	hp: 2,
	direction: null,
	prev_mana_level: 99,
	init: function() {
		this.cont = new PIXI.Container();
		app.stage.addChild(this.cont);

		for (var i=0;i<2;i++) {
			var m = maker.overlay("heart", 0.3);
			m.position.x = 600 / 2 + 40 * (i+0.5);
			m.position.y = 500 - 20;

			this.hearts.push(m);
			this.cont.addChild(m);
		}

		for (var i=0;i<3;i++) {
			var m = maker.overlay("roll", 0.3);
			m.position.x = 600 / 2 - 40 * (i+0.5);
			m.position.y = 500 - 20;

			this.rolls.push(m);
			this.cont.addChild(m);
		}
	},
	reset_vars: function() {
		this.hp = 2;
		this.mana = MAX_MANA/2;
		this.time = 0;
		this.blink_time = 0;
	},
	update: function(delta) {
		// mana
		if (this.mana < MAX_MANA) {
			this.mana += MANA_REGEN;
		}

		// roll
		if ((controls.down) && (this.mana > MANA_PER_ROLL) && (this.time <= 0)) {
			this.mana -= MANA_PER_ROLL;
			this.time = ROLL_TIME;
			this.direction = motion.direction;
			audio.play("roll");
		}

		if (this.time > 0) {
			this.time -= delta;
			me.body.animationSpeed = 0.7;
		} else {
			me.body.animationSpeed = 0.2;
		}

		var num_rolls = Math.floor((MAX_MANA / MANA_PER_ROLL) * this.mana / MAX_MANA); //this.rolls.length
		if (num_rolls > this.prev_mana_level) {
			audio.play("mana");
		}

		this.prev_mana_level = num_rolls;

		for (var i=0;i<this.rolls.length;i++) {
			this.rolls[i].alpha = (i < num_rolls) ? 1 : 0.3;
		}

		if (this.blink_time > 0) {
			this.blink_time -= delta;
		}

		for (var i=0;i<this.hearts.length;i++) {
			this.hearts[i].alpha = (i < this.hp) ? 1 : 0.3;
		}
	},
	die: function() {
		if (this.blink_time > 0) {
			return;
		}

		audio.play("die");
		this.hp -= 1;
		this.blink_time = MAX_BLINK_TIME;
		
		if (this.hp == 0) {
			state.set("death");
		}
	}

}