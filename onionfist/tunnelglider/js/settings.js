
var settings_blueprint = [

	{
		id: "music",
		name: "Music and Sounds",
		options: ["On", "Off"],
		default_index: 0,
		update: (prev_option, new_option) => {},
	},
	{
		id: "graphics",
		name: "Graphics Quality",
		options: ["Low", "High"],
		default_index: 1,
		update: (prev_option, new_option) => {
			if (new_option == "High") {
				fountain = decorations.make_fountain();
	            fountain.parent = player;
			} else if (new_option == "Low") {
				if (fountain != null) {
					fountain.dispose();
					decorations.particleSystem.dispose();
					
					delete fountain;
					decorations.particleSystem = null;
				}
			}
		},
	},
	{
		id: "auto_restart",
		name: "Auto Restart",
		options: ["On", "Off"],
		default_index: 1,
		update: (prev_option, new_option) => {},
	},
	{
		id: "resolution",
		name: "Resolution",
		options: ["400p", "600p", "900p"],
		default_index: 1,
		update: (prev_option, new_option) => {},
	}
];


var settings = {
	init: function() {
		for (let setting of settings_blueprint) {
			this.init_setting(setting);
		}
	},
	init_setting: async function(setting) {
		// get data
		var retrieved_data = await this.setting_promise(setting.id);
		if ((retrieved_data == null) || (setting.options.indexOf(retrieved_data) == -1)) {
			retrieved_data = setting.options[setting.default_index];
		}
		console.log(setting.id, retrieved_data);

		this[setting.id] = retrieved_data;

		var contHTML = `<div class="setting" id="setting_${setting.id}"><h2>${setting.name}</h2></div>`;

		$("#settings").append(contHTML);

		for (let option of setting.options) {
			this.init_option(setting, option);
		}
	},
	init_option: function(setting, option) {
		var optionHTML = `<div class="setting_option" id="option_${setting.id}_${option}">${option}</div>`;
		$(`#setting_${setting.id}`).append(optionHTML);

		this.update_option_css(setting.id, option);

		var jobj = $(`#option_${setting.id}_${option}`);
		jobj.click(function() {
			settings.set(setting.id, option);
		});
	},
	update_option_css: function(setting_id, option_id) {
		var is_selected = false;
		if (this[setting_id] == option_id) {
			is_selected = true;
		}
		var jobj = $(`#option_${setting_id}_${option_id}`);
		if (is_selected) {
			jobj.css("border-color", "#6BFA8A");
		} else {
			jobj.css("border-color", "black");
		}
	},
	setting_promise: function(setting_id) {
		return new Promise((resolve, reject) => {
			sync.get(setting_id, function(data) {
				resolve(data);
			});
		});
	},
	set: function(setting_id, option_id) {

		var setting;
		var setting_index = -1;
		for (var i=0;i<settings_blueprint.length;i++) {
			if (settings_blueprint[i].id == setting_id) {
				setting = settings_blueprint[i];
				setting_index = i;
				break;
			}
		}

		var prev_option_index = setting.options.indexOf(this[setting_id]);
		var prev_option = setting.options[prev_option_index];

		var new_option = option_id;

		// RAM

		settings_blueprint[setting_index].update(prev_option, new_option);
		this[setting_id] = new_option;
		this.update_option_css(setting_id, prev_option);
		this.update_option_css(setting_id, new_option);

		// STORAGE
		// sync.

		sync.set(setting_id, new_option, function() {

		});

	}
}


