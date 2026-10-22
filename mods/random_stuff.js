const rng_density = Math.max(32, 16 << Math.floor(Math.random() * 10)) / 2

elements.void.color = "#ff0000"
//Elements
elements.idk_one = {
    behavior: behaviors.POWDER,
    category: "misc",
    color: "#00d9ff",
    density: 1000,
    state: "solid",
    tick: function (pixel) {
        if (Math.random() < 0.005 && isEmpty(pixel.x, pixel.y - 1)) clonePixel(pixel, pixel.x, pixel.y - 1)
        //if (Math.random() < 0.005 && isEmpty(pixel.x - 1, pixel.y)) clonePixel(pixel, pixel.x - 1, pixel.y)
        if (Math.random() < 0.005 && isEmpty(pixel.x + 1, pixel.y)) clonePixel(pixel, pixel.x + 1, pixel.y)
        doDefaults(pixel)
    }
}
elements.idk_two = {
    behavior: [
        "XX|XX|XX",
        "M2|CH:gold_coin,water,cell%5|M2",
        "M1|M1|M1"
    ],
    category: "misc",
    color: "#ff0000",
    density: rng_density,
    state: "liquid"
}