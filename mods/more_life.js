function clamp(x, min, max) {
    return Math.max(min, Math.min(x, max))
}

// Life
elements.chicken = {
    color: ["#ba5700", "#d18038", "#d4ccc5"],
    behavior: [
        "XX|XX|XX",
        "XX|FX%3 AND L2:egg%0.5|M2%10",
        "XX|M1%33|XX"
    ],
    breakInto: ["feather", "blood"],
    burn: 2,
    burnTime: 100,
    category: "life",
    density: 400,
    state: "solid",
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
    tempHigh: 120,
    tempLow: -18,
    reactions: {
        "corn_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "corn": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "flower_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "grass_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.3 },
        "plague": { elem1: "plague", chance: 0.1 },
        "potato_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "pumpkin": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
        "radiation": { elem1: ["ash", "meat", "rotten_meat", "cooked_meat"], chance: 0.4 },
        "rice": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "seeds": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "spider": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
        "stink_bug": { elem2: "stench", chance: 0.025, func: behaviors.FEEDPIXEL },
        "sun": { elem1: "cooked_meat" },
        "water": { elem2: "bubble", attr2: { "clone": "water" }, chance: 0.001 },
        "wheat_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "pool_water": { elem2: "bubble", attr2: { "clone": "pool_water" }, chance: 0.001 }
    }
}
// Zombie

elements.zombie = {
    category: "life",
    color: ["#ffff00", "#f1f100", "#d29720", "#eda63d"],
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    onPlace: function (pixel) {
        if (!isEmpty(pixel.x, pixel.y - 1, true) && pixelMap[pixel.x][pixel.y - 1].element === "zombie_head") {
            deletePixel(pixel.x, pixel.y - 1)
        }
        else if (!isEmpty(pixel.x, pixel.y + 1, true) && pixelMap[pixel.x][pixel.y + 1].element === "zombie_body") {
            deletePixel(pixel.x, pixel.y + 1)
        }

        if (isEmpty(pixel.x, pixel.y + 1)) {
            createPixel("zombie_body", pixel.x, pixel.y + 1)
            var color = pixel.color
            changePixel(pixel, "zombie_head")
            pixel.color = color
        }
        else if (isEmpty(pixel.x, pixel.y - 1)) {
            createPixel("zombie_head", pixel.x, pixel.y - 1)
            pixelMap[pixel.x][pixel.y - 1].color = pixel.color
            changePixel(pixel, "zombie_body")
        }
        else {
            deletePixel(pixel.x, pixel.y)
        }
    },
    reactions: {
        "acid_gas": { attr1: { panic: 5 } },
        "acid": { attr1: { panic: 5 } },
        "c4": { attr1: { panic: 5 } },
        "cold_fire": { attr1: { panic: 5 } },
        "electric": { attr1: { panic: 5 } },
        "fire": { attr1: { panic: 5 } },
        "plasma": { attr1: { panic: 5 } },
        "radiation": { attr1: { panic: 5 } },
        "tnt": { attr1: { panic: 5 } }
    },
    related: ["zombie_body", "zombie_head"],
    cooldown: defaultCooldown,
    forceSaveColor: true
}
elements.zombie_body = {
    breakInto: ["ash", "rotten_meat", "bone"],
    burn: 20,
    burnInto: "ash",
    burnTime: 150,
    category: "life",
    color: ["#08271d", "#6f9904", "#4b4931"],
    conduct: .01,
    density: 1500,
    forceSaveColor: true,
    hidden: true,
    pickElement: "zombie",
    state: "solid",
    stateHigh: "ash",
    stateLow: "frozen_meat",
    temp: 25,
    tempHigh: 150,
    tempLow: -30,
    reactions: {
        "ant": { elem2: "dead_bug", chance: 0.05, oneway: true },
        "bee": { elem2: "dead_bug", oneway: true },
        "egg": { elem2: "yolk", oneway: true },
        "fallout": { elem1: "ash", chance: 0.01 },
        "firefly": { elem2: "dead_bug", oneway: true },
        "flea": { elem2: "dead_bug", oneway: true },
        "fly": { elem2: "dead_bug", oneway: true },
        "grape": { elem2: "juice", color2: "#291824", oneway: true },
        "neutron": { elem1: "ash", chance: 0.01 },
        "radiation": { elem1: "ash", chance: 0.4 },
        "spider": { elem2: "dead_bug", oneway: true },
        "stink_bug": { elem2: "stench", oneway: true },
        "sun": { elem1: "ash" },
        "termite": { elem2: "dead_bug", oneway: true },
        "worm": { elem2: "slime", chance: 0.05, oneway: true }
    },
    properties: {
        dead: false,
        dir: 1,
        panic: 0
    },
    tick: function (pixel) {
        if (tryMove(pixel, pixel.x, pixel.y + 1)) { // Fall
            if (!isEmpty(pixel.x, pixel.y - 2, true)) { // Drag head down
                if (pixelMap[pixel.x][pixel.y - 2].element === "zombie_head") {
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
            // Turn into rotten_meat if pixelTicks-dead > 500
            if (pixelTicks - pixel.dead > 200 && Math.random() < 0.1) {
                changePixel(pixel, "rotten_meat")
            }
            return
        }

        // Find the head
        if (!isEmpty(pixel.x, pixel.y - 1, true) && pixelMap[pixel.x][pixel.y - 1].element == "zombie_head") {
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
                    if (elements.zombie.reactions[seenPixel.element] && elements.zombie.reactions[seenPixel.element].attr1 && elements.zombie.reactions[seenPixel.element].attr1.panic) {
                        pixel.panic += elements.zombie.reactions[seenPixel.element].attr1.panic
                        pixel.dir *= -1
                        break
                    }
                    else if (seenPixel.temp > 150) {
                        pixel.panic += 5
                        pixel.dir *= -1
                        if (seenPixel.panic) delete seenPixel.panic
                        break
                    } else if (elements[seenPixel.element].category == "life") {
                        if (pixel.dir != 1 && pixelMap[x2][y2].x > pixel.x) {
                            pixel.dir = 1
                        }
                        else if (pixel.dir != -1 && pixelMap[x2][y2].x < pixel.x) {
                            pixel.dir = -1
                        }
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
                createPixel("ash", pixel.x, pixel.y - 1)
                // set dead to true 10% chance
                if (Math.random() < 0.1) {
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
                else if (!isEmpty(pixel.x + move[0], pixel.y + move[1], true)) {
                    var hitPixel = pixelMap[pixel.x + move[0]][pixel.y + move[1]]
                    if (hitPixel.element === "zombie_body" || hitPixel.element === "zombie_head" && hitPixel.panic < pixel.panic) {
                        // interact with other zombie
                        hitPixel.panic = pixel.panic
                    }
                }
            }
            // 15% chance to change direction
            if (Math.random() < 0.15 || !moved) {
                pixel.dir *= -1
            }
            // homeostasis
            if (pixel.temp > 25) { pixel.temp -= 2 }
            else if (pixel.temp < 25) { pixel.temp += 1 }
        }

    }
}
elements.zombie_head = {
    breakInto: ["ash", "rotten_meat", "bone"],
    burn: 10,
    burnInto: "ash",
    burnTime: 250,
    category: "life",
    color: ["#ffff00", "#f1f100", "#d29720", "#eda63d"],
    conduct: .01,
    density: 1080,
    forceSaveColor: true,
    hidden: true,
    pickElement: "zombie",
    state: "solid",
    stateHigh: "ash",
    stateLow: "frozen_meat",
    temp: 25,
    tempHigh: 150,
    tempLow: -30,
    reactions: {
        "body": { elem2: "zombie", chance: 0.5, },
        "fallout": { elem1: ["ash", "rotten_meat"] },
        "head": { elem2: "zombie" },
        "neutron": { elem1: ["ash", "rotten_meat"], chance: 0.1 },
        "radiation": { elem1: ["ash", "rotten_meat"], chance: 0.4 },
        "sun": { elem1: "ash" },
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
                changePixel(pixel, "rotten_meat")
                return
            }
        }

        // Find the body
        if (!isEmpty(pixel.x, pixel.y + 1, true) && pixelMap[pixel.x][pixel.y + 1].element == "zombie_body") {
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
                createPixel("ash", pixel.x, pixel.y + 1)
                // set dead to true 10% chance
                if (Math.random() < 0.1) {
                    pixel.dead = pixelTicks
                }
            }
        }
        // homeostasis
        if (pixel.temp > 25) { pixel.temp -= 1 }
        else if (pixel.temp < 25) { pixel.temp += 1 }
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

//The Flesh
elements.infectious_flesh = {//Some stuff taken from scp.js
    behavior: behaviors.LIQUID,
    burn: 5,
    burnInto: "cooked_meat",
    burnTime: 400,
    category: "life",
    color: ["#E5D6C7", "#f7ead0"],
    density: 2000,
    state: "liquid",
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
    tempHigh: 300,
    tempLow: 0,
    viscosity: 6000,
    reactions: {
        "blood": { elem2: "infected_blood" },
        "cooked_meat": { color2: ["#9e4839", "#ba6449", "#d2856c", "#a14940"], elem2: "infectious_flesh" },
        "meat": { color2: ["#9e4839", "#ba6449", "#d2856c", "#a14940"], elem2: "infectious_flesh" },
        "sun": { elem1: "cooked_meat" },
    },
    tick: function (pixel) {
        if (Math.random() < 0.45) {
            let y = Math.random() < 0.5 ? 0 : -1
            let xDir = Math.random() < 0.5 ? 1 : -1
            for (let x = 1; x < 20; x++) {
                let x2 = pixel.x + (x * xDir)
                let y2 = pixel.y + y
                if (!isEmpty(x2, y2, true)) {
                    let seenPixel = pixelMap[x2][y2]
                    if (elements[seenPixel.element].category == "life") {
                        if (pixel.dir != 1 && pixelMap[x2][y2].x > pixel.x) {
                            pixel.dir = 1
                        }
                        else if (pixel.dir != -1 && pixelMap[x2][y2].x < pixel.x) {
                            pixel.dir = -1
                        }
                    }
                    if (elements[seenPixel.element].id != elements.glass.id && elements[seenPixel.element].id != elements.stained_glass.id && elements[seenPixel.element].id != elements.glass_shard.id) {
                        break
                    }
                }
            }
        }

        if (!pixel.dir || pixel.dir == undefined) {
            pixel.dir = 0
        }

        if (pixel.panic > 0 || !pixel.panic || pixel.panic == undefined) {
            pixel.panic = 0
        }
        if (Math.random() < 0.05) { // Move 5% chance
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
                    tryMove(pixel, pixel.x + move[0], pixel.y + move[1]) && pixel.x === origx && pixel.y === origy
                }
                if (!isEmpty(pixel.x + move[0], pixel.y + move[1], true)) {
                    var hitPixel = pixelMap[pixel.x + move[0]][pixel.y + move[1]]
                    if (hitPixel.element == "infectious_flesh" && hitPixel.dir != pixel.dir) {
                        hitPixel.dir = pixel.dir
                    }
                }
            }
            // 5% chance to change direction
            if (Math.random() < 0.05 || !moved) {
                pixel.dir *= -1
            }
        }
        // homeostasis
        if (pixel.temp > 47) { pixel.temp -= 1 }
        else if (pixel.temp < 20) { pixel.temp += 1 }
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i]
            var x = pixel.x + coords[0]
            var y = pixel.y + coords[1]
            if (!isEmpty(x, y) && !outOfBounds(x, y) && Math.random() > 0.05) {
                var shatter = pixelMap[x][y]
                if (shatter.element == "glass" || shatter.element == "rad_glass" || shatter.element == "stained_glass") {
                    breakPixel(shatter)
                }
            }
        }
    },
    onCollide: function (_pixel1, pixel2) {
        if (elements[pixel2.element].category == "life") {
            if (pixel2.element == "tree_branch") {
                pixel2.element = "wood"
            }
            else {
                pixel2.element = "infectious_flesh"
            }
        }
        else if (pixel2.element == "skin" || pixel2.element == "meat" || pixel2.element == "cured_meat" || pixel2.element == "rotten_meat" || pixel2.element == "cooked_meat") {
            pixel2.element = "infectious_flesh"
        }
        else if (pixel2.element == "dust" || pixel2.element == "cloth" || pixel2.element == "cloth_scrap" || pixel2.element == "hair" || pixel2.element == "loose_hair") {
            deletePixel(pixel2.x, pixel2.y)
        }
    },
}
elements.infected_blood = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    color: ["#990000", "#dd0000"],
    density: 1060,
    stain: 0.1,
    state: "liquid",
    stateHigh: ["steam", "salt", "oxygen"],
    tempHigh: 125,
    tempLow: 0,
    viscosity: 100,
    reactions: {
        "skin": { elem1: "infectious_flesh", elem2: "infectious_flesh" },
        "plague": { elem1: "infection", elem2: null },
        "rotten_meat": { elem1: "infection" },
        "rotten_cheese": { elem1: "infection" },
        "virus": { elem1: "infection", elem2: null },
        "cancer": { elem1: "infection" },
        "cyanide": { elem1: "infection", elem2: null },
        "cyanide_gas": { elem1: "infection", elem2: null },
        "mushroom_spore": { elem1: "infection", elem2: null },
        "mushroom_gill": { elem1: "infection" },
        "dirty_water": { elem1: "infection", elem2: null },
        "rad_steam": { elem1: "infection" },
        "rad_glass": { elem1: "infection" },
        "rad_shard": { elem1: "infection" },
        "rad_cloud": { elem1: "infection" },
        "fallout": { elem1: "infection" },
        "oxidized_copper": { elem1: "infection", chance: 0.05 },
        "rat": { elem1: "infectious_flesh", elem2: "infectious_flesh" },
        "flea": { elem1: "infectious_flesh", elem2: null },
        "worm": { elem1: "infectious_flesh", elem2: null },
        "mercury": { elem1: "infection", elem2: null, chance: 0.5 },
        "lead": { elem1: "infection", elem2: null, chance: 0.1 },
        "oxygen": { elem2: null, chance: 0.1 },
        "carbon_dioxide": { elem2: null, chance: 0.1 },
        "blood": { elem2: "infected_blood" }
    },
}
//
elements.bless.reactions.infected_blood = { elem2: "antibody" }
elements.bless.reactions.infectious_flesh = { elem2: null }
elements.bless.reactions.zombie_body = { elem2: null }
elements.bless.reactions.zombie_head = { elem2: null }
