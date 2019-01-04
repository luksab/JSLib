jsLib.color = {};
jsLib.color.rgb2Hsl = function (r, g, b) {
    if (typeof r === 'object') {
        const args = r
        r = args.r; g = args.g; b = args.b;
    }
    // It converts [0,255] format, to [0,1]
    r = r % RGB_MAX / parseFloat(RGB_MAX)
    g = g % RGB_MAX / parseFloat(RGB_MAX)
    b = b % RGB_MAX / parseFloat(RGB_MAX)

    var max = Math.max(r, g, b)
    var min = Math.min(r, g, b)
    var h
    var s
    var l = (max + min) / 2

    if (max === min) {
        h = s = 0 // achromatic
    } else {
        var d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }

    return [{
        h: Math.floor(h * HUE_MAX),
        s: Math.floor(s * SV_MAX),
        l: Math.floor(l * SV_MAX)
    }]
}
jsLib.color.rgbToHsl = jsLib.color.rgb2Hsl

jsLib.color.rgb2Hsv = function (r, g, b) {
    if (typeof r === 'object') {
        const args = r
        r = args.r; g = args.g; b = args.b;
    }

    // It converts [0,255] format, to [0,1]
    r = r % RGB_MAX / parseFloat(RGB_MAX)
    g = g % RGB_MAX / parseFloat(RGB_MAX)
    b = b % RGB_MAX / parseFloat(RGB_MAX)

    var max = Math.max(r, g, b)
    var min = Math.min(r, g, b)
    var h
    var s
    var v = max

    var d = max - min

    s = max === 0 ? 0 : d / max

    if (max === min) {
        h = 0 // achromatic
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }

    return [{
        h: Math.floor(h * HUE_MAX),
        s: Math.floor(s * SV_MAX),
        v: Math.floor(v * SV_MAX)
    }]
}
jsLib.color.rgbToHsv = jsLib.color.rgb2Hsv

jsLib.color.hsl2Rgb = function (h, s, l) {
    if (typeof r === 'object') {
        const args = h
        h = args.h; s = args.s; l = args.l;
    }

    var r, g, b

    h = h === HUE_MAX ? 1 : (h % HUE_MAX / parseFloat(HUE_MAX) * 6)
    s = s === SV_MAX ? 1 : (s % SV_MAX / parseFloat(SV_MAX))
    l = l === SV_MAX ? 1 : (l % SV_MAX / parseFloat(SV_MAX))

    if (s === 0) {
        r = g = b = l // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s
        var p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }
    return { r: Math.round(r * RGB_MAX), g: Math.round(g * RGB_MAX), b: Math.round(b * RGB_MAX) }
}

jsLib.color.hslToRgb = jsLib.color.hsl2Rgb

jsLib.color.hsv2Rgb = function (h, s, v) {
    if (typeof h === 'object') {
        const args = h
        h = args.h; s = args.s; v = args.v;
    }

    h = h === HUE_MAX ? 1 : (h % HUE_MAX / parseFloat(HUE_MAX) * 6)
    s = s === SV_MAX ? 1 : (s % SV_MAX / parseFloat(SV_MAX))
    v = v === SV_MAX ? 1 : (v % SV_MAX / parseFloat(SV_MAX))

    var i = Math.floor(h)
    var f = h - i
    var p = v * (1 - s)
    var q = v * (1 - f * s)
    var t = v * (1 - (1 - f) * s)
    var mod = i % 6
    var r = [v, q, p, p, t, v][mod]
    var g = [t, v, v, q, p, p][mod]
    var b = [p, p, t, v, v, q][mod]

    return { r: Math.round(r * RGB_MAX), g: Math.round(g * RGB_MAX), b: Math.round(b * RGB_MAX) }
}
jsLib.color.hsvToRgb = jsLib.color.hsv2Rgb

jsLib.c = jsLib.color;
jsLib.colour = jsLib.color;