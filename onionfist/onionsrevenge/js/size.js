var size = {
	popup: function() {
		if (deployment.is_chrome_ext) {
			$("body").css("width", "340px");
			$("body").css("height", "500px");
		} else {
			$("body").css("width", "100%");
			$("body").css("height", "100%");
			$("#menu_btn").css("left", "calc(50% - 160px)");
		}
	},
	ingame: function() {
		if (deployment.is_chrome_ext) {
			$("body").css("width", "600px");
			$("body").css("height", "500px");

			$("canvas").css("width", "100%");
			$("canvas").css("height", "100%");
		} else {

	   		$("body").css("width", "100%");
			$("body").css("height", "100%");

			const cur_gradient = window.innerHeight / window.innerWidth;
			const tar_gradient = 500 / 600;
			
			var scale_factor;

			if (cur_gradient > tar_gradient) {
				scale_factor = window.innerWidth / 600;
			} else {
				scale_factor = window.innerHeight / 500;
				
			}

			var tar_w = 600 * scale_factor;
			var tar_h = 500 * scale_factor;

			$("canvas").css("width", `${tar_w}px`);
			$("canvas").css("height", `${tar_h}px`);

			let side_pad = (window.innerWidth - tar_w) / 2 + 10;
			$("#ingame_settings_btn").css("left", `${side_pad+10}px`);
			$("#menu_btn").css("left", `${side_pad}px`);
			$("#overlay_score").css("left", `${side_pad}px`);
			$("#overlay_high").css("right", `${side_pad}px`);
			
		}
	}
}


