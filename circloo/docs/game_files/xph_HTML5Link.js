(function() {
    var windowHandleHasOnClickInited = false;
    var gotoUrl = null;
    var stepsSinceActivation = 0;

    window.html5LinkActivate = function(windowHandleName, url) {
        var windowHandle = document.getElementById(windowHandleName);
        gotoUrl = url;
        stepsSinceActivation = 2;

        if (! windowHandleHasOnClickInited) {
            windowHandleHasOnClickInited = true;

            windowHandle.addEventListener("click", function() {
                if (gotoUrl !== null)
                    window.open(gotoUrl, "_blank");
            });
        }
    };

    window.html5LinkStep = function() {
        if (gotoUrl !== null && stepsSinceActivation >= 0) {
            stepsSinceActivation--;

            if (stepsSinceActivation <= 0) {
                gotoUrl = null;
            }
        }
    };

    window.html5LinkDeactivate = function() {
        gotoUrl = null;
    };

    window.html5LinkActive = function() {
        return gotoUrl !== null;
    }
})();