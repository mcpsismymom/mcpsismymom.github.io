

var map = {
  wave: 1,
  song: "col10000",
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
          every_low: 400 + 200,
          every_high: 700 + 1500,
          fn: function(bird_pos) {
            var commands = [map.fall(4.5), {
              prop: ["position", "x"],
              consts: {
                direction: (Math.random() > 0.5) ? -1 : 1
              },
              fn: function(vec, age, consts, delta) {
                let duration = 20;
                let way = ((age % duration) > (duration/2)) ? 1 : -1;
                return vec.x + 3 * delta * way * consts.direction;
              }
            }];
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
          every_low: 400 + 600,
          every_high: 700 + 2000,
          fn: function(bird_pos) {

            let phase_start = 15 + Math.random() * 50;

            var commands = () => {
              return [{
                prop: ["position", "y"],
                consts: {
                  phase_start: phase_start
                },
                fn: function(vec, age, consts, delta) {
                  if (age < consts.phase_start) {
                    return vec.y + 6 * delta;
                  } else {
                    let velocity = -4.3 + (age - phase_start) / 7;
                    return vec.y + delta * velocity;
                  }
                }
              }, {
                prop: ["position", "x"],
                consts: {
                  phase_start: phase_start,
                  direction: 6 * Math.random() - 3
                },
                fn: function(vec, age, consts, delta) {
                  if (age < consts.phase_start) {
                    return vec.x;
                  } else {
                    return vec.x + delta * consts.direction;
                  }
                }
              }, {
                prop: ["rotation"],
                consts: {
                  phase_start: phase_start,
                },
                fn: function(vec, age, consts, delta) {
                  if (age < consts.phase_start) {
                    return 0
                  } else {
                    return vec + 0.3 * delta;
                  }
                }
              }];
            }
            var sprite = "yellow";
            var egg_scale = 0.8;

            a.egg(sprite, egg_scale, bird_pos.x, bird_pos.y, commands());
            a.egg(sprite, egg_scale, bird_pos.x, bird_pos.y, commands());
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
          every_low: 400 + 200,
          every_high: 700 + 1200,
          fn: function(bird_pos) {
            let phase_start = 10 + Math.random() * 20;
            let phase_end = phase_start + 10 + Math.random() * 30;

            var commands = [map.fall(4), {
              prop: ["rotation"],
              consts: {
                phase_start: phase_start,
                phase_end: phase_end
              },
              fn: function(vec, age, consts, delta) {
                if ((age > consts.phase_start) && (age < consts.phase_end)) {
                  return vec + delta * 0.5;
                } else {
                  return vec;
                }
              }
            }, {
              prop: ["position", "x"],
              consts: {
                phase_start: phase_start,
                phase_end: phase_end,
                direction: (Math.random() > 0.5) ? -1 : 1
              },
              fn: function(vec, age, consts, delta) {
                if ((age > consts.phase_start) && (age < consts.phase_end)) {
                  return vec.x + 4 * delta * consts.direction;
                } else {
                  return vec.x;
                }
                
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
          every_low: 400 + 600,
          every_high: 700 + 2000,
          fn: function(bird_pos) {

            let phase_start = 5 + Math.random() * 10;
            let direction = (Math.random() > 0.5) ? -1 : 1;

            var i = -1;

            var commands = () => {
              i += 1;
             let phase_end = phase_start + 5 + i * 18;
              return [map.fall(4), {
                prop: ["rotation"],
                consts: {
                  phase_start: phase_start,
                  phase_end: phase_end
                },
                fn: function(vec, age, consts, delta) {
                  if ((age > consts.phase_start) && (age < consts.phase_end)) {
                    return vec + delta * 0.5;
                  } else {
                    return vec;
                  }
                }
              }, {
                prop: ["position", "x"],
                consts: {
                  phase_start: phase_start,
                  phase_end: phase_end,
                  direction: direction
                },
                fn: function(vec, age, consts, delta) {
                  if ((age > consts.phase_start) && (age < consts.phase_end)) {
                    return vec.x + 6 * delta * consts.direction;
                  } else {
                    return vec.x;
                  }
                }
              }];
            }
            var sprite = "green";
            var egg_scale = 0.8;

            a.egg(sprite, egg_scale, bird_pos.x, bird_pos.y, commands());
            a.egg(sprite, egg_scale, bird_pos.x, bird_pos.y, commands());
            a.egg(sprite, egg_scale, bird_pos.x, bird_pos.y, commands());
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
      case 5:
        if (score < 22) {
          break;
        } else {
          this.wave += 1;
        }

        var egg_script = {
          every_low: 400 + 600,
          every_high: 700 + 2000,
          fn: function(bird_pos) {
            let spread_at = 30 + 20 * Math.random();
            var commands = () => {
              return [{
                prop: ["position", "x"],
                consts: {
                  spread_direction: 6 * Math.random() - 3,
                  spread_at: spread_at
                },
                fn: function(vec, age, consts, delta) {
                  if (age > consts.spread_at) {
                    return vec.x + delta * consts.spread_direction ;
                  } else {
                    return vec.x;
                  }
                }
              }, {
                prop: ["position", "y"],
                consts: {
                  spread_at: spread_at
                },
                fn: function(vec, age, consts, delta) {
                  if (age > consts.spread_at + 25) {
                    return vec.y + delta * 4;
                  } else if (age > consts.spread_at) {
                    return vec.y - delta * 3;
                  } else {
                    return vec.y + delta * 3;
                  }
                }
              }];
            }
            var sprite = "red";
            var egg_scale = 0.8;

            a.egg(sprite, egg_scale, bird_pos.x, bird_pos.y, commands());
            a.egg(sprite, egg_scale, bird_pos.x, bird_pos.y, commands());
            a.egg(sprite, egg_scale, bird_pos.x, bird_pos.y, commands());
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

      case 6:

        if (score < 28) {
          break;
        } else {
          this.wave += 1;
        }

        var egg_script = {
          every_low: 400 + 200,
          every_high: 700 + 1500,
          fn: function(bird_pos) {
            var commands = [map.fall(4.5), {
              prop: ["position", "x"],
              consts: {
                direction: (Math.random() > 0.5) ? -1 : 1
              },
              fn: function(vec, age, consts, delta) {
                let duration = 60;
                let way = ((age % duration) > (duration/2)) ? 1 : -1;
                return vec.x + 3 * delta * way * consts.direction;
              }
            }];
            var sprite = "blue";
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
      default:
        // code block
        // state.set("victory")
        break;
    }
  }


}