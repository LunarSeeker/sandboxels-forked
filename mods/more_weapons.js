colorstochoose = [
    "#000000",
    "#0000ff",
    "#00ff00",
    "#00ffff",
    "#0f0f0f",
    "#53574b",
    "#65686a",
    "#88ff77",
    "#a51002",
    "#bd1102",
    "#ff0000",
    "#ff00ff",
    "#ff0f0f",
    "#ff8800",
    "#ffff00",
    "#ffffff"
]

//Random integer from 0 to n
function randomIntegerFromZeroToValue(value) {
    var absoluteValuePlusOne = Math.abs(value) + 1
    if (value >= 0) { //Positive case
        return Math.floor(Math.random() * absoluteValuePlusOne)
    } else { //Negative case: flip sign
        return 0 - Math.floor(Math.random() * absoluteValuePlusOne)
    };
};

function randomChoice(array) {
    if (array.length === 0) { throw new Error(`The array ${array} is empty`) };
    return array[(randomIntegerFromZeroToValue(array.length - 1))]
};

elements.subzero_bomb = {
    category: "weapons",
    color: "#00d5ff",
    cooldown: defaultCooldown,
    darkText: true,
    density: 1500,
    excludeRandom: true,
    state: "solid",
    tick: function (pixel) {
        if (pixel.start === pixelTicks) { return }
        if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
            if (outOfBounds(pixel.x, pixel.y + 1) || (pixelMap[pixel.x][pixel.y + 1].element !== "subzero_bomb")) {
                for (i = 0; i < currentPixels.length; i++) {
                    var newPixel = currentPixels[i]
                    if (newPixel.temp > -273) {
                        newPixel.temp = -273
                    }
                }
                explodeAt(pixel.x, pixel.y + 1, 20, "flash")
            }
        }
        doDefaults(pixel)
    }
}

elements.ultrahot_bomb = {
    category: "weapons",
    color: "#ff0000",
    cooldown: defaultCooldown,
    density: 1500,
    excludeRandom: true,
    state: "solid",
    tick: function (pixel) {
        if (pixel.start === pixelTicks) { return }
        if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
            if (outOfBounds(pixel.x, pixel.y + 1) || (pixelMap[pixel.x][pixel.y + 1].element !== "ultrahot_bomb")) {
                for (i = 0; i < currentPixels.length; i++) {
                    var newPixel = currentPixels[i]
                    if (newPixel.temp < 999) {
                        newPixel.temp += 999
                    }
                }
                explodeAt(pixel.x, pixel.y + 1, 20, "flash")
            }
        }
        doDefaults(pixel)
    }
}

elements.color_bomb = {
    category: "weapons",
    color: "#ff0000",
    cooldown: defaultCooldown,
    density: 1500,
    excludeRandom: true,
    state: "solid",
    tick: function (pixel) {
        if (pixel.start === pixelTicks) { return }
        if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
            if (outOfBounds(pixel.x, pixel.y + 1) || (pixelMap[pixel.x][pixel.y + 1].element !== "color_bomb")) {
                for (i = 0; i < currentPixels.length; i++) {
                    var newPixel = currentPixels[i]
                    newPixel.color = randomChoice(colorstochoose)
                }
                explodeAt(pixel.x, pixel.y + 1, 20, "flash")
            }
        }
        doDefaults(pixel)
    }
}

elements.terraformer = {
    category: "weapons",
    color: "#ff0000",
    cooldown: defaultCooldown,
    density: 1500,
    excludeRandom: true,
    state: "solid",
    tick: function (pixel) {
        if (pixel.start === pixelTicks) { return }
        if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
            if (outOfBounds(pixel.x, pixel.y + 1) || (pixelMap[pixel.x][pixel.y + 1].element !== "terraformer")) {
                for (i = 0; i < currentPixels.length; i++) {
                    var newPixel = currentPixels[i]
                    if (newPixel.category === "land") {
                        changePixel(newPixel, "dirt")
                    } else if (newPixel.category === "liquids") {
                        changePixel(newPixel, "water")
                    }
                }
                explodeAt(pixel.x, pixel.y + 1, 20, "flash")
            }
        }
        doDefaults(pixel)
    }
}

elements.dirt_bomb = {
    color: "#776248",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:60>dirt,dirt,dirt,dirt|M2"
    ],
    category: "weapons",
    density: 1500,
    excludeRandom: true,
    state: "solid",
    cooldown: defaultCooldown
}