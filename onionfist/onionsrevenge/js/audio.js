var audio_blueprint = {
	die: "assets/sounds/die.wav",
	mana: "assets/sounds/mana.wav",
	roll: "assets/sounds/roll.wav",


	col_electricity: "assets/songs/col_electricity.mp3",
	col10000: "assets/songs/col10000.mp3",
	col75000: "assets/songs/col75000.mp3"
}

var audio = {
	song: null,
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
	},
	play_song: function(name) {
		this.song = name;
		if (settings.background_music == "On") {
			this[name].play();
		}
	},
	stop_song: function() {
		this[this.song].stop();
		this.song = null;
	}
}