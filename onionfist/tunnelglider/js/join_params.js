var join_params = {
	obj: {},
	init: function() {
		let hash = location.hash.slice(1);

		if (hash.length < 3) {
			this.obj = {};
			return;
		}
		if (!hash.includes("=")) {
			this.obj = {map: hash};
			return;
		}
		this.obj = JSON.parse('{"' + decodeURI(hash).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

		window.location.hash = "";
	},
	open_destination: function() {
		if (this.obj.click != null) {
			$(`#${this.obj.click}`).click();
		} else if (this.obj.state != null) {
			state.set(this.obj.state);
		} else if (this.obj.map != null) {
			this.open_map(this.obj.map);
		} else {
			state.set("main_menu");
		}
	},
	open_map: function(load_map_id) {
        for (let map of map_info) {
            if (map.id == load_map_id) {
                console.log(`Loading ${map.id}`);
                state.set("playing", {map_id: map.id});
                return;
            }
        }
	}
}