//Modified version of orchidslibrary.js

function noiseify(color, range) {
    if (color.startsWith("#")) {
        color = hexToRGB(color)
    } else {
        color = getRGB(color)
    }
    for (let value in color) {
        color[value] += Math.round(Math.random() * (range * 2)) - range
    }
    return `rgb(${color.r},${color.g},${color.b})`
}

function is2d(arr) {
    return arr.some(item => Array.isArray(item))
}

function colorMix(p1, p2, bias = 0.5, condition = undefined) {
    if (condition != undefined && condition(p1, p2)) {
        c1 = p1.color
        p1.color = interpolateRgb(getRGB(p1.color), getRGB(p2.color), bias)
        p2.color = interpolateRgb(getRGB(c1), getRGB(p2.color), bias)
    } else {
        c1 = p1.color
        p1.color = interpolateRgb(getRGB(p1.color), getRGB(p2.color), bias)
        p2.color = interpolateRgb(getRGB(c1), getRGB(p2.color), bias)
    }

}

function interpolateRgb(rgb1, rgb2, ratio = 0.5) {
    return normalize({
        r: Math.round(rgb1.r + (rgb2.r - rgb1.r) * ratio),
        g: Math.round(rgb1.g + (rgb2.g - rgb1.g) * ratio),
        b: Math.round(rgb1.b + (rgb2.b - rgb1.b) * ratio),
    })
}

function getRGB(rgb) {
    if (rgb.startsWith("rgb(")) {
        let rgb2 = rgb.replace(")", "").replace("rgb(", "").replace(/,/g, "r").split("r")
        return { r: parseInt(rgb2[0]), g: parseInt(rgb2[1]), b: parseInt(rgb2[2]) }
    } else {
        return hexToRGB(rgb)
    }
}
function pixelToggle(pixel, multi = { r: 1, g: 1, b: 1 }) {
    if (pixel.toggle != undefined) {
        pixel.toggle = !pixel.toggle
        let rgb
        if (Array.isArray(elements[pixel.element].color)) {
            let elemColor = elements[pixel.element].color[Math.round(Math.random() * elements[pixel.element].color.length)]
            rgb = hexToRGB(elemColor) || getRGB(elemColor)
        } else {
            let elemColor = elements[pixel.element].color
            rgb = hexToRGB(elemColor) || getRGB(elemColor)
        }
        let num = 5 - Math.round(Math.random() * 10)
        if (pixel.toggle) {
            for (let key in rgb) {
                rgb[key] += (100 * multi[key])
                rgb[key] = Math.round(Math.max(Math.min(rgb[key], 255), 0))
            }
            pixel.color = `rgb(${rgb.r + num},${rgb.g + num},${rgb.b + num})`
        }
        else {
            pixel.color = `rgb(${rgb.r + num},${rgb.g + num},${rgb.b + num})`
        }
    }
}
function normalize(obj) {
    return `rgb(${obj.r},${obj.g},${obj.b})`
}

function xor(c1, c2) {
    if (!!c1 && !c2) {
        return true
    } else if (!c1 && !!c2) {
        return true
    } else {
        return false
    };
}

function clamp(x, min, max) {
    return Math.max(min, Math.min(x, max))
}

function pseudorandom(key, num, max = 1) {
    return (Math.log(key) * (num * Math.log(1625.4986772154357))) % max
}

//More elists
eLists.STONEELEMS = ["rock", "gravel", "tuff", "basalt", "rock_wall"]
