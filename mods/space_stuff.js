excludeBlackHole = [
    "art",
    "black_hole",
    "bless",
    "body_096",
    "border",
    "cloner",
    "false_vacuum",
    "filter",
    "glam_body",
    "glam_head",
    "glam",
    "gray_goo",
    "head_096",
    "ichor",
    "image",
    "pipe_wall",
    "pipe",
    "portal_in",
    "portal_out",
    "scp_447",
    "scp_682",
    "sensor",
    "singularity",
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
    color: ["#808080", "#bdbdbd"],
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

//Aliens

const aliens = [
    { name: "glam", color: ["#00ff00", "#00ffff", "#ff00ff"], bodyTemp: 100, blood: "poison", breakInto: ["ash", "gold"], burn: 1, burnInto: "explosion", burnTime: 50, conduct: .01, stateHigh: "explosion", stateLow: "explosion", tempHigh: 5000, tempLow: -200 },
    { name: "gleep", color: ["#0fdc27", "#00fa68"], bodyTemp: 60, blood: "slime", breakInto: ["slime", "bone"], burn: 10, burnInto: "ash", burnTime: 150, conduct: .1, stateHigh: "ash", stateLow: "ice", tempHigh: 350, tempLow: -100 },
    { name: "martian", color: ["#f43e01", "#fa1500"], bodyTemp: 40, blood: "blood", breakInto: ["blood", "meat", "bone"], burn: 10, burnInto: "cooked_meat", burnTime: 250, conduct: .05, stateHigh: "cooked_meat", stateLow: "frozen_meat", tempHigh: 150, tempLow: -30 },
    { name: "reticulan", color: ["#cacaca", "#fafafa", "#737373"], bodyTemp: 30, blood: "blood", breakInto: ["blood", "meat", "bone"], burn: 10, burnInto: "cooked_meat", burnTime: 150, conduct: .05, stateHigh: "cooked_meat", stateLow: "frozen_meat", tempHigh: 100, tempLow: -50 },
    { name: "venusian", color: ["#b7f401", "#fac000"], bodyTemp: 40, blood: "blood", breakInto: ["blood", "meat", "bone"], burn: 10, burnInto: "cooked_meat", burnTime: 250, conduct: .05, stateHigh: "cooked_meat", stateLow: "frozen_meat", tempHigh: 150, tempLow: -30 },
]

aliens.forEach(species => {
    const alien_head = species.name + "_head"
    const alien_body = species.name + "_body"

    elements[species.name] = {
        color: species.color,
        category: "aliens",
        properties: {
            dead: false,
            dir: 1,
            panic: 0
        },
        onPlace: function (pixel) {
            if (!isEmpty(pixel.x, pixel.y - 1, true) && pixelMap[pixel.x][pixel.y - 1].element === alien_head) {
                deletePixel(pixel.x, pixel.y - 1)
            }
            else if (!isEmpty(pixel.x, pixel.y + 1, true) && pixelMap[pixel.x][pixel.y + 1].element === alien_body) {
                deletePixel(pixel.x, pixel.y + 1)
            }

            if (isEmpty(pixel.x, pixel.y + 1)) {
                createPixel(alien_body, pixel.x, pixel.y + 1)
                var color = pixel.color
                changePixel(pixel, alien_head)
                pixel.color = color
            }
            else if (isEmpty(pixel.x, pixel.y - 1)) {
                createPixel(alien_head, pixel.x, pixel.y - 1)
                pixelMap[pixel.x][pixel.y - 1].color = pixel.color
                changePixel(pixel, alien_body)
            }
            else {
                deletePixel(pixel.x, pixel.y)
            }
        },
        reactions: {
            "acid_gas": { attr1: { panic: 5 } },
            "acid": { attr1: { panic: 5 } },
            "blood": { attr1: { panic: 1 } },
            "c4": { attr1: { panic: 5 } },
            "cancer": { attr1: { panic: 3 } },
            "cold_fire": { attr1: { panic: 5 } },
            "dynamite": { attr1: { panic: 5 } },
            "fire": { attr1: { panic: 5 } },
            "grenade": { attr1: { panic: 5 } },
            "gunpowder": { attr1: { panic: 5 } },
            "infection": { attr1: { panic: 2 } },
            "plague": { attr1: { panic: 5 } },
            "plasma": { attr1: { panic: 5 } },
            "radiation": { attr1: { panic: 5 } },
            "tnt": { attr1: { panic: 5 } },
        },
        related: [alien_body, alien_head],
        cooldown: defaultCooldown,
        forceSaveColor: true
    }
    elements[alien_body] = {
        color: species.color,
        category: "life",
        hidden: true,
        density: 1500,
        state: "solid",
        conduct: species.conduct,
        temp: species.bodyTemp,
        tempHigh: species.tempHigh,
        stateHigh: species.stateHigh,
        tempLow: species.tempLow,
        stateLow: species.stateLow,
        burn: species.burn,
        burnTime: species.burnTime,
        burnInto: species.burnInto,
        breakInto: species.breakInto,
        forceSaveColor: true,
        pickElement: species.name,
        reactions: {
            "cancer": { elem1: "cancer", chance: 0.005 },
            "radiation": { elem1: species.burnInto, chance: 0.4 },
            "neutron": { elem1: species.burnInto, chance: 0.01 },
            "fallout": { elem1: species.burnInto, chance: 0.01 },
            "plague": { elem1: "plague", chance: 0.4 },
            "egg": { elem2: "yolk", chance: 0.5, oneway: true },
            "grape": { elem2: "juice", chance: 0.5, color2: "#291824", oneway: true },
            "ant": { elem2: "dead_bug", chance: 0.05, oneway: true },
            "spider": { elem2: "dead_bug", oneway: true },
            "fly": { elem2: "dead_bug", oneway: true },
            "firefly": { elem2: "dead_bug", oneway: true },
            "bee": { elem2: "dead_bug", oneway: true },
            "flea": { elem2: "dead_bug", oneway: true },
            "termite": { elem2: "dead_bug", oneway: true },
            "worm": { elem2: "slime", chance: 0.05, oneway: true },
            "stink_bug": { elem2: "stench", oneway: true },
            "grass_seed": { elem2: null, chance: 0.05 },
            "sun": { elem1: species.burnInto },
            "anesthesia": { attr1: { "panic": 0 } },
            "alcohol_gas": { chance: 0.2, attr1: { "panic": 0 } }
        },
        properties: {
            dead: false,
            dir: 1,
            panic: 0
        },
        tick: function (pixel) {
            if (tryMove(pixel, pixel.x, pixel.y + 1)) { // Fall
                if (!isEmpty(pixel.x, pixel.y - 2, true)) { // Drag head down
                    var headpixel = pixelMap[pixel.x][pixel.y - 2]
                    if (headpixel.element === alien_head) {
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
            if (!isEmpty(pixel.x, pixel.y - 1, true) && pixelMap[pixel.x][pixel.y - 1].element == alien_head) {
                var head = pixelMap[pixel.x][pixel.y - 1]
                if (head.dead) { // If head is dead, kill body
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
                        if (elements[species.name].reactions[seenPixel.element] && elements[species.name].reactions[seenPixel.element].attr1 && elements[species.name].reactions[seenPixel.element].attr1.panic) {
                            pixel.panic += elements[species.name].reactions[seenPixel.element].attr1.panic
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
                    createPixel(species.blood, pixel.x, pixel.y - 1)
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
                        if (hitPixel.element === alien_body || hitPixel.element === alien_head && hitPixel.panic < pixel.panic) {
                            // interact with other human
                            hitPixel.panic = pixel.panic
                        }
                    }
                }
                // 15% chance to change direction
                if (Math.random() < 0.15 || !moved) {
                    pixel.dir *= -1
                }
                // homeostasis
                if (pixel.temp > species.bodyTemp) { pixel.temp -= 1 }
                else if (pixel.temp < species.bodyTemp) { pixel.temp += 1 }
            }

        }
    }
    elements[alien_head] = {
        color: species.color,
        category: "life",
        hidden: true,
        density: 1080,
        state: "solid",
        conduct: species.conduct,
        temp: species.bodyTemp,
        tempHigh: species.tempHigh,
        stateHigh: species.stateHigh,
        tempLow: species.tempLow,
        stateLow: species.stateLow,
        burn: species.burn,
        burnTime: species.burnTime,
        burnInto: species.burnInto,
        breakInto: species.breakInto,
        forceSaveColor: true,
        pickElement: species.name,
        reactions: {
            "cancer": { elem1: "cancer", chance: 0.005 },
            "radiation": { elem1: "ash", chance: 0.4 },
            "neutron": { elem1: "ash", chance: 0.03 },
            "fallout": { elem1: "ash", chance: 0.03 },
            "plague": { elem1: "plague", chance: 0.1 },
            "oxygen": { elem2: "carbon_dioxide", chance: 0.5 },
            "sun": { elem1: species.burnInto },
            "light": { stain1: "#825043" },
            "bee": { stain1: "#cc564b", chance: 0.2 },
            "water": { elem2: "bubble", attr2: { "clone": "water" }, chance: 0.001 },
            "salt_water": { elem2: "bubble", attr2: { "clone": "salt_water" }, chance: 0.001 },
            "pool_water": { elem2: "bubble", attr2: { "clone": "pool_water" }, chance: 0.001 },
            "alcohol": { chance: 0.2, attr1: { "panic": 0 } },
            "anesthesia": { attr1: { "panic": 0 } },
            "alcohol_gas": { chance: 0.2, attr1: { "panic": 0 } }
        },
        properties: {
            dead: false
        },
        tick: function (pixel) {
            doHeat(pixel)
            doBurning(pixel)
            doElectricity(pixel)
            if (pixel.dead) {
                // Turn into rotten_meat if pixelTicks-dead > 500
                if (pixelTicks - pixel.dead > 200 && Math.random() < 0.1) {
                    changePixel(pixel, "rotten_meat")
                    return
                }
            }

            // Find the body
            if (!isEmpty(pixel.x, pixel.y + 1, true) && pixelMap[pixel.x][pixel.y + 1].element == alien_body) {
                var body = pixelMap[pixel.x][pixel.y + 1]
                if (body.dead) { // If body is dead, kill head
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
                    createPixel(species.blood, pixel.x, pixel.y + 1)
                    // set dead to true 15% chance
                    if (Math.random() < 0.15) {
                        pixel.dead = pixelTicks
                    }
                }
            }
            // homeostasis
            if (pixel.temp > species.bodyTemp) { pixel.temp -= 1 }
            else if (pixel.temp < species.bodyTemp) { pixel.temp += 1 }
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
})

//Other

elements.black_hole = { //Taken from  black_hole.js and then modified to destroy elements
    category: "special",
    color: "#000000",
    density: 99999,
    excludeRandom: true,
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

elements.singularity = {
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:80>hydrogen,neutron,proton,electric,helium,radiation|M2"
    ],
    category: "weapons",
    color: "#ffffff",
    cooldown: defaultCooldown,
    darkText: true,
    density: 999999,
    excludeRandom: true,
    state: "solid"
}

elements.bless.reactions.black_hole = { elem2: null }
elements.bless.reactions.singularity = { elem2: null }

if (enabledMods.includes("mods/mega_library.js")) {
    elements.x_dust = {
        behavior: behaviors.POWDER,
        category: "land",
        color: ["#ababab", "#c5c5c5"],
        density: 1500,
        state: "solid"
    }
    elements.x_rock = {
        behavior: behaviors.STURDYPOWDER,
        breakInto: "x_dust",
        category: "land",
        color: ["#808080", "#bdbdbd"],
        density: 1605,
        hardness: 0.5,
        state: "solid",
        stateHigh: "magma",
        tempHigh: 800
    }

    elements.water.reactions.x_dust = {
        func: function (p1, p2) {
            const c2 = getRGB(p2.color)
            let rgb = interpolateRgb(getRGB(p1.color), c2, 0.25)
            changePixel(p1, "slime")
            changePixel(p2, "slime")
            p1.color = rgb
            p2.color = normalize(c2)
        }
    }
}