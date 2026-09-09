excludeBlackHole = [
    "black_hole",
    "bless",
    "border",
    "gray_goo",
    "ichor",
    "image",
    "pipe_wall",
    "pipe",
    "portal_in",
    "portal_out",
    "stable_aether",
    "time",
    "void",
    "wall",
    "warp",
]
//The Moon
elements.lunar_dust = {
    behavior: behaviors.POWDER,
    category: "land",
    color: ["#ababab", "#c5c5c5"],
    density: 1500,
    state: "solid"
}
elements.moon_rock = {
    behavior: behaviors.STURDYPOWDER,
    breakInto: "lunar_dust",
    category: "land",
    color: ["#a5a5a5", "#bdbdbd"],
    density: 1605,
    hardness: 0.5,
    state: "solid",
    stateHigh: "magma",
    tempHigh: 800
}
//Mars
elements.mars_dust = {
    behavior: behaviors.POWDER,
    category: "land",
    color: ["#ab2a20", "#c53227"],
    density: 2600,
    state: "solid"
}
elements.mars_rock = {
    behavior: behaviors.STURDYPOWDER,
    breakInto: "mars_dust",
    category: "land",
    color: ["#a51002", "#bd1102"],
    density: 1605,
    hardness: 0.75,
    state: "solid",
    stateHigh: "magma",
    tempHigh: 800
}
//Other
elements.black_hole = { //Taken from  black_hole.js and then modified to destroy elements
    category: "special",
    color: "#000000",
    density: 99999,
    hardness: 1,
    state: "solid",
    tick: function (pixel) {
        // Attract other pixels within a 9-pixel radius
        for (let dx = -9; dx <= 9; dx++) {
            for (let dy = -9; dy <= 9; dy++) {
                let x = pixel.x + dx
                let y = pixel.y + dy

                // Ignore out-of-bounds
                if (!isEmpty(x, y, true)) {
                    let other = pixelMap[x]?.[y]
                    if (other && !excludeBlackHole.includes(other.element)) {
                        // Attraction: move other pixel towards the black hole
                        tryMove(other, other.x + Math.sign(pixel.x - other.x), other.y + Math.sign(pixel.y - other.y))
                    }
                }
            }
        }

        // Convert touching pixels into black holes
        const dirs = [
            [1, 0], [-1, 0], [0, 1], [0, -1],
            [1, 1], [-1, -1], [1, -1], [-1, 1]
        ]
        for (let d of dirs) {
            let nx = pixel.x + d[0]
            let ny = pixel.y + d[1]
            if (isEmpty(nx, ny, true)) continue

            let touching = pixelMap[nx]?.[ny]
            if (touching && !excludeBlackHole.includes(touching.element)) {
                //changePixel(touching, "black_hole")
                deletePixel(nx, ny)
            }
        }
    },
}

elements.bless.reactions.black_hole = { elem2: null }