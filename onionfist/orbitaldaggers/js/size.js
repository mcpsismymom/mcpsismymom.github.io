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
		} else {
	   		$("body").css("width", "100%");
			$("body").css("height", "100%");
			
			$("#menu_btn").css("left", "10px");
		}

		window.onresize();
	}
}