var sync = {
	init: function() {
    	// use chrome storage or local storage?
    	if (!deployment.is_chrome_ext) {
            if (window.chrome == null) {
                window.chrome = {};
            }
            chrome.storage = {
                sync: {},
                local: {}
            };
            var set_fn = function(b, c) {
                var a = Object.keys(b);
                localStorage.setItem(a, b[a]);
                c();
            };

            var get_fn = function(b, c) {
                var a = b[0],
                    e = localStorage.getItem(a),
                    d = {};
                d[a] = e;
                c(d);
            };

            chrome.storage.local.set = set_fn;
            chrome.storage.local.get = get_fn;
        }
    },
    set: function(key, val, callback) {
        var saveObject = {};
        saveObject[key] = val;
        chrome.storage.local.set(saveObject, function(){
            if (callback) callback();
        });
    },
    get: function(key, callback) {
        chrome.storage.local.get([key], function(items) {
            let local_data = items[key];
            if (callback) callback(local_data);
        });
    }
}