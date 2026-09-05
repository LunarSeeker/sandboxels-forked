//Inversium Stuff

elements.red_ice = {
    behavior: behaviors.POWDER,
    category: "powders",
    color: "#D2042D",
    density: 917,
    excludeRandom: true,
    state: "solid",
    stateLow: "red_water",
    tempLow: 0,
    reactions: {
        "bee": { elem2: "red_ice" },
        "blood": { elem2: "red_ice" },
        "body": { elem2: "red_ice" },
        "cactus": { elem2: "red_water" },
        "cancer": { elem2: "red_water" },
        "cloud": { elem2: "red_steam", temp: -150 },
        "dirty_water": { elem2: "red_water", temp: -30 },
        "firefly": { elem2: "red_water" },
        "fly": { elem2: "red_ice" },
        "frozen_plant": { elem2: "red_water" },
        "grass": { elem2: "red_water" },
        "head": { elem2: "red_ice" },
        "ice": { elem2: "red_ice" },
        "iron": { elem2: "rust", chance: 0.05 },
        "plant": { elem2: "red_water" },
        "pool_water": { elem2: "red_water", temp: -30 },
        "rain_cloud": { elem2: "red_steam", temp: -150 },
        "rat": { elem2: "red_water" },
        "rotten_meat": { elem2: "red_water" },
        "salt_water": { elem2: "red_water", temp: -30 },
        "slush": { elem2: "red_ice" },
        "snow": { elem2: "red_ice" },
        "steam": { elem2: "red_steam", temp: -150 },
        "stink_bug": { elem2: "red_water" },
        "sugar_water": { elem2: "red_water", temp: -30 },
        "water": { elem2: "red_water", temp: -30 },
    },
}

elements.red_water = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    color: "#ff2100",
    conduct: 0.02,
    density: 997,
    excludeRandom: true,
    extinguish: true,
    stain: -0.5,
    state: "liquid",
    stateHigh: "red_ice",
    stateLow: "red_steam",
    temp: -20,
    tempHigh: 0,
    tempLow: -100,
    reactions: {
        "bee": { elem2: "red_ice" },
        "blood": { elem2: "red_ice" },
        "body": { elem2: "red_ice" },
        "cactus": { elem2: "red_water" },
        "cancer": { elem2: "red_water" },
        "cloud": { elem2: "red_steam", temp: -150 },
        "dirty_water": { elem2: "red_water", temp: -30 },
        "firefly": { elem2: "red_water" },
        "fly": { elem2: "red_ice" },
        "frozen_plant": { elem2: "red_water" },
        "grass": { elem2: "red_water" },
        "head": { elem2: "red_ice" },
        "ice": { elem2: "red_ice" },
        "iron": { elem2: "rust", chance: 0.05 },
        "limestone": { elem2: "wet_sand", chance: 0.00035 },
        "mudstone": { elem2: "mud", chance: 0.00035 },
        "plant": { elem2: "red_water" },
        "pool_water": { elem2: "red_water", temp: -30 },
        "rain_cloud": { elem2: "red_steam", temp: -150 },
        "rat": { elem2: "red_water" },
        "rock": { elem2: "wet_sand", chance: 0.00035 },
        "rotten_meat": { elem2: "red_water" },
        "ruins": { elem2: "rock", chance: 0.00035 },
        "salt_water": { elem2: "red_water", temp: -30 },
        "slush": { elem2: "red_ice" },
        "snow": { elem2: "red_ice" },
        "steam": { elem2: "red_steam", temp: -150 },
        "stink_bug": { elem2: "red_water" },
        "sugar_water": { elem2: "red_water", temp: -30 },
        "tuff": { elem2: "wet_sand", color2: "#bb6a19", chance: 0.00035 },
        "water": { elem2: "red_water", temp: -30 },
    },
}

elements.red_steam = {
    behavior: behaviors.GAS,
    category: "gases",
    color: "#F88379",
    conduct: 0.002,
    density: 0.6,
    excludeRandom: true,
    extinguish: true,
    stain: -0.05,
    state: "gas",
    stateHigh: "red_water",
    temp: -150,
    tempHigh: -100,
    reactions: {
        "bee": { elem2: "red_ice" },
        "blood": { elem2: "red_ice" },
        "body": { elem2: "red_ice" },
        "cactus": { elem2: "red_water" },
        "cancer": { elem2: "red_water" },
        "cloud": { elem2: "red_steam", temp: -150 },
        "dirty_water": { elem2: "red_water", temp: -30 },
        "firefly": { elem2: "red_water" },
        "fly": { elem2: "red_ice" },
        "frozen_plant": { elem2: "red_water" },
        "grass": { elem2: "red_water" },
        "head": { elem2: "red_ice" },
        "ice": { elem2: "red_ice" },
        "iron": { elem2: "rust", chance: 0.05 },
        "plant": { elem2: "red_water" },
        "pool_water": { elem2: "red_water", temp: -30 },
        "rain_cloud": { elem2: "red_steam", temp: -150 },
        "rat": { elem2: "red_water" },
        "rotten_meat": { elem2: "red_water" },
        "salt_water": { elem2: "red_water", temp: -30 },
        "slush": { elem2: "red_ice" },
        "snow": { elem2: "red_ice" },
        "steam": { elem2: "red_steam", temp: -150 },
        "stink_bug": { elem2: "red_water" },
        "sugar_water": { elem2: "red_water", temp: -30 },
        "water": { elem2: "red_water", temp: -30 },
    }
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
        "blood": { elem2: "red_ice" },
        "body": { elem2: "red_ice" },
        "cactus": { elem2: "red_water" },
        "cancer": { elem2: "cell" },
        "dead_plant": { elem2: "red_water" },
        "dirty_water": { elem1: null, elem2: "red_water", temp: -35 },
        "frozen_plant": { elem2: "red_ice" },
        "gold": { elem1: null, elem2: "lead" },
        "ice": { elem1: null, elem2: "red_ice", temp: 30 },
        "plant": { elem2: "red_water" },
        "pool_water": { elem1: null, elem2: "red_water", temp: -25 },
        "salt_water": { elem1: null, elem2: "red_water", temp: -25 },
        "salt": { elem2: "sugar" },
        "slush": { elem1: null, elem2: "red_ice", temp: 25 },
        "snow": { elem2: "red_ice" },
        "sugar_water": { elem1: null, elem2: "red_water", temp: -25 },
        "steam": { elem1: null, elem2: "red_steam", temp: -150 },
        "water": { elem1: null, elem2: "red_water", temp: -30 },
    },
}

//

elements.blue_goo = {
    behavior: behaviors.LIQUID,
    category: "special",
    color: ["#b0e9f7", "#0008ff", "#09c8f7"],
    density: 0.75,
    excludeRandom: true,
    ignore: [
        "bless",
        "blue_goo",
        "inversium",
        "strange_matter",
        "midas_touch",
        "water",
        "salt_water",
        "time"
    ],
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
    viscosity: 1050,
    reactions: {
        "ant": { elem1: null, elem2: "dead_bug" },
        "bee": { elem1: null, elem2: "dead_bug" },
        "body": { elem1: null, elem2: "rotten_meat" },
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
    breakInto: "sand",
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
    ignore: [
        "granite",
        "philosophers_stone",
        "scp_409",
        "strange_matter",
        "time"
    ],
    state: "solid",
    tick: function (pixel) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue
                let p = getPixel((pixel.x + dx), (pixel.y + dy))
                if (p && elements[p.element].state == "solid" && elements.scp_409.ignore.indexOf(p.element) === -1 && elements[p.element].category !== "energy") {
                    changePixel(p, "scp_409")
                }
            }
        }
    },
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

//

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
//

elements.bless.reactions.blue_goo = { elem2: "water" }
elements.bless.reactions.inversium = { elem2: null }
elements.bless.reactions.red_ice = { elem2: "ice" }
elements.bless.reactions.red_steam = { elem2: "steam" }
elements.bless.reactions.red_water = { elem2: "water" }
elements.bless.reactions.scp_409 = { elem2: "granite" }
elements.bless.reactions.zombie_body = { elem2: null }
elements.bless.reactions.zombie_head = { elem2: null }
