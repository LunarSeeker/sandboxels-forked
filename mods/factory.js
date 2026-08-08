elements.ore_drill = {
    behavior: behaviors.WALL,
    category: "factory",
    color: "#5b5c5c",
    state: "solid",
    conduct: 1.0,
    tick: function (pixel) {
        if (pixel.charge && pixel.charge > 0) {
            let x = pixel.x
            let y = pixel.y
            if (isEmpty(x, y + 1)) {
                createPixel("random_ore", x, y + 1)
            }
        }
    },
}

elements.random_ore = {
    behavior: behaviors.WALL,
    category: "factory",
    color: ["#5b5c5c", "#3b3c3c"],
    state: "solid",
    tick: function (pixel) {
        if (pixel.temp >= 100) {
            if (Math.random() < 0.10) {
                changePixel(pixel, "iron")
            }
            else {
                changePixel(pixel, "gold")
            }
        }
    }
}

elements.power_core = {
    behavior: behaviors.WALL,
    category: "special",
    color: ["#10F7F3", "#5AEDEB", "#BDFCFB"],
    stateHigh: "fire",
    tempHigh: 10000,
    state: "solid",
    tick: function (pixel) {
        if (pixel.temp === 5000) {
            pixel.color = pixelColorPick(pixel, "#F92810")
        }
        else {
            pixel.color = pixelColorPick(pixel, "#F9B610")
        }
        if (pixelMap[pixel.x][pixel.y - 4].element === "steel") {
            createPixel("copper", pixel.x, pixel.y - 5)
        }
    },
}