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

elements.dwarf = {
    color: ["#f3e7db", "#f7ead0", "#eadaba", "#d7bd96", "#a07e56", "#825c43", "#604134", "#3a312a"],
    behavior: function (pixel) {
        behaviors.CRAWLER2(pixel, function (pixel, newX, _newY) {
            if (!pixel.dwarf_digged && !isEmpty(pixel.x + newX, pixel.y, true) && pixelMap[pixel.x + newX][pixel.y].element === "wall") {
                pixel.dwarf_digged = true
            }
        }, function (pixel, newX, _newY) {
            if (Math.random() < 0.02 && !isEmpty(pixel.x + newX, pixel.y + 1, true) && eLists.CRAWLTHRU.indexOf(pixelMap[pixel.x + newX][pixel.y + 1].element) !== -1) {
                if (!pixel.dwarf_digged || !isEmpty(pixel.x + newX, pixel.y, true) && pixelMap[pixel.x + newX][pixel.y].element === "wall") {
                    var wallCoords = [
                        [-1, -1], [1, -1],
                        [-1, 0], [1, 0],
                        [0, 1]
                    ]
                    if (!isEmpty(pixel.x, pixel.y - 2)) {
                        wallCoords.push([0, -1])
                    }
                    if (Math.random() < 0.15) { wallCoords.push([-1, 1]) }
                    if (Math.random() < 0.15) { wallCoords.push([1, 1]) }
                    for (var i = 0; i < wallCoords.length; i++) {
                        var x = pixel.x + newX + wallCoords[i][0]
                        var y = pixel.y + 1 + wallCoords[i][1]
                        if (!isEmpty(x, y, true) && eLists.CRAWLTHRU.indexOf(pixelMap[x][y].element) !== -1) {
                            changePixel(pixelMap[x][y], "wall")
                        }
                    }
                    deletePixel(pixel.x + newX, pixel.y + 1)
                    tryMove(pixel, pixel.x + newX, pixel.y + 1)
                }
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x + newX, pixel.y - 1, true) && eLists.CRAWLTHRU.indexOf(pixelMap[pixel.x + newX][pixel.y - 1].element) !== -1) {
                swapPixels(pixel, pixelMap[pixel.x + newX][pixel.y - 1])
            }
        })
    },
    reactions: {
        "beans": { elem2: [null, null, null, "stench"], chance: 0.05 },
        "diamond": { elem2: null, chance: 0.1 },
        "fallout": { elem1: "rotten_meat", chance: 0.02 },
        "gold": { elem2: null },
        "granite": { elem2: null, chance: 0.05 },
        "light": { stain1: "#825043" },
        "neutron": { elem1: "rotten_meat", chance: 0.02 },
        "oxygen": { elem2: "carbon_dioxide", chance: 1 },
        "radiation": { elem1: "rotten_meat", chance: 0.1 },
        "sun": { elem1: "cooked_meat" }
    },
    breakInto: "rotten_meat",
    category: "life",
    density: 500,
    state: "solid",
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
    tempHigh: 120,
    tempLow: -50
}

elements.bless.reactions.blue_goo = { elem2: "water" }
elements.bless.reactions.flesh_plant = { elem2: "plant" }
elements.bless.reactions.inversium = { elem2: null }
elements.bless.reactions.red_ice = { elem2: "ice" }
elements.bless.reactions.red_steam = { elem2: "steam" }
elements.bless.reactions.red_water = { elem2: "water" }
elements.bless.reactions.scp_409 = { elem2: "granite" }