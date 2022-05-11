var audio_blueprint = {
	die: "assets/sounds/die.wav",
	levelup: "assets/sounds/levelup.wav",
	F: "assets/sounds/F.wav",
	D: "assets/sounds/D.wav"
}

var audio = {
	init: function() {
		for (let audio_id in audio_blueprint) {
			let audio_url = audio_blueprint[audio_id];
			this[audio_id] = PIXI.sound.Sound.from(audio_url);
		}
	},
	play: function(name) {
		if (settings.sound_effects == "On") {
			this[name].play();
		}
		
	}
}