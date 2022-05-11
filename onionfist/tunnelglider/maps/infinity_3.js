var map = {
  music: "col_electricity",
	init: function() {
	
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
      case 1:
        var commands = [{
          prop: ["rotation", "y"],
          fn: function(vec, frame, consts, delta) {
            return vec.y + 0.001 * delta;
          }
        }, {
          prop: ["rotation", "x"],
          fn: function(vec, frame, consts, delta) {
            return vec.x + 0.001 * delta;
          }
        }];
        maker.makeBox([tx,ty,tz],[rx,ry,rz],[3,3,3], 1, commands);
        break;


      case 2:
        let angle_offset = 2 * Math.PI * Math.random();
        let direction = (Math.random() > 0.5) ? -1 : 1;

        var commands = [{
          prop: ["position", "x"],
          consts: {
            direction: direction,
            angle_offset: angle_offset
          },
          fn: function(vec, frame, consts, delta) {
            return 3 * Math.cos(consts.angle_offset + frame / 400 * consts.direction);
          }
        }, {
          prop: ["position", "y"],
          consts: {
            direction: direction,
            angle_offset: angle_offset
          },
          fn: function(vec, frame, consts, delta) {
            return 3 * Math.sin(consts.angle_offset + frame / 400 * consts.direction);
          }
        }];

        maker.makeBox([100,100,tz],[0,0,0],[2.4,2.4,2], 1, commands);

        break;
      case 3:
        var commands = [{
          prop: ["position", "z"],
          consts: {},
          fn: function(vec, frame, consts, delta) {
            return vec.z + 0.05 * delta;
          }
        }];
        maker.makeBox([tx,ty,tz],[0,0,rz],[1,1,6], 1, commands);

        break;
        
      case 4:

        const rate = 500 + Math.random() * 200;
        let length = 2 + 7 * Math.random();

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

        maker.makeBox([tx,ty,tz],[0,0,rz],[1,length,2], 1, commands);


        break;
    }
  }

}