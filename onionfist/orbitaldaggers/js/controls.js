var controls = {
  left: false,
  right: false,
  up: false,
  down: false,
  mouse_x: 0,
  mouse_y: 0,
  init: function() {
    this.bind_keys();
    this.bind_mouse();
  },
  bind_mouse: function() {
    $(document).mousedown(controls.mousedown);
    $(document).mouseup(controls.mouseup);

    $(document).mousemove(function(event) {
      controls.mouse_x = event.pageX;
      controls.mouse_y = event.pageY;

      // NOTE: Use this instead:
      // >> app.renderer.plugins.interaction.mouse.global;
    });
  },
  mousedown: function(event) {
    if (state.moving) {
      // bullet_manager.shoot(event.pageX, event.pageY);
    }

  },
  mouseup: function() {



  },
  bind_keys: function() {
    document.onkeydown = function(e) {
      // left
      if ((e.keyCode == 37) || (e.keyCode == 65)) {
        controls.left = true; controls.right = false;
        motion.anim_start();
      }
      // right
      if ((e.keyCode == 39) || (e.keyCode == 68)) {
        controls.right = true; controls.left = false;
        motion.anim_start();
      }
      // up
      if ((e.keyCode == 38) || (e.keyCode == 87)) {
        controls.up = true; controls.down = false;
        motion.anim_start();
      }
      // down
      if ((e.keyCode == 40) || (e.keyCode == 83)) {
        controls.down = true; controls.up = false;
        motion.anim_start();
      }
      // spacebar
      if (e.keyCode == 32) {
      }
      // escape
      if (e.keyCode == 27) {
        if (state.table_chatting) {
          state.set("moving");
          state.ignore("table_chatting");
        }
      }
      // enter
      if (e.keyCode == 13) {
        if (state.moving) {
          state.set("hover_chatting");
        } else if (state.hover_chatting) {
          widgets.hover_chatting.send();
          state.set("moving");
        } else if (state.table_chatting) {
          widgets.table_chatting.send();
        }
      }

      // const num_keys = [49, 50, 51, 52, 53, 54, 55];
      // for (var i=0;i<num_keys.length;i++) {
      //   if (e.keyCode == num_keys[i]) {
      //     hand.key(i);
      //   }
      // }
      
    }
    document.onkeyup = function(e) {
      // left
      if ((e.keyCode == 37) || (e.keyCode == 65)) {
        controls.left = false;
        motion.anim_stop();
      }
      // right
      if ((e.keyCode == 39) || (e.keyCode == 68)) {
        controls.right = false;
        motion.anim_stop();
      }
      // up
      if ((e.keyCode == 38) || (e.keyCode == 87)) {
        controls.up = false;
        motion.anim_stop();
      }
      // down
      if ((e.keyCode == 40) || (e.keyCode == 83)) {
        controls.down = false;
        motion.anim_stop();
      }
    }
  }
}
