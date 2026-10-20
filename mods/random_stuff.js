elements.void.color = "#ff0000"
//Tools
elements.pollute = {
    color: "#E81D71",
    tool: function (pixel) {
        if (pixel.element == "water" || pixel.element == "salt_water" || pixel.element == "sugar_water") {
            changePixel(pixel, "dirty_water")
        } else if (pixel.element !== "dirt" && (eLists.SOIL.indexOf(pixel.element) !== -1 || dirtPixel.element === "grass")) {
            changePixel(pixel, "dirt")
        }
    },
    category: "tools",
    desc: "Pollution.",
}
elements.clean = {
    color: "#1d64e8",
    tool: function (pixel) {
        if (pixel.element == "dirty_water") {
            changePixel(pixel, "water")
        } else if (pixel.element == "ash" || pixel.element == "dust") {
            deletePixel(pixel.x, pixel.y)
        }
    },
    category: "tools",
    desc: "Clean.",
}
//Elements
elements.idk_one = {
    behavior: behaviors.POWDER,
    category: "misc",
    color: "#00d9ff",
    density: 1000,
    state: "solid",
    tick: function (pixel) {
        if (Math.random() < 0.01 && isEmpty(pixel.x, pixel.y - 1)) clonePixel(pixel, pixel.x, pixel.y - 1)
        if (Math.random() < 0.005 && isEmpty(pixel.x - 1, pixel.y)) clonePixel(pixel, pixel.x - 1, pixel.y)
        if (Math.random() < 0.005 && isEmpty(pixel.x + 1, pixel.y)) clonePixel(pixel, pixel.x + 1, pixel.y)
        if (!tryMove(pixel, pixel.x, pixel.y + 1) && Math.random() < 0.1) {
            tryMove(pixel, pixel.x + (Math.random() < 0.5 ? 1 : -1), pixel.y + 1)
        }
        doDefaults(pixel)
    }
}
elements.idk_two = {
    behavior: [
        "XX|XX|XX",
        "M2|CH:gold_coin,water,sand%5|M2",
        "M1|M1|M1"
    ],
    category: "misc",
    color: "#ff0000",
    density: 955,
    state: "liquid"
}