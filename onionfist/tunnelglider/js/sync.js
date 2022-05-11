var sync = {
    prefix: "3@",
    key: function(key) {
        if (key.slice(0,2) != this.prefix) {
            return this.prefix + key;
        } else {
            return key;
        }
    },
    keys: function(keys) {
        return keys.map(v => this.key(v));
    },
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
        key = this.key(key);
        saveObject[key] = val;

        chrome.storage.local.set(saveObject, function(){
            webext.record_set(key, val);
            if (callback) callback();
        });
    },
    get: function(key, callback) {
        key = this.key(key);
        chrome.storage.local.get([key], function(items) {
            let local_data = items[key];
            if (callback) callback(local_data);
        });
    },
    async_get: function(key) {
        return new Promise((resolve, reject) => {
            sync.get(key, function(data) {
                resolve(webext.to_num(data));
            });
        });
    },
    async_set: function(key, val) {
        return new Promise((resolve, reject) => {
            sync.set(key, val, function() {
                resolve();
            });
        });
    },
    r: function(key) {
        this.get(key, (data) => {
            console.log(">>",data);
        });
    }
}