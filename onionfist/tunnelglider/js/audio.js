var audio = {
	start_music: function(music) {
		const song_src = `assets/songs/${music}.mp3`;
		this.load(song_src);
		this.play();
	},
	load: function(song) {
		var audio = $("#audio")[0];
	    $("#audiosource").attr("src", song);
	    audio.load();
	},
	play: function() {
		if (settings.music == "On") {
		    var audio = $("#audio")[0];
	    	audio.oncanplaythrough = audio.play();
	    	audio.currentTime = 0;
	    }
	},
	stop: function() {
		document.getElementById('audio').pause();
	},
	die: function() {
		if (settings.music == "On") {
			var audio_player = $("#sound_die")[0];
			audio_player.oncanplaythrough = audio_player.play();
			audio_player.currentTime = 0;
		}	
	}
}
