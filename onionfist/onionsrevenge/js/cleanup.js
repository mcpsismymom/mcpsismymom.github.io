var cleanup = {
	update: function() {
		for (var i=eggs.length-1;i>=0;i--) {
			let egg = eggs[i];
			if ((egg.dead == true) || (egg.cont.position.y > app.screen.height)) {
				egg.delete();
				eggs.splice(i, 1);
			}
		}
	}
}