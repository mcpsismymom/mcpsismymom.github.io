var controls = {
  left: false,
  right: false,
  space: false,
  init: function() {
    document.onkeydown = function(e) {
      if ((e.keyCode == 37) || (e.keyCode == 65)) {
        controls.left = true;
      }
      if ((e.keyCode == 39) || (e.keyCode == 68)) {
        controls.right = true;
      }
      
      if ((e.keyCode == 32) || (e.keyCode == 38) || (e.keyCode == 87)) {
        controls.space = true;
        if ((!transitioning) && (ingame) && (won)) {
          $("#next_level").click();
        }
      }

      if (e.keyCode == 82) {
        // Self Destructed
        if ((!transitioning) && (ingame) && (!won)) {
          $("#overlay_restart").click();
        }
      }
    }
    document.onkeyup = function(e) {
      if ((e.keyCode == 37) || (e.keyCode == 65)) {
        controls.left = false;
      }
      if ((e.keyCode == 39) || (e.keyCode == 68)) {
        controls.right = false;
      }
      if ((e.keyCode == 32) || (e.keyCode == 38) || (e.keyCode == 87)) {
        controls.space = false;
        update.shoot();
      }
    }
  }
}
