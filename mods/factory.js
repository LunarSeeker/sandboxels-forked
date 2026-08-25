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
            if (isEmpty(x, y - 1)) {
                createPixel("random_ore", x, y - 1)
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
            if (Math.random() < 0.6) {
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
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue
                let p = getPixel((pixel.x + dx), (pixel.y + dy))
                if (p && p.temp < 100 && p.element === "random_ore") {
                    p.temp = pixel.temp + 10
                }
            }
        }
    },
}