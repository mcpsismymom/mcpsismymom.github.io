var size = {
	w: 800,
	h: 600,
	popup: function() {
		if (deployment.is_chrome_ext) {
			$("body").css("width", "340px");
			$("body").css("height", "600px");
		} else {
			$("body").css("width", "100%");
			$("body").css("height", "100%");
			$("#menu_btn").css("left", "calc(50% - 160px)");
		}
	},
	ingame: async function() {
		let h = parseInt(settings.resolution.slice(0,-1));
		let w = Math.round(h * 4 / 3);

		if (deployment.is_chrome_ext) {
			$("body").css("width", "800px");
			$("body").css("height", "600px");
			engine.resize();
		} else {
			$("#menu_btn").css("left", "10px");
			
			// scale down for performance
			const doc_h = window.innerHeight;
			const doc_w = window.innerWidth;
	   		var scale_factor = 1;
	   		if (doc_h / doc_w > h / w) { // compare slope
	   			scale_factor = Math.min(doc_h, h) / doc_h;
	   		} else {
	   			scale_factor = Math.min(doc_w, w) / doc_w;
	   		}
	   		const tar_h = doc_h * scale_factor;
	   		const tar_w = doc_w * scale_factor;

	   		// apply
	   		$("body").css("width", "100%");
			$("body").css("height", "100%");
	   		engine.setSize(tar_w, tar_h);
		}
	}
}