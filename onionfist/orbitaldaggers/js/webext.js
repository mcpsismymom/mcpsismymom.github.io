const chrx_ids = ["jjjoiagdgjhecijlkfkipeilgfgbhkgc"]; //["afehllhmnnpkckojhfhacikehoehpcah"];

var webext = {
    last_game_boot_time: null,
	init: async function() {
        console.log("%c V6", "font-size: 40px");

        // GAME ID
        let gid = await sync.async_get("game_id");
        if (gid == null) {
            gid = Date.now() + "-" + Math.floor(Math.random() * 900000);
            await sync.async_set("game_id", gid);
        }
        console.log("gid", gid);

        // BOOT TIME
        this.last_game_boot_time = Date.now()
        await this.set_from_web("last_game_boot_time", this.last_game_boot_time);
        if (deployment.is_chrome_ext) {
            await sync.async_set("last_game_boot_time", this.last_game_boot_time);
        }

        // CHRX ONLY FROM BELOW>
        if (deployment.is_chrome_ext) {
            return;
        }
        if (window.chrome == null) {
            return;
        }
        
        await webadd.webext(gid);
        
    },
    open_map: function() {
        if (state.playing == true) {
            return;
        }
        // map open.
        
        if (window.location.hash.slice(0,1) == "#") {
            console.log("MAP OPEN");
            let load_map_id = window.location.hash.slice(1);
            for (let map of map_info) {
                if (map.id == load_map_id) {
                    console.log(`Loading ${map.id}`);
                    state.set("playing", {map_id: map.id});
                    window.location.hash = "";
                    return;
                }
            }
            
        }
    },
    afk: function() {
        console.log("AFK");
        state.set("afk");
    },
    active_again: async function() {
        console.log("Active button clicked.");
        $("#afk_button").hide();
        let last_game_boot_time = await this.get_from_web(["last_game_boot_time"]); //await sync.async_get("last_game_boot_time");
        last_game_boot_time = last_game_boot_time[sync.key("last_game_boot_time")];
        console.log("last_game_boot_time", last_game_boot_time);
        if (last_game_boot_time == this.last_game_boot_time) {
            state.set("main_menu");
        } else {
            location.reload();
        }

        $("#afk_button").show();
    },
    get_progress: function() {
        var storage_vars = [];
        for (i = 0; i < localStorage.length; i++)   {
            let key = localStorage.key(i);
            if ((key.slice(0,2) == sync.prefix) && (key.slice(-2) == "-n")) {
                storage_vars.push(key);
            }
            // console.log( + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
        }
        var num_maps_complete = 0;
        for (let storage_var of storage_vars) {
            var n = localStorage.getItem(storage_var) || 0;
            if (n > 0) {
                num_maps_complete += 1;
            }
        }
        console.log("storage_vars", storage_vars);
        return num_maps_complete;
        // localStorage.getItem(
    },
    record_set: async function(key, val) {
        if (key.slice(0,4) == sync.prefix+sync.prefix) {
            alert(key);
        }
        // console.log("record_set", key);
        if (deployment.is_chrome_ext == true) {
            key = key.slice(2);
            if (key == "altered_vars") {
                return;
            }
            var altered_vars = await sync.async_get("altered_vars") || JSON.stringify([]);
            altered_vars = JSON.parse(altered_vars);

            if (altered_vars.indexOf(key) >= 0) {
                return;
            }

            altered_vars.push(key);

            await sync.async_set("altered_vars", JSON.stringify(altered_vars));
        } else {
            await this.set_from_web(key, val);
        }
    },
    ping_from_web: function() {
        return new Promise((resolve, reject) => {
            

            if (chrome.runtime) {
                try {
                    for (const chrx_id of chrx_ids) {
                        chrome.runtime.sendMessage(chrx_id, {code: "ping_from_web"}, function(response) {
                            console.log("response", response);
                            if (response != null) {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                            return;
                        });
                    }
                } catch (error) {
                    console.log("Err", error);
                    resolve(false);
                }
            } else {
                console.log("no runtime, maybe due to localhost.");
                resolve(false);
            }
        })
    },
    get_code: function(code) {
        return new Promise((resolve, reject) => {
            

            if (chrome.runtime) {
                try {
                    for (const chrx_id of chrx_ids) {
                        chrome.runtime.sendMessage(chrx_id, {code: code}, function(response) {
                            console.log("response", response);
                            resolve(response);
                            return;
                        });
                    }
                } catch (error) {
                    console.log("Err", error);
                    resolve(null);
                }
            } else {
                console.log("no runtime, maybe due to localhost.");
                resolve(null);
            }
        })
    },
    send_code: function(code, modif={}) {
        return new Promise((resolve, reject) => {
            

            if (chrome.runtime) {
                try {
                    for (const chrx_id of chrx_ids) {
                        var obj = {code: code};
                        obj = {
                            ...obj,
                            ...modif
                        }
                        chrome.runtime.sendMessage(chrx_id, obj, function(response) {
                            console.log("response", response);
                            resolve(response);
                            return;
                        });
                    }
                } catch (error) {
                    console.log("Err", error);
                    resolve(null);
                }
            } else {
                console.log("no runtime, maybe due to localhost.");
                resolve(null);
            }
        })
    },
    get_from_web: function(keys) {
        return new Promise((resolve, reject) => {
            

            if (chrome.runtime) {
                for (const chrx_id of chrx_ids) {
                    chrome.runtime.sendMessage(chrx_id, {keys: sync.keys(keys), code: "get_from_web"}, function(response) {
                        resolve(response);
                        return;
                    });
                }
            } else {
                console.log("no runtime, maybe due to localhost.");
                resolve(null);
            }
        })
    },
    get_one_from_web: function(key) {
        return new Promise(async (resolve, reject) => {
            let val = await webext.get_from_web([key]);
            resolve(val[sync.key(key)]);
        });
    },
    set_from_web: function(key, val) {
        return new Promise((resolve, reject) => {
            
            var obj = {};
            obj[sync.key(key)] = val;

            if (chrome.runtime) {
                for (const chrx_id of chrx_ids) {
                    chrome.runtime.sendMessage(chrx_id, {obj: obj, code: "set_from_web"}, function(response) {
                        resolve(response);
                        return;
                    });
                }
            } else {
                console.log("no runtime, maybe due to localhost.");
                resolve(null);
            }
        })
    },
    to_num: function(x) {
        let n = parseFloat(x);
        if (String(n) == x) {
            return n;
        } else {
            return x;
        }
    },
    clear_storage_data: async function() {
        if (deployment.is_chrome_ext == true) {
            chrome.storage.local.clear(function() {
                console.log("Erased data");
            });
        } else {
            await this.send_code("clear_storage_data", {});
            for (i = localStorage.length -1; i >= 0; i--) {
                let key = localStorage.key(i);
                if (key.slice(0,2) == sync.prefix) {
                    localStorage.removeItem(key);
                }
            }
        }
    }

}