var map = {
  music: "col_electricity",
	init: function() {
		// alert("H")
		this.difficulty = 15;
    this.diff_update = 0;
    this.frame = 0;
		this.interval = setInterval(function() {
			map.update();
		}, 70);
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
  build_new: function() {

    
    function max_type(num) {
      if (num > 10) {
        return 1;
      } else if (num > 8) {
        return 2;
      } if (num > 6) {
        return 3;
      } else {
        return 4;
      }
    }

    console.log(max_type(this.difficulty))
    var rand = Math.floor(Math.random() * (max_type(this.difficulty) + 1));

    

    let tx = (Math.random() * 7) - 3.5;
    let ty = (Math.random() * 7) - 3.5;
    let tz = player.position.z - 60;

    let rx = (Math.random() - 0.5) * 180/Math.PI;
    let ry = (Math.random() - 0.5) * 180/Math.PI;
    let rz = (Math.random() - 0.5) * 180/Math.PI;

    switch(rand) {
      case 1: // DIFF 1 // Flops


        var commands = [{
          prop: ["rotation", "y"],
          fn: function(vec, frame) {
            return Math.sin(frame/100);
          }
        }];
        maker.makeBox([tx,0,tz],[rx,ry,rz],[1,7,3], 1, commands);
        break;


      case 2: // DIFF 1 // Fans
        
        const rate = 500 + Math.random() * 200;

        var commands = [{
          prop: ["rotation", "z"],
          consts: {
            offset: Math.random() * 2 * Math.PI,
            rate: (Math.random() > 0.5) ? rate : -rate
          },
          fn: function(vec, frame, consts) {
            return consts.offset + frame / (consts.rate);
          }
        }];
        maker.makeBox([0,0,tz],[0,0,rz],[1,10,3], 1, commands);

        break;
      case 3: // DIFF 2 // wipers up and down

        var commands = [{
          prop: ["position", "x"],
          consts: {
            frame_offset: Math.random() * 200000
          },
          fn: function(vec, frame, consts) {
            var arg = (frame + consts.frame_offset) / 300;
            var normal = Math.sin(arg) - 0.5;
            return normal * 3 + 1;
            // return 0;
          }
        }];
        maker.makeBox([0,0,tz],[0,0,0],[2,10,3], 1, commands);

        break;
      case 4: // DIFF 3 // wipers left and right
        
        var commands = [{
          prop: ["position", "y"],
          consts: {
            frame_offset: Math.random() * 200000
          },
          fn: function(vec, frame, consts) {
            var arg = (frame + consts.frame_offset) / 300;
            var normal = Math.sin(arg) - 0.5;
            return normal * 3 + 1;
            // return 0;
          }
        }];
        maker.makeBox([0,0,tz],[0,0,0],[10,2,3], 1, commands);


        break;
    }
  }

}