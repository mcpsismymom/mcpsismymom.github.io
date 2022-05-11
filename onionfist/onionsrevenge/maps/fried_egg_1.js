

var map = {
  wave: 1,
  song: "col75000",
  init: function() {
    // a.e();
  },
  reset: function() {
    this.wave = 1;
  },
  fall: function(speed) {
    return {
      prop: ["position", "y"],
      consts: {
      },
      fn: function(vec, age, consts, delta) {
        return vec.y + speed * delta;
      }
    }
  },
  update: function(score, delta) {
    switch(this.wave) {
      case 1:
        if (score < 0.1) {
          break;
        } else {
          this.wave += 1;
        }

        var egg_script = {
          every_low: 200,
          every_high: 1500,
          fn: function(bird_pos) {
            var commands = [map.fall(4.5)];
            var sprite = "basic";
            var egg_scale = 0.8;
            a.egg(sprite, egg_scale, bird_pos.x, bird_pos.y, commands);
          }
        }

        var egg_scripts = [egg_script];
        var init_x = Math.random();
        var init_y = 1 / 15;
        var bird_scale = 0.2;
        var sprite = "normal";
        var bird_speed = Math.random() * 4 + 4;

        a.bird(sprite, bird_scale, init_x, init_y, egg_scripts, bird_speed);

        break;
      case 2:
        if (score < 3) {
          break;
        } else {
          this.wave += 1;
        }

        var egg_script = {
          every_low: 200,
          every_high: 1500,
          fn: function(bird_pos) {
            var commands = [map.fall(6.5)];
            var sprite = "yellow";
            var egg_scale = 0.5;
            a.egg(sprite, egg_scale, bird_pos.x, bird_pos.y, commands);
          }
        }

        var egg_scripts = [egg_script];
        var init_x = Math.random();
        var init_y = 1 / 15;
        var bird_scale = 0.2;
        var sprite = "normal";
        var bird_speed = Math.random() * 4 + 4;

        a.bird(sprite, bird_scale, init_x, init_y, egg_scripts, bird_speed);

        break;
      case 3:
        if (score < 9) {
          break;
        } else {
          this.wave += 1;
        }

        var egg_script = {
          every_low: 500,
          every_high: 1500,
          fn: function(bird_pos) {
            var commands = [map.fall(4), {
              prop: ["position", "x"],
              consts: {
              },
              fn: function(vec, age, consts, delta) {
                let direction = (me.cont.position.x > vec.x) ? 1 : -1;
                return vec.x + 0.65 * delta * direction;
              }
            }];
            var sprite = "purple";
            var egg_scale = 0.8;
            a.egg(sprite, egg_scale, bird_pos.x, bird_pos.y, commands);
          }
        }

        var egg_scripts = [egg_script];
        var init_x = Math.random();
        var init_y = 1 / 15;
        var bird_scale = 0.2;
        var sprite = "normal";
        var bird_speed = Math.random() * 4 + 4;

        a.bird(sprite, bird_scale, init_x, init_y, egg_scripts, bird_speed);

      case 4:
        if (score < 16) {
          break;
        } else {
          this.wave += 1;
        }

        var egg_script = {
          every_low: 1500,
          every_high: 4000,
          fn: function(bird_pos) {
            const spread = function(vx) {
              return {
                prop: ["position", "x"],
                consts: {
                  vx: vx
                },
                fn: function(vec, age, consts, delta) {
                  // let direction = (me.cont.position.x > vec.x) ? 1 : -1;
                  return vec.x + 0.75 * delta * consts.vx;
                }
              }
            }

            a.egg("green", 0.8, bird_pos.x, bird_pos.y, [map.fall(3), spread(-1)]);
            a.egg("green", 0.8, bird_pos.x, bird_pos.y, [map.fall(3), spread(0)]);
            a.egg("green", 0.8, bird_pos.x, bird_pos.y, [map.fall(3), spread(1)]);
          }
        }

        var egg_scripts = [egg_script];
        var init_x = Math.random();
        var init_y = 1 / 15;
        var bird_scale = 0.2;
        var sprite = "normal";
        var bird_speed = 6;

        a.bird(sprite, bird_scale, init_x, init_y, egg_scripts, bird_speed);

        break;
      case 5:
        if (score < 22) {
          break;
        } else {
          this.wave += 1;
        }

        var egg_script = {
          every_low: 400,
          every_high: 2500,
          fn: function(bird_pos) {
            var commands = [{
              prop: ["position", "y"],
              consts: {
              },
              fn: function(vec, age, consts, delta) {
                return vec.y + 6 * delta * (Math.sin(age / 4) + 0.5);
              }
            }];
            var sprite = "red";
            var egg_scale = 0.8;
            a.egg(sprite, egg_scale, bird_pos.x, bird_pos.y, commands);
          }
        }

        var egg_scripts = [egg_script];
        var init_x = Math.random();
        var init_y = 1 / 15;
        var bird_scale = 0.2;
        var sprite = "normal";
        var bird_speed = Math.random() * 4 + 6;

        a.bird(sprite, bird_scale, init_x, init_y, egg_scripts, bird_speed);

        break;
      default:
        // code block
        // state.set("victory")
        break;
    }
  }


}