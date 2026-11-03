excludedestabilizer = [
    "art",
    "black_hole",
    "bless",
    "border",
    "cloner",
    "destabilizer",
    "false_vacuum",
    "filter",
    "gray_goo",
    "ichor",
    "image",
    "pipe_wall",
    "pipe",
    "portal_in",
    "portal_out",
    "sensor",
    "singularity",
    "soul",
    "stabilizer",
    "stable_sand",
    "super_acid",
    "time",
    "unstablium",
    "void",
    "wall",
    "warp",
    "waste_barrel"
]

elements.gravite = {
    behavior: behaviors.POWDER,
    category: "special",
    color: "#e35693",
    density: 0.06,
    state: "solid",
    stateHigh: "explosion",
    tempHigh: 1000
}
elements.anti_gravite = {
    color: ["#1a743c", "#1dc9f3", "#267cb0", "#91c7cc", "#bee347", "#eaede5", "#f4cd32", "#fab937", "#fe4a75", "#ff0101", "#ff6ffa"],
    buttonColor: ["#ff8080", "#ff2626"],
    behavior: [
        "M1%50|M1%50|M1%50",
        "M2%5|XX|M2%5",
        "M2%5|M2%5|M2%5"
    ],
    category: "special",
    density: 0.06,
    state: "solid",
    stateHigh: "explosion",
    tempHigh: 1000,
    reactions: {
        "gravite": { elem1: "explosion", elem2: "explosion" }
    }
}

elements.box_storage = { //Taken from nousersthings.js
    category: "machines",
    color: "#bbbb6c",
    conduct: 1,
    movable: false,
    behavior: behaviors.WALL,
    tick: function (pixel) {
        if (!pixel.bhcontents) {
            pixel.bhcontents = []
        }
        for (var i = 0; i < squareCoords.length; i++) {
            var coord = squareCoords[i]
            var x = pixel.x + coord[0]
            var y = pixel.y + coord[1]
            if (!isEmpty(x, y, true) && (!pixel.charge && !pixel.chargeCD)) {
                var otherPixel = pixelMap[x][y]
                if (elements[otherPixel.element].movable == true) {
                    pixel.bhcontents.push(otherPixel)
                    deletePixel(otherPixel.x, otherPixel.y)
                }
            } else if (pixel.charge && isEmpty(x, y) && pixel.bhcontents.length) {
                let randomindex = Math.floor(Math.random() * pixel.bhcontents.length)
                let releasedPixel = pixel.bhcontents[randomindex]
                pixel.bhcontents.splice(randomindex, 1)
                delete releasedPixel.del
                releasedPixel.x = x
                releasedPixel.y = y
                pixelMap[x][y] = releasedPixel
                currentPixels.push(releasedPixel)
            }
        }
    }
}

elements.wall_gen = {
    behavior: [
        "XX|XX|XX",
        "XX|LB:wall AND RT%5|M1 AND BO:1,2,3",
        "XX|XX|XX"
    ],
    category: "special",
    color: "#00d9ff",
    excludeRandom: true,
    rotatable: true
}

elements.stable_sand = {
    behavior: behaviors.POWDER,
    category: "land",
    color: "#77d9e6",
    density: 1602,
    state: "solid",
    stateHigh: "molten_glass",
    tempHigh: 1700
}

elements.stable_sand.reactions = elements.sand.reactions

elements.destabilizer = {
    category: "weapons",
    color: "#343f30",
    cooldown: 12,
    hardness: 1,
    hazard: true,
    maxSize: 1,
    movable: false,
    tick: function (pixel) {
        // Attract other pixels within a 9-pixel radius
        for (let dx = -9; dx <= 9; dx++) {
            for (let dy = -9; dy <= 9; dy++) {
                let x = pixel.x + dx
                let y = pixel.y + dy

                // Ignore out-of-bounds
                if (!isEmpty(x, y, true)) {
                    let other = pixelMap[x]?.[y]
                    if (other && !excludedestabilizer.includes(other.element)) {
                        // Attraction: move other pixel towards the black hole
                        tryMove(other, other.x + Math.sign(pixel.x - other.x), other.y + Math.sign(pixel.y - other.y))
                    }
                }
            }
        }

        // Convert touching pixels into black holes
        for (let d of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
            let nx = pixel.x + d[0]
            let ny = pixel.y + d[1]
            if (isEmpty(nx, ny, true)) continue

            let touching = pixelMap[nx]?.[ny]
            if (touching && !excludedestabilizer.includes(touching.element)) {
                changePixel(touching, "unstablium")
            }
        }
    },
}

elements.unstablium = {
    behavior: behaviors.WALL,
    category: "special",
    color: "#343f30",
    hardness: 1,
    hazard: true,
    hidden: true,
    tick: function (pixel) {
        for (let d of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
            let nx = pixel.x + d[0]
            let ny = pixel.y + d[1]
            if (isEmpty(nx, ny, true)) continue

            let touching = pixelMap[nx]?.[ny]
            if (touching && !excludedestabilizer.includes(touching.element)) {
                changePixel(touching, "unstablium")
            }
        }
    },
}

elements.stabilizer = {
    behavior: behaviors.WALL,
    category: "machines",
    color: "#1bc1e2",
    conduct: 1,
    darkText: true,
    hardness: 1,
    insulate: true,
    noMix: true,
    state: "solid",
    tick: function (pixel) {
        if (pixel.charge > 0) {
            var coords = circleCoords(pixel.x, pixel.y, 50)
            for (var i = 0; i < coords.length; i++) {
                if (!isEmpty(coords[i].x, coords[i].y) && !outOfBounds(coords[i].x, coords[i].y)) {
                    var unstable_element = pixelMap[coords[i].x][coords[i].y]
                    if (unstable_element.element === "unstablium" || unstable_element.element === "black_hole") {
                        changePixel(unstable_element, "stable_sand")
                    }
                }
            }
        }
    }
}

elements.bless.reactions.destabilizer = { elem2: "stabilizer" }
elements.bless.reactions.unstablium = { elem2: "stable_sand" }
