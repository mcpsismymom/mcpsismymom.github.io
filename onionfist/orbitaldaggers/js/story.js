var story = {
	scene_index: -1,
	scenes: [],
	init: function() {
		$("#story_next_btn").click(function() {
			story.next_scene();
		});
	},
	reset: function() {
		this.scene_index = -1;
		this.scenes = [];
	},
	ready: function(scenes, map_id) {
		this.map_id = map_id;
		this.scenes = scenes;
		this.next_scene();

	},
	next_scene: function() {
		this.scene_index += 1;
		if (this.scene_index < this.scenes.length) {
			var scene = this.scenes[this.scene_index];
			var img_src = (scene.img == null) ? "" : "assets/cutscenes/"+scene.img;

			// $("#story_img").attr("src", img_src);
			$("#story_txt").html(scene.txt);
		} else {
			var params = {map_id: this.map_id};
			state.set("playing", params);
		}

		
	}
}