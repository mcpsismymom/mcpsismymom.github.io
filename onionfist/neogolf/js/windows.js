var windows = {
	main_w: "main",
	active_w: "main",
	all_w: ["main", "levels", "credits", "how"],
	init: function() {
		this.hide_all();

		for (let w of this.all_w) {
			$(`#window_${w}`).css("visibility", "visible");
			if (w != this.main_w) {
				this.init_w(w);
			}
		}
	},
	init_w: function(w) {

		$(`#button_${w}`).click(function() {
			windows.active_w = w;
			windows.hide_all();
			$(`#window_${w}`).show();
		});
	},
	hide_all: function() {
		for (let w of this.all_w) {
			if (w != this.active_w) {
				$(`#window_${w}`).hide();
			}
		};
	},
	activate_main: function() {
		this.active_w = this.main_w;
		this.hide_all();
		$(`#window_${this.active_w}`).show();
	}
}