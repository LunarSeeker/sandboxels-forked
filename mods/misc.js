elements.red_ice = {
    color: "#D2042D",
    excludeRandom: true,
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    category: "solids",
    density: 917,
    state: "solid",
    stateLow: "red_water",
    tempLow: 0,
    reactions: {
        "blood": { elem2: "red_ice" },
        "body": { elem2: "red_ice" },
        "cactus": { elem2: "flesh_plant" },
        "dirty_water": { elem2: "red_water" },
        "frozen_plant": { elem2: "flesh_plant" },
        "head": { elem2: "red_ice" },
        "ice": { elem2: "red_ice" },
        "plant": { elem2: "flesh_plant" },
        "pool_water": { elem2: "red_water" },
        "salt_water": { elem2: "red_water" },
        "slush": { elem2: "red_ice" },
        "steam": { elem2: "red_steam" },
        "sugar_water": { elem2: "red_water" },
        "water": { elem2: "red_water" },
    },
}

elements.red_water = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    color: "#880808",
    density: 997,
    excludeRandom: true,
    extinguish: true,
    state: "liquid",
    stateHigh: "red_ice",
    stateLow: "red_steam",
    temp: -20,
    tempHigh: 0,
    tempLow: -100,
    reactions: {
        "blood": { elem2: "red_ice" },
        "body": { elem2: "red_ice" },
        "cactus": { elem2: "flesh_plant" },
        "dirty_water": { elem2: "red_water" },
        "frozen_plant": { elem2: "flesh_plant" },
        "head": { elem2: "red_ice" },
        "ice": { elem2: "red_ice" },
        "plant": { elem2: "flesh_plant" },
        "pool_water": { elem2: "red_water" },
        "salt_water": { elem2: "red_water" },
        "slush": { elem2: "red_ice" },
        "steam": { elem2: "red_steam" },
        "sugar_water": { elem2: "red_water" },
        "water": { elem2: "red_water" },
    },
}

elements.red_steam = {
    behavior: behaviors.GAS,
    category: "gases",
    color: "#F88379",
    density: 0.6,
    excludeRandom: true,
    extinguish: true,
    state: "gas",
    stateHigh: "red_water",
    temp: -150,
    tempHigh: -100,
    reactions: {
        "blood": { elem2: "red_ice" },
        "body": { elem2: "red_ice" },
        "cactus": { elem2: "flesh_plant" },
        "dirty_water": { elem2: "red_water" },
        "frozen_plant": { elem2: "flesh_plant" },
        "head": { elem2: "red_ice" },
        "ice": { elem2: "red_ice" },
        "plant": { elem2: "flesh_plant" },
        "pool_water": { elem2: "red_water" },
        "salt_water": { elem2: "red_water" },
        "slush": { elem2: "red_ice" },
        "steam": { elem2: "red_steam" },
        "sugar_water": { elem2: "red_water" },
        "water": { elem2: "red_water" },
    }
}

elements.flesh_plant = {
    behavior: behaviors.WALL,
    breakInto: ["blood", "meat", "bone"],
    category: "life",
    color: "#1d84de",
    density: 1050,
    state: "solid",
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
    temp: -25,
    tempHigh: 30,
    tempLow: -150,
    reactions: {
        "cancer": { elem1: "cancer", chance: 0.01 },
        "fallout": { elem1: "cancer", chance: 0.05 },
        "neutron": { elem1: ["ash", "meat", "rotten_meat", "cooked_meat"], chance: 0.05 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.5 },
        "plague": { elem1: "plague", chance: 0.1 },
        "radiation": { elem1: "cancer", chance: 0.4 },
        "sun": { elem1: "cooked_meat" },
        "water": { elem2: "bubble", attr2: { "clone": "water" }, chance: 0.001 },
    },
}

elements.goobberry = {
    behavior: behaviors.POWDER,
    breakInto: "juice",
    breakIntoColor: "#5dd507",
    category: "food",
    color: ["#464196", "#5dd507"],
    reactions: {},
    state: "solid",
}

elements.cook_juice = {
    color: "#da1a1a",
    behavior: behaviors.LIQUID,
    reactions: {
        "body": { elem1: null, elem2: "cooked_meat" },
        "head": { elem1: null, elem2: "cooked_meat" },
        "meat": { elem1: null, elem2: "cooked_meat" },
        "rotten_meat": { elem2: "cooked_meat" },
    },
    category: "liquids",
    density: 792,
    stain: -0.25,
    state: "liquid",
    viscosity: 1.15,
}

elements.inversium = {
    behavior: behaviors.LIQUID,
    category: "special",
    color: ["#000090", "#0000ff"],
    density: 50,
    excludeRandom: true,
    state: "liquid",
    viscosity: 0.5,
    reactions: {
        "cactus": { elem2: "flesh_plant" },
        "cancer": { elem2: "cell" },
        "dead_plant": { elem2: "flesh_plant" },
        "dirty_water": { elem1: null, elem2: "red_water" },
        "frozen_plant": { elem2: "flesh_plant" },
        "gold": { elem1: null, elem2: "lead" },
        "ice": { elem1: null, elem2: "red_ice" },
        "plant": { elem2: "flesh_plant" },
        "pool_water": { elem1: null, elem2: "red_water" },
        "salt_water": { elem1: null, elem2: "sugar_water" },
        "salt": { elem2: "sugar" },
        "slush": { elem1: null, elem2: "red_ice" },
        "steam": { elem1: null, elem2: "red_steam" },
        "water": { elem1: null, elem2: "red_water" },
    },
}

elements.blue_goo = {
    behavior: behaviors.LIQUID,
    category: "special",
    color: ["#b0e9f7", "#0008ff", "#09c8f7"],
    density: 0.75,
    excludeRandom: true,
    ignore: ["bless", "blue_goo", "inversium", "strange_matter", "midas_touch", "water", "salt_water", "time"],
    state: "liquid",
    viscosity: 1.05,
    tick: function (pixel) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue
                let p = getPixel((pixel.x + dx), (pixel.y + dy))
                if (p && elements[p.element].state === "liquid" && elements.blue_goo.ignore.indexOf(p.element) === -1) {
                    changePixel(p, "blue_goo")
                }
            }
        }
    },
}

elements.time = {
    behavior: behaviors.LIQUID,
    category: "special",
    color: "#ffffff",
    density: 1,
    state: "liquid",
    reactions: {
        "ant": { elem1: null, elem2: "dead_bug" },
        "bee": { elem1: null, elem2: "dead_bug" },
        "body": { elem1: null, elem2: "rotten_meat" },
        "flesh_plant": { elem1: null, elem2: "rotten_meat" },
        "fly": { elem1: null, elem2: "dead_bug" },
        "grass": { elem1: null, elem2: "dead_plant" },
        "head": { elem1: null, elem2: "rotten_meat" },
        "iron": { elem1: null, elem2: "rust" },
        "meat": { elem1: null, elem2: "rotten_meat" },
        "plant": { elem1: null, elem2: "dead_plant" },
        "skin": { elem1: null, elem2: "rotten_meat" },
        "sun": { elem1: null, elem2: "supernova" }
    },
}

elements.granite = {
    behavior: behaviors.WALL,
    breakInto: ["sand", "gravel"],
    category: "land",
    color: ["#F3FFFF", "#dbc7b8", "#fbe2d7", "#312F2E", "#e0e6c5", "#eadfda"],
    hardness: 0.75,
    state: "solid",
    stateHigh: "magma",
    tempHigh: 1215,
}

elements.scp_409 = {
    behavior: behaviors.WALL,
    category: "special",
    color: "#f7f7f2",
    excludeRandom: true,
    ignore: ["scp_409", "philosophers_stone", "granite", "strange_matter", "bless", "time"],
    state: "solid",
    tick: function (pixel) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue
                let p = getPixel((pixel.x + dx), (pixel.y + dy))
                if (p && elements.scp_409.ignore.indexOf(p.element) === -1) {
                    changePixel(p, "scp_409")
                }
            }
        }
    },
}

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
    breakInto: ["blood", "meat", "bone"],
    burn: 10,
    burnInto: "cooked_meat",
    burnTime: 250,
    category: "life",
    color: ["#08271d", "#6f9904", "#4b4931"],
    conduct: .01,
    density: 1500,
    forceSaveColor: true,
    hidden: true,
    pickElement: "zombie",
    state: "solid",
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
    temp: 37,
    tempHigh: 150,
    tempLow: -30,
    reactions: {
        "ant": { elem2: "dead_bug", chance: 0.05, oneway: true },
        "bee": { elem2: "dead_bug", oneway: true },
        "egg": { elem2: "yolk", oneway: true },
        "fallout": { elem1: ["ash", "meat", "rotten_meat", "cooked_meat"], chance: 0.01 },
        "firefly": { elem2: "dead_bug", oneway: true },
        "flea": { elem2: "dead_bug", oneway: true },
        "fly": { elem2: "dead_bug", oneway: true },
        "grape": { elem2: "juice", color2: "#291824", oneway: true },
        "neutron": { elem1: ["ash", "meat", "rotten_meat", "cooked_meat"], chance: 0.01 },
        "radiation": { elem1: ["ash", "meat", "rotten_meat", "cooked_meat"], chance: 0.4 },
        "spider": { elem2: "dead_bug", oneway: true },
        "stink_bug": { elem2: "stench", oneway: true },
        "sun": { elem1: "cooked_meat" },
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
            if (pixel.temp > 37) { pixel.temp -= 1 }
            else if (pixel.temp < 37) { pixel.temp += 1 }
        }

    }
}
elements.zombie_head = {
    breakInto: ["blood", "meat", "bone"],
    burn: 10,
    burnInto: "cooked_meat",
    burnTime: 250,
    category: "life",
    color: ["#ffff00", "#f1f100", "#d29720", "#eda63d"],
    conduct: .01,
    density: 1080,
    forceSaveColor: true,
    hidden: true,
    pickElement: "zombie",
    state: "solid",
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
    temp: 37,
    tempHigh: 150,
    tempLow: -30,
    reactions: {
        "body": { elem2: "zombie", chance: 0.5, },
        "fallout": { elem1: ["ash", "meat", "rotten_meat", "cooked_meat"], chance: 0.03 },
        "head": { elem2: "zombie", chance: 0.8, },
        "neutron": { elem1: ["ash", "meat", "rotten_meat", "cooked_meat"], chance: 0.03 },
        "radiation": { elem1: ["ash", "meat", "rotten_meat", "cooked_meat"], chance: 0.4 },
        "sun": { elem1: "cooked_meat" },
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

elements.bless.reactions.blue_goo = { elem2: "water" }
elements.bless.reactions.flesh_plant = { elem2: "plant" }
elements.bless.reactions.inversium = { elem2: null }
elements.bless.reactions.red_ice = { elem2: "ice" }
elements.bless.reactions.red_steam = { elem2: "steam" }
elements.bless.reactions.red_water = { elem2: "water" }
elements.bless.reactions.scp_409 = { elem2: "granite" }
