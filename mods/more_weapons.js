colorstochoose = [
    "#000000",
    "#0000ff",
    "#00ff00",
    "#00ffff",
    "#88ff00",
    "#ff0000",
    "#ff00ff",
    "#ff8800",
    "#ffff00",
    "#ffffff"
]

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
    "super_acid",
    "time",
    "unstablium",
    "void",
    "wall",
    "warp",
    "waste_barrel"
]

//Random integer from 0 to n
function randomIntegerFromZeroToValue(value) {
    var absoluteValuePlusOne = Math.abs(value) + 1
    if (value >= 0) { //Positive case
        return Math.floor(Math.random() * absoluteValuePlusOne)
    } else { //Negative case: flip sign
        return 0 - Math.floor(Math.random() * absoluteValuePlusOne)
    };
};

function randomChoice(array) {
    if (array.length === 0) { throw new Error(`The array ${array} is empty`) };
    return array[(randomIntegerFromZeroToValue(array.length - 1))]
};

elements.subzero_bomb = {
    category: "weapons",
    color: "#00d5ff",
    cooldown: defaultCooldown,
    darkText: true,
    density: 1500,
    excludeRandom: true,
    maxSize: 1,
    state: "solid",
    tick: function (pixel) {
        if (pixel.start === pixelTicks) { return }
        if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
            if (outOfBounds(pixel.x, pixel.y + 1) || (pixelMap[pixel.x][pixel.y + 1].element !== "subzero_bomb")) {
                for (i = 0; i < currentPixels.length; i++) {
                    var newPixel = currentPixels[i]
                    if (newPixel.temp > -273) {
                        newPixel.temp = -273
                        pixelTempCheck(newPixel)
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
    maxSize: 1,
    state: "solid",
    tick: function (pixel) {
        if (pixel.start === pixelTicks) { return }
        if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
            if (outOfBounds(pixel.x, pixel.y + 1) || (pixelMap[pixel.x][pixel.y + 1].element !== "ultrahot_bomb")) {
                for (i = 0; i < currentPixels.length; i++) {
                    var newPixel = currentPixels[i]
                    if (newPixel.temp < 999) {
                        newPixel.temp = Math.abs(newPixel.temp)
                        newPixel.temp += 2000
                        pixelTempCheck(newPixel)
                    }
                }
                explodeAt(pixel.x, pixel.y + 1, 20, "flash")
            }
        }
        doDefaults(pixel)
    }
}

elements.color_bomb = {
    category: "weapons",
    color: "#ff0000",
    cooldown: defaultCooldown,
    density: 1500,
    excludeRandom: true,
    maxSize: 1,
    state: "solid",
    tick: function (pixel) {
        if (pixel.start === pixelTicks) { return }
        if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
            if (outOfBounds(pixel.x, pixel.y + 1) || (pixelMap[pixel.x][pixel.y + 1].element !== "color_bomb")) {
                for (i = 0; i < currentPixels.length; i++) {
                    var newPixel = currentPixels[i]
                    newPixel.color = randomChoice(colorstochoose)
                }
                explodeAt(pixel.x, pixel.y + 1, 10, "flash")
            }
        }
        doDefaults(pixel)
    }
}

elements.acid_bomb = {
    color: "#776248",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:60>acid,acid,acid|M2"
    ],
    category: "weapons",
    density: 1500,
    excludeRandom: true,
    maxSize: 1,
    state: "solid",
    cooldown: defaultCooldown
}

elements.dirt_bomb = {
    color: "#776248",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:60>dirt,dirt,dirt|M2"
    ],
    category: "weapons",
    density: 1500,
    excludeRandom: true,
    maxSize: 1,
    state: "solid",
    cooldown: defaultCooldown
}

elements.false_vacuum = {
    category: "weapons",
    color: "#2e2430",
    cooldown: defaultCooldown,
    hardness: 1,
    maxSize: 1,
    movable: false,
    tick: function (pixel) {
        if (!pixel.timeAlive) {
            pixel.timeAlive = 0
        }
        if (!pixel.generations) {
            pixel.generations = 0
        }
        if (pixel.generations > Math.max(width, height)) {
            deletePixel(pixel.x, pixel.y)
            return
        }
        pixel.color = `rgb(${180 / (pixel.timeAlive + 2)}, ${27 / (pixel.timeAlive + 2)}, ${27 / (pixel.timeAlive + 2)})`
        if (pixel.timeAlive === 0) {
            for (i = 0; i < squareCoords.length; i++) {
                let x = squareCoords[i][0] + pixel.x
                let y = squareCoords[i][1] + pixel.y
                if (!isEmpty(x, y, true)) {
                    if (pixelMap[x][y].element !== "false_vacuum") {
                        deletePixel(x, y)
                        createPixel("false_vacuum", x, y)
                        pixelMap[x][y].generations = pixel.generations + 1
                    }
                } else if (isEmpty(x, y)) {
                    createPixel("false_vacuum", x, y)
                    pixelMap[x][y].generations = pixel.generations + 1
                }
            }
            for (let coord of rectCoords(pixel.x - 2, pixel.y - 2, pixel.x + 2, pixel.y + 2)) {
                let x = coord.x
                let y = coord.y
                if (!isEmpty(x, y, true) && pixelMap[x][y].element != "false_vacuum") {
                    deletePixel(x, y)
                }
            }
        }
        pixel.timeAlive++
        if (pixel.timeAlive > 20) {
            deletePixel(pixel.x, pixel.y)
            return
        }
    },
}

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

elements.bless.reactions.unstablium = { elem2: null }
