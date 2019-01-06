const RGB_MAX = 255
const HUE_MAX = 360
const SV_MAX = 100

var jsLib = window.jsLib = {}

jsLib.setHTML = function (url, element) {
    function fetch_text(url) {
        return fetch(url).then((response) => (response.text()));
    }
    fetch_text(location.protocol+"//"+location.host+url).then((html) => {
        element.innerHTML = html;
    }).catch((error) => {
        console.warn(error);
    });
}

jsLib.LCS = function (s1, s2) {
    var result = [];
    for (var i = 0; i <= s1.length; i++) {
        result.push([]);
        for (var j = 0; j <= s2.length; j++) {
            var currValue = 0;
            if (i == 0 || j == 0) {
                currValue = 0;
            } else if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                currValue = result[i - 1][j - 1] + 1;
            } else {
                currValue = Math.max(result[i][j - 1], result[i - 1][j]);
            }
            result[i].push(currValue);
        }
    }

    var i = s1.length;
    var j = s2.length;

    var s3 = '';
    while (result[i][j] > 0) {
        if (s1.charAt(i - 1) == s2.charAt(j - 1) && (result[i - 1][j - 1] + 1 == result[i][j])) {
            s3 = s1.charAt(i - 1) + s3;
            i = i - 1;
            j = j - 1;
        } else if (result[i - 1][j] > result[i][j - 1])
            i = i - 1;
        else
            j = j - 1;
    }
    return s3;
}

