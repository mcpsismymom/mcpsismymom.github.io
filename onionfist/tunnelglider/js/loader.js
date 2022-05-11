var loader = {
	init: function (map_src) {
		return new Promise(resolve => {
            this.load_map(map_src, response => resolve(response));
		});
	},
    load_map: function(map_js, callback) {
        this.loadScript(map_js, function() {
            setTimeout(function() {
                callback("done");
            }, 200);
        });
    },
    loadScript: function(url, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);
    }
}