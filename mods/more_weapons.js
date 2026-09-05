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
