var a = {
	e: function(px, py, blades, enemy_radius, enemy_speed, interval, hp) {

		var enemy = new Enemy(px, py, blades, enemy_radius, enemy_speed, interval, hp);
		enemies.push(enemy);
	},
	wave_msg: function(tide_num) {
		$("#overlay_msg").css("visibility", "visible");
		$("#overlay_txt").text(`Wave ${wave_num} - ${tide_num}`);
		$("#overlay_msg").hide();
		$("#overlay_msg").fadeIn();

		setTimeout(function() {
			$("#overlay_msg").fadeOut();
		}, 3000);
	}
}