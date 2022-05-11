var update = {
    render_loop: function(delta) {
        if (state.playing == true) {
            motion.update(delta);
            objects.update(delta);
            collision.update();
            score.update(delta);
        }
        cleanup.remove_passed();
        
    }
}