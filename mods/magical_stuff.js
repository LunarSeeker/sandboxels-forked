function decay(ms) { //Taken from decays.js
    return 1 / (Math.pow(Math.log10(ms * 30 + 1), 2) * 10)
}


elements.philosophers_stone = {
    behavior: behaviors.POWDER,
    category: "special",
    color: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
    density: 19800,
    state: "solid",
    tick: function (pixel) {
        if (Math.random() < decay(3633000)) {
            if (Math.random() < 0.6405) {
                changePixel(pixel, "gold")
                releaseElement(pixel, "neon")
            } else {
                changePixel(pixel, "silver")
                releaseElement(pixel, "oxygen")
            }
        }
    }
}