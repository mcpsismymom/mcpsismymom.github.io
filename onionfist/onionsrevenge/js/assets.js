
var assets = {};

var asset_design = {
  bg_boiled_egg_1: "backgrounds/boiled_egg_1.png",
  bg_scrambled_egg_1: "backgrounds/scrambled_egg_1.png",
  bg_fried_egg_1: "backgrounds/fried_egg_1.png",


  heart: "sprites/heart.png",
  roll: "sprites/roll.png",





  bird_normal: "sprites/birds/normal.png",

  egg_basic: "sprites/eggs/basic_egg.png",
  egg_green: "sprites/eggs/green_egg.png",
  egg_purple: "sprites/eggs/purple_egg.png",
  egg_red: "sprites/eggs/red_egg.png",
  egg_blue: "sprites/eggs/blue_egg.png",
  egg_yellow: "sprites/eggs/yellow_egg.png",



  p_0: "sprites/player_anim/0.png",
  p_1: "sprites/player_anim/1.png",
  p_2: "sprites/player_anim/2.png",
  p_3: "sprites/player_anim/3.png",
  p_4: "sprites/player_anim/4.png",
  p_5: "sprites/player_anim/5.png",
  p_6: "sprites/player_anim/6.png",
  p_7: "sprites/player_anim/7.png"
}



var asset_manager = {
  init: function() {
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