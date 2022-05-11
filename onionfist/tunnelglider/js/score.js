var score = {
    temp_num: 0,
    num: 0,
    update: function(delta) {
        this.temp_num += delta;
        // this.num = (this.temp_num / 10000).toFixed(2);

        var new_num = Math.round(-player.position.z) / 100;
        if ((new_num > this.num) && (state.playing == true)) {
            this.num = new_num;
        }

        var s = new_num.toString();
        if (s.indexOf('.') == -1) s += '.';
        while (s.length < s.indexOf('.') + 3) s += '0';

        var display_HTML = `${s} km`;
        $("#overlay_score").html(display_HTML);
    },
    reset: function() {
        this.temp_num = 0;
        this.num = 0;
        $("#overlay_score").html("0 km");
    },
    show_high: async function(map_id) {
        var info = await scorekeeper.map_promise(map_id);
        $("#overlay_high").html(`High: ${info.tim} km`);

        if (info.tim < 6) {
            $("#controls_overlay").show();
        }
    }
}