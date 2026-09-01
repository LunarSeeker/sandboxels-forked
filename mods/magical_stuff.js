function decay(ms) { //Taken from decays.js
    return 1 / (Math.pow(Math.log10(ms * 30 + 1), 2) * 10)
}


elements.philosophers_stone = {
    behavior: behaviors.POWDER,
    category: "magic",
    color: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
    density: 1,
    excludeRandom: true,
    ignore: ["philosophers_stone", "gold", "silver", "granite", "strange_matter", "midas_touch", "bless", "time", "stable_aether", "unstable_aether"],
    state: "solid",
    tick: function (pixel) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue
                let p = getPixel((pixel.x + dx), (pixel.y + dy))
                if (p && elements.philosophers_stone.ignore.indexOf(p.element) === -1) {
                    changePixel(p, "gold")
                }
            }
        }
    },
}

elements.stable_aether = {
    behavior: behaviors.WALL,
    category: "magic",
    color: ["#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff"],
    density: 1,
    state: "solid"
}

elements.unstable_aether = {
    behavior: behaviors.GAS,
    category: "magic",
    color: ["#ff0000", "#ff8800", "#0000ff", "#ff00ff"],
    density: 1,
    state: "gas",
    tick: function (pixel) {
        if (Math.random() < decay(1160)) {
            changePixel(pixel, "gold")
        }
    }
}