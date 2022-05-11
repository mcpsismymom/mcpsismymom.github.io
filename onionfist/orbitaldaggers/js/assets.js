
var assets = {};

var asset_design = {
  room1: "backgrounds/room1.png",
  me: "characters/player.png",
  p_0: "characters/player_animation/0.png",
  p_1: "characters/player_animation/1.png",
  p_2: "characters/player_animation/2.png",
  p_3: "characters/player_animation/3.png",

  e_0: "characters/enemy_animation/0.png",
  e_1: "characters/enemy_animation/1.png",
  e_2: "characters/enemy_animation/2.png",
  e_3: "characters/enemy_animation/3.png"
}

var asset_manager = {
  init: function() {
    for (let weapon_id in weapon_blueprint) {
      asset_design["w_"+weapon_id] = `weapons/${weapon_id}.png`;
    }

    return new Promise(resolve => {
      this.load_assets_sync(asset_design, response => resolve(response));
    });
  },
  load_assets_sync: function(to_load, callback) {
    function to_url(v) {
      return "assets/"+to_load[v];
    }

    for (let k in to_load) {
      if (PIXI.Loader.shared.resources[to_url(k)] != null) {
        delete to_load[k];
      }
    }

    let asset_names = Object.keys(to_load);
    let asset_urls = asset_names.map(v => to_url(v));
    let num_assets = asset_names.length;

    PIXI.Loader.shared.add(asset_urls).load(function() {
      for (var i=0;i<num_assets;i++) {
        let asset_name = asset_names[i];
        let asset_url = asset_urls[i];
        assets[asset_name] = PIXI.Loader.shared.resources[asset_url].texture;
      }
      callback();
    });
  },
  load_more: function(asset_paths) {
    return new Promise(resolve => {
      this.load_assets_sync(asset_paths, response => resolve(response));
    });
  }
}