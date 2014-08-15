(function(DOM, location) {
    "use strict";

    var baseUrl = location.href.split(/[\?#]/)[0],
        skipHashchange = false;

    DOM.on("ajaxify:loadend", function(response, xhr, target, _, canceled) {
        if (!canceled && typeof response === "object") {
            // update browser url
            if (response.url !== location.href.replace("#/", "")) {
                skipHashchange = true;

                location.hash = response.url.replace(baseUrl, "/");
            }
        }
    });

    window.onhashchange = function() {
        if (skipHashchange) {
            skipHashchange = false;
        } else {
            DOM.fire("ajaxify:history", baseUrl + location.hash.replace("#/", ""));
        }
    };
}(window.DOM, location));
