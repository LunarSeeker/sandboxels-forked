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
    behavior: behaviors.STURDYPOWDER,
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

elements.smelter = {
    behavior: behaviors.WALL,
    category: "factory",
    color: ["#5b5c5c", "#3b3c3c", "#0b0c0c"],
    state: "solid",
    tick: function (pixel) {
        if (Math.random() < 0.04) {
            for (var i = 0; i < adjacentCoords.length; i++) {
                var coord = adjacentCoords[i]
                var x = pixel.x + coord[0]
                var y = pixel.y + coord[1]
                if (!isEmpty(x, y, true)) {
                    pixel.temp += 10
                }
            }
        }
    }
}