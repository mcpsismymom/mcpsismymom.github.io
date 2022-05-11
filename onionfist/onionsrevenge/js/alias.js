var a = {
	bird: function(sprite, scale, init_x, init_y, egg_scripts, bird_speed) {

		var bird = new Bird(sprite, scale, init_x, init_y, egg_scripts, bird_speed);
		birds.push(bird);
	},
	egg: function(sprite, scale, init_x, init_y, commands) {
		var egg = new Egg(sprite, scale, init_x, init_y, commands);
		eggs.push(egg);
	},
	e: {
		basic: function() {
			// var commands = [{
	  //         prop: ["position", "y"],
	  //         consts: {
	  //           offset: Math.random() * 2 * Math.PI
	  //         },
	  //         fn: function(vec, age, consts) {
	  //           return vec.y + 0.4; //consts.offset + frame / (consts.rate);
	  //         }
	  //       }];
	        
		}
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