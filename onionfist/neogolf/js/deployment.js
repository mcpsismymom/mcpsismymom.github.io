var deployment = {
    is_chrome_ext: null,
    init: function() {
        // firefox / I.E. / etc...
        if (window.chrome == null) {
            this.is_chrome_ext = false;
            return;
        }
        // chrome
        this.is_chrome_ext = (window.chrome.extension !== undefined);
        console.log("this.is_chrome_ext", this.is_chrome_ext);
        
    }
}


