var score = {
    temp_num: 0,
    num: 0,
    update: function(delta) {
        this.temp_num += delta;
        var new_num = Math.round(this.temp_num) / 100; //.toFixed(2);

        if ((new_num > this.num) && (state.playing == true)) {
            this.num = new_num;
        }

        var s = new_num.toString();
		if (s.indexOf('.') == -1) s += '.';
		while (s.length < s.indexOf('.') + 3) s += '0';

        var display_HTML = `${s} pt`;
        $("#overlay_score").html(display_HTML);
    },
    reset: function() {
        this.temp_num = 0;
        this.num = 0;
        $("#overlay_score").html("0 pt");
    },
    show_high: async function(map_id) {
        var info = await scorekeeper.map_promise(map_id);
        $("#overlay_high").html(`HI: ${info.tim} pt`);

        if (info.tim < 6) {
            // $("#controls_overlay").show();
        }
    }
}