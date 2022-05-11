var map = {
  music: "col_down_caves",
	init: function() {
		// alert("H")
		this.difficulty = 15;
    this.diff_update = 0;
    this.frame = 0;
		this.interval = setInterval(function() {
			map.update();
		}, 80);
	},
	cleanup: function() {
		clearInterval(this.interval);
    speed_multiplier = 1;
    this.difficulty = 15;
    this.diff_update = 0;
    this.frame = 0;
	},

  update: function() {
    this.frame += 1;
    if ((this.frame % this.difficulty) == 0) {
      this.build_new();



      this.diff_update++;
      if ((this.diff_update%5 == 0) && (this.difficulty > 5)) {
        this.difficulty -= 1;
        speed_multiplier += 0.06;
      }
    }


  },
  build_new:function() {
    var rand;
    if (this.difficulty > 10) {
      rand = Math.floor(Math.random() * 2);
    } else if (this.difficulty > 8) {
      rand = Math.floor(Math.random() * 3);
    } else {
      rand = Math.floor(Math.random() * 4);
    }

    let tx = (Math.random() * 7) - 3.5;
    let ty = (Math.random() * 7) - 3.5;
    let tz = player.position.z - 60;

    let rx = (Math.random() - 0.5) * 180/Math.PI;
    let ry = (Math.random() - 0.5) * 180/Math.PI;
    let rz = (Math.random() - 0.5) * 180/Math.PI;

    switch(rand) {
      case 0: // DIFF 1 // random vertical pillar
        maker.makeBox([tx,0,tz],[rx,ry,rz],[1,7,1], 1);
        break;
      case 1: // DIFF 1 // random horizontal pillar
        maker.makeBox([0,ty,tz],[rx,ry,rz],[7,1,1], 1);
        break;
      case 2: // DIFF 2 // hoop
        maker.makeBox([tx-2,ty,tz],[0,0,0],[0.25,4,3], 1);
        maker.makeBox([tx+2,ty,tz],[0,0,0],[0.25,4,3], 1);
        maker.makeBox([tx,ty-2,tz],[3.14/2,0,0],[4,0.25,3], 1);
        maker.makeBox([tx,ty+2,tz],[3.14/2,0,0],[4,0.25,3], 1);
        break;
      case 3: // DIFF 3 // stick
        maker.makeBox([tx,ty,tz],[0,0,3.14/2],[0.75,0.75,5], 1);
        break;
    }
  }

}