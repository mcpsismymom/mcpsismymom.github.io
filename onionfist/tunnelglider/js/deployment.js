var deployment = {
    is_chrome_ext: null,
    is_oworld: null,
    is_localhost: null,
    init: function() {
        this.is_chrome_ext = this.check_is_chrome_ext();
        this.is_oworld = this.check_is_oworld();
        this.is_localhost = window.location.hostname == "localhost";

        if (!this.is_chrome_ext) {
            $("#fullscreen_btn").remove();
        }
    },
    check_is_chrome_ext: function() {
        // firefox / I.E. / etc...
        if (window.chrome == null) {
            return false;
        }
        if (window.chrome.extension == null) {
            return false;
        }
        return true;
    },
    check_is_oworld: function() {
        if (window.is_oworld == true) {
            return true;
        }
        return false;
    }

}