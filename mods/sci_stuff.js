function decay(ms) { //Taken from decays.js
    return 1 / (Math.pow(Math.log10(ms * 30 + 1), 2) * 10)
}

// Beginning of stuff taken from nuclear.js
function irradiateNearby(pixel, radius = 1, intensity = 1) {
    // List of elements to explicitly exclude
    const excludedElements = new Set([
        "deuterium",
        "fallout",
        "gray_goo",
        "hazmat_body",
        "hazmat_head",
        "hazmat",
        "ichor",
        "lead",
        "philosophers_stone",
        "radiation",
        "super_acid",
        "time",
        "uranium"
    ])

    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            if (dx === 0 && dy === 0) continue
            let nx = pixel.x + dx
            let ny = pixel.y + dy
            let p = getPixel(nx, ny)
            if (p && !elements[p.element].radioactive && !excludedElements.has(p.element) && Math.random() < 0.1 * intensity) {
                p.temp += 15 * intensity
                p.irradiated = (p.irradiated || 0) + intensity
                if (p.irradiated > 10 && Math.random() < 0.2) {
                    changePixel(p, "irradiated_matter")
                }
            }
        }
    }
}

elements.plutonium = {
    behavior: behaviors.POWDER,
    category: "powders",
    color: "#4e3629",
    density: 19800,
    radioactive: true,
    state: "solid",
    tick(pixel) {
        irradiateNearby(pixel, 1, 0.8)
    }
}

elements.irradiated_matter = {
    behavior: behaviors.POWDER,
    burn: 80,
    burnTime: 250,
    category: "powders",
    color: "#777733",
    density: 900,
    radioactive: true,
    state: "solid",
    tick(pixel) {
        irradiateNearby(pixel, 2, 0.4)
    }
}
// End of stuff taken from nuclear.js

elements.fluorine_20 = { //Also taken from decays.js
    behavior: behaviors.POWDER,
    category: "powders",
    color: "#b0ff1c",
    density: 900,
    radioactive: true,
    state: "solid",
    tick: function (pixel) {
        if (Math.random() < decay(11006.2)) {
            changePixel(pixel, "neon")
        }
    }
}

elements.heavy_ice = {
    behavior: behaviors.WALL,
    category: "solids",
    color: "#b2e6eb",
    density: 917,
    state: "solid",
    stateHigh: "heavy_water",
    temp: -5,
    tempHigh: 5
}

elements.heavy_water = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    color: "#2167ff",
    conduct: 0.02,
    density: 1.1056,
    extinguish: true,
    state: "liquid",
    stateHigh: "deuterium",
    stateLow: "heavy_ice",
    tempHigh: 104,
    tempLow: 4,
    viscosity: 1.2467,
}

elements.deuterium = {
    behavior: behaviors.GAS,
    category: "gases",
    color: "#ace0e6",
    density: 0.18,
    state: "gas",
    reactions: {
        "oxygen": { elem1: "heavy_water", elem2: null },
    },
}

elements.bromine = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    color: ["#901100", "#7f1702", "#6e1a05", "#5e1b07", "#4e1b0a"],
    density: 3120,
    state: "liquid",
    stateHigh: "bromine_gas",
    stateLow: "bromine_ice",
    tempHigh: 59,
    tempLow: -7,
    tick: function (pixel) {
        if (pixel.temp > 0 && Math.random() < 0.001) {
            changePixel(pixelMap[pixel.x][pixel.y], "bromine_gas", false)
        }
    }
}

elements.bromine_gas = {
    behavior: behaviors.GAS,
    category: "gases",
    color: ["#8f0000", "#7e0205", "#6e0508", "#5d080a", "#4d0a0a"],
    state: "gas",
    stateLow: "bromine",
    tempLow: 57,
    density: 6,
    tick: function (pixel) {
        if (pixel.temp < 58.8 && pixel.temp > 0 && Math.random() < 0.01) {
            changePixel(pixelMap[pixel.x][pixel.y], "bromine", false)
        }
    }
}

elements.bromine_ice = {
    behavior: behaviors.WALL,
    category: "solids",
    color: ["#8f002b", "#7e0522", "#6d091a", "#5d0a13", "#4d0a0a"],
    state: "solid",
    stateHigh: "bromine",
    tempHigh: -5
}

elements.arsenic = {
    behavior: behaviors.POWDER,
    category: "powders",
    color: "#478800",
    density: 0.5782,
    state: "solid",
    tempHigh: 614, // From what I can gather, arsenic has a melting point hotter than this, but since it turns into gas at this temp, I'll just go with this.
    stateHigh: "arsenic_gas",
    reactions: {
        "algae": { elem1: null, elem2: null },
        "ant": { elem1: null, elem2: "dead_bug" },
        "bee": { elem1: null, elem2: "dead_bug" },
        "bird": { elem2: "rotten_meat" },
        "blood": { elem1: null, elem2: "arsenic" },
        "body": { elem2: "rotten_meat" },
        "cactus": { elem1: null, elem2: "dead_plant" },
        "cheese_powder": { elem1: null, elem2: "rotten_cheese" },
        "cheese": { elem1: null, elem2: "rotten_cheese" },
        "coral": { elem1: null, elem2: "dirty_water" },
        "evergreen": { elem1: null, elem2: "dead_plant" },
        "firefly": { elem1: null, elem2: "dead_bug" },
        "fish": { elem2: "rotten_meat" },
        "flea": { elem1: null, elem2: "dead_bug" },
        "flower_seed": { elem1: null, elem2: "dead_plant" },
        "fly": { elem1: null, elem2: "dead_bug" },
        "frog": { elem2: "slime" },
        "grass_seed": { elem1: null, elem2: "dead_plant" },
        "grass": { elem1: null, elem2: "dead_plant" },
        "head": { elem2: "rotten_meat" },
        "homunculus": { elem2: "rotten_meat" },
        "kelp": { elem1: null, elem2: "dirty_water" },
        "lichen": { elem1: null, elem2: null },
        "meat": { elem2: "rotten_meat" },
        "mushroom_cap": { elem1: null, elem2: null, chance: 0.01 },
        "mushroom_gill": { elem1: null, elem2: null, chance: 0.01 },
        "mushroom_spore": { elem1: null, elem2: null },
        "mushroom_stalk": { elem1: null, elem2: null, chance: 0.01 },
        "petal": { elem1: null, elem2: "dead_plant" },
        "pistil": { elem1: null, elem2: "dead_plant" },
        "plant": { elem1: null, elem2: "dead_plant" },
        "pollen": { elem2: null, chance: 0.01 },
        "rat": { elem2: "rotten_meat" },
        "salt_water": { elem1: null, elem2: "dirty_water" },
        "slug": { elem1: null, elem2: "slime" },
        "snail": { elem1: null, elem2: "limestone" },
        "soap": { elem1: null },
        "spider": { elem1: null, elem2: "dead_bug" },
        "stink_bug": { elem1: null, elem2: "dead_bug" },
        "sugar_water": { elem1: null, elem2: "dirty_water" },
        "tadpole": { elem2: "slime" },
        "termite": { elem1: null, elem2: "dead_bug" },
        "vine": { elem1: null, elem2: "dead_plant" },
        "water": { elem1: null, elem2: "dirty_water" },
        "worm": { elem1: null, elem2: "dead_bug" },
        "yeast": { elem1: null, elem2: null },
        "hair": { elem1: null, elem2: null, chance: 0.01 }
    },
}

elements.arsenic_gas = {
    behavior: behaviors.GAS,
    category: "gases",
    color: "#478800",
    density: 0.5782,
    state: "gas",
    temp: 700,
    tempLow: 613,
    stateLow: "arsenic",
    reactions: {
        "algae": { elem1: null, elem2: null },
        "ant": { elem1: null, elem2: "dead_bug" },
        "bee": { elem1: null, elem2: "dead_bug" },
        "bird": { elem2: "rotten_meat" },
        "blood": { elem1: null, elem2: "arsenic" },
        "body": { elem2: "rotten_meat" },
        "cactus": { elem1: null, elem2: "dead_plant" },
        "cheese_powder": { elem1: null, elem2: "rotten_cheese" },
        "cheese": { elem1: null, elem2: "rotten_cheese" },
        "coral": { elem1: null, elem2: "dirty_water" },
        "evergreen": { elem1: null, elem2: "dead_plant" },
        "firefly": { elem1: null, elem2: "dead_bug" },
        "fish": { elem2: "rotten_meat" },
        "flea": { elem1: null, elem2: "dead_bug" },
        "flower_seed": { elem1: null, elem2: "dead_plant" },
        "fly": { elem1: null, elem2: "dead_bug" },
        "frog": { elem2: "slime" },
        "grass_seed": { elem1: null, elem2: "dead_plant" },
        "grass": { elem1: null, elem2: "dead_plant" },
        "head": { elem2: "rotten_meat" },
        "homunculus": { elem2: "rotten_meat" },
        "kelp": { elem1: null, elem2: "dirty_water" },
        "lichen": { elem1: null, elem2: null },
        "meat": { elem2: "rotten_meat" },
        "mushroom_cap": { elem1: null, elem2: null, chance: 0.01 },
        "mushroom_gill": { elem1: null, elem2: null, chance: 0.01 },
        "mushroom_spore": { elem1: null, elem2: null },
        "mushroom_stalk": { elem1: null, elem2: null, chance: 0.01 },
        "petal": { elem1: null, elem2: "dead_plant" },
        "pistil": { elem1: null, elem2: "dead_plant" },
        "plant": { elem1: null, elem2: "dead_plant" },
        "pollen": { elem2: null, chance: 0.01 },
        "rat": { elem2: "rotten_meat" },
        "salt_water": { elem1: null, elem2: "dirty_water" },
        "slug": { elem1: null, elem2: "slime" },
        "snail": { elem1: null, elem2: "limestone" },
        "spider": { elem1: null, elem2: "dead_bug" },
        "stink_bug": { elem1: null, elem2: "dead_bug" },
        "sugar_water": { elem1: null, elem2: "dirty_water" },
        "tadpole": { elem2: "slime" },
        "termite": { elem1: null, elem2: "dead_bug" },
        "vine": { elem1: null, elem2: "dead_plant" },
        "water": { elem1: null, elem2: "dirty_water" },
        "worm": { elem1: null, elem2: "dead_bug" },
        "yeast": { elem1: null, elem2: null },
        "hair": { elem1: null, elem2: null, chance: 0.01 }
    },
}

elements.hazmat = {
    color: ["#ffff00", "#f1f100", "#d29720", "#eda63d"],
    category: "life",
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    onPlace: function (pixel) {
        if (!isEmpty(pixel.x, pixel.y - 1, true) && pixelMap[pixel.x][pixel.y - 1].element === "hazmat_head") {
            deletePixel(pixel.x, pixel.y - 1)
        }
        else if (!isEmpty(pixel.x, pixel.y + 1, true) && pixelMap[pixel.x][pixel.y + 1].element === "hazmat_body") {
            deletePixel(pixel.x, pixel.y + 1)
        }

        if (isEmpty(pixel.x, pixel.y + 1)) {
            createPixel("hazmat_body", pixel.x, pixel.y + 1)
            var color = pixel.color
            changePixel(pixel, "hazmat_head")
            pixel.color = color
        }
        else if (isEmpty(pixel.x, pixel.y - 1)) {
            createPixel("hazmat_head", pixel.x, pixel.y - 1)
            pixelMap[pixel.x][pixel.y - 1].color = pixel.color
            changePixel(pixel, "hazmat_body")
        }
        else {
            deletePixel(pixel.x, pixel.y)
        }
    },
    reactions: {
        "fire": { attr1: { panic: 5 } },
        "acid": { attr1: { panic: 5 } },
        "c4": { attr1: { panic: 5 } },
        "cold_fire": { attr1: { panic: 5 } },
        "dynamite": { attr1: { panic: 5 } },
        "electric": { attr1: { panic: 5 } },
        "grenade": { attr1: { panic: 5 } },
        "gunpowder": { attr1: { panic: 5 } },
        "plasma": { attr1: { panic: 5 } },
        "tnt": { attr1: { panic: 5 } },
        "acid_gas": { attr1: { panic: 5 } }
    },
    related: ["hazmat_body", "hazmat_head"],
    cooldown: defaultCooldown,
    forceSaveColor: true
}
elements.hazmat_body = {
    color: ["#08271d", "#6f9904", "#4b4931"],
    category: "life",
    hidden: true,
    density: 1500,
    state: "solid",
    conduct: .01,
    temp: 37,
    tempHigh: 150,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood", "meat", "bone"],
    forceSaveColor: true,
    pickElement: "hazmat",
    reactions: {
        "ant": { elem2: "dead_bug", chance: 0.05, oneway: true },
        "bee": { elem2: "dead_bug", oneway: true },
        "egg": { elem2: "yolk", chance: 0.5, oneway: true },
        "firefly": { elem2: "dead_bug", oneway: true },
        "flea": { elem2: "dead_bug", oneway: true },
        "fly": { elem2: "dead_bug", oneway: true },
        "grape": { elem2: "juice", chance: 0.5, color2: "#291824", oneway: true },
        "grass_seed": { elem2: null, chance: 0.05 },
        "spider": { elem2: "dead_bug", oneway: true },
        "stink_bug": { elem2: "stench", oneway: true },
        "sun": { elem1: "cooked_meat" },
        "termite": { elem2: "dead_bug", oneway: true },
        "worm": { elem2: "slime", chance: 0.05, oneway: true },
        "alcohol": { chance: 0.05, attr1: { "panic": 0 } }
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function (pixel) {
        if (tryMove(pixel, pixel.x, pixel.y + 1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y - 2, true)) {
                if (pixelMap[pixel.x][pixel.y - 2].element === "hazmat_head") {
                    if (isEmpty(pixel.x, pixel.y - 1)) {
                        movePixel(pixelMap[pixel.x][pixel.y - 2], pixel.x, pixel.y - 1)
                    }
                    else {
                        swapPixels(pixelMap[pixel.x][pixel.y - 2], pixelMap[pixel.x][pixel.y - 1])
                    }
                }
            }
        }
        doHeat(pixel)
        doBurning(pixel)
        doElectricity(pixel)
        if (pixel.dead) {
            // Turn into plastic if pixelTicks-dead > 500
            if (pixelTicks - pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel, "plastic")
            }
            return
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y - 1, true) && pixelMap[pixel.x][pixel.y - 1].element == "hazmat_head") {
            var head = pixelMap[pixel.x][pixel.y - 1]
            if (head.dead) {
                pixel.dead = head.dead
            }
            else if (head.panic > 0) {
                pixel.panic = head.panic
                delete head.panic
            }
        }
        else { var head = null }
        if (head && Math.random() < 0.25) {
            let y = Math.random() < 0.5 ? 0 : -1
            for (let x = 1; x < 10; x++) {
                let x2 = pixel.x + (x * pixel.dir)
                let y2 = pixel.y + y
                if (!isEmpty(x2, y2, true)) {
                    let seenPixel = pixelMap[x2][y2]
                    if (elements.human.reactions[seenPixel.element] && elements.human.reactions[seenPixel.element].attr1 && elements.human.reactions[seenPixel.element].attr1.panic) {
                        pixel.panic += elements.human.reactions[seenPixel.element].attr1.panic
                        pixel.dir *= -1
                        break
                    }
                    else if (seenPixel.dead || seenPixel.temp > 200) {
                        pixel.panic += 5
                        pixel.dir *= -1
                        if (seenPixel.panic) delete seenPixel.panic
                        break
                    }
                }
            }
        }
        if (pixel.burning) {
            pixel.panic += 0.1
            if (head && pixelTicks - pixel.burnStart > 240) {
                pixel.color = head.color
            }
        }
        if (pixel.charge) {
            pixel.panic += 1
        }
        else if (pixel.panic > 0) {
            pixel.panic -= 0.1
            if (pixel.panic < 0) { pixel.panic = 0 }
            else if (pixel.panic > 50) { pixel.panic = 50 }
        }

        if (isEmpty(pixel.x, pixel.y - 1)) {
            // create blood if decapitated 10% chance
            if (Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y - 1)
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks
                }
            }
        }
        else if (head === null) { return }
        else if (Math.random() < 0.1 * (isEmpty(pixel.x, pixel.y + 1) ? 1 : pixel.panic + 1)) { // Move 10% chance
            var movesToTry = [
                [1 * pixel.dir, 0],
                [1 * pixel.dir, -1],
            ]
            let moved = false
            // While movesToTry is not empty, tryMove(pixel, x, y) with a random move, then remove it. if tryMove returns true, break.
            while (movesToTry.length > 0) {
                var move = movesToTry.splice(Math.floor(Math.random() * movesToTry.length), 1)[0]
                if (isEmpty(pixel.x + move[0], pixel.y + move[1] - 1)) {
                    var origx = pixel.x + move[0]
                    var origy = pixel.y + move[1]
                    if (tryMove(pixel, pixel.x + move[0], pixel.y + move[1]) && pixel.x === origx && pixel.y === origy) {
                        movePixel(head, head.x + move[0], head.y + move[1])
                        moved = true
                        break
                    }
                }
            }
            // 15% chance to change direction
            if (Math.random() < 0.15 || !moved) {
                pixel.dir *= -1
            }
            // homeostasis
            if (pixel.temp > 37) { pixel.temp -= 1 }
            else if (pixel.temp < 37) { pixel.temp += 1 }
        }

    }
}
elements.hazmat_head = {
    color: ["#ffff00", "#f1f100", "#d29720", "#eda63d"],
    category: "life",
    hidden: true,
    density: 1080,
    state: "solid",
    conduct: .01,
    temp: 37,
    tempHigh: 150,
    stateHigh: "cooked_meat",
    tempLow: -30,
    stateLow: "frozen_meat",
    burn: 10,
    burnTime: 250,
    burnInto: "cooked_meat",
    breakInto: ["blood", "meat", "bone"],
    forceSaveColor: true,
    pickElement: "hazmat",
    reactions: {
        "beans": { elem2: [null, null, null, null, null, null, null, null, "stench"], chance: 0.2 },
        "sun": { elem1: "cooked_meat" },
        "alcohol": { chance: 0.2, attr1: { "panic": 0 } }
    },
    properties: {
        dead: false
    },
    tick: function (pixel) {
        doHeat(pixel)
        doBurning(pixel)
        doElectricity(pixel)
        if (pixel.dead) {
            // Turn into plastic if pixelTicks-dead > 500
            if (pixelTicks - pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel, "plastic")
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y + 1, true) && pixelMap[pixel.x][pixel.y + 1].element == "hazmat_body") {
            var body = pixelMap[pixel.x][pixel.y + 1]
            if (body.dead) {
                pixel.dead = body.dead
            }
        }
        else { var body = null }

        // check for eating food
        if (body && !pixel.dead && Math.random() < 0.1) {
            shuffleArray(interactCoordsShuffle)
            for (var i = 0; i < interactCoordsShuffle.length; i++) {
                var x = pixel.x + interactCoordsShuffle[i][0]
                var y = pixel.y + interactCoordsShuffle[i][1]
                if (!isEmpty(x, y, true) && elements[pixelMap[x][y].element].isFood && pixelMap[x][y].panic === undefined) {
                    deletePixel(x, y)
                    break
                }
            }
        }

        if (tryMove(pixel, pixel.x, pixel.y + 1)) {
            // create blood if severed 10% chance
            if (isEmpty(pixel.x, pixel.y + 1) && !pixel.dead && Math.random() < 0.1 && !pixel.charge) {
                createPixel("blood", pixel.x, pixel.y + 1)
                // set dead to true 15% chance
                if (Math.random() < 0.15) {
                    pixel.dead = pixelTicks
                }
            }
        }
        // homeostasis
        if (pixel.temp > 37) { pixel.temp -= 1 }
        else if (pixel.temp < 37) { pixel.temp += 1 }
    },
    onChange: function (pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coord = adjacentCoords[i]
            var x = pixel.x + coord[0]
            var y = pixel.y + coord[1]
            if (!isEmpty(x, y, true) && pixelMap[x][y].panic !== undefined) {
                pixelMap[x][y].panic += 20
            }
        }
    },
    onDelete: function (pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coord = adjacentCoords[i]
            var x = pixel.x + coord[0]
            var y = pixel.y + coord[1]
            if (!isEmpty(x, y, true) && pixelMap[x][y].panic !== undefined) {
                pixelMap[x][y].panic += 20
            }
        }
    }
}

elements.bless.reactions.arsenic = { elem2: null }
elements.bless.reactions.arsenic_gas = { elem2: null }
elements.bless.reactions.irradiated_matter = { elem2: "gold" }
elements.bless.reactions.plutonium = { elem2: "gold" }
