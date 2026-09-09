removeElementsDark = [ //For elements not in the "life" category
    "ant_wall",
    "charcoal",
    "coal",
    "feather",
    "hair",
    "ice",
    "light",
    "oil",
    "plastic",
    "skin",
    "slime",
    "steam",
    "waste_barrel",
    "water",
]

function decay(ms) { //Taken from decays.js
    return 1 / (Math.pow(Math.log10(ms * 30 + 1), 2) * 10)
}

elements.dwarf_wall = {
    behavior: behaviors.WALL,
    breakInto: "dust",
    colorPattern: textures.BRICK,
    colorKey: {
        "l": "#986c51",
        "r": "#8a6249",
        "d": "#383838",
        "w": "#212121"
    },
    category: "solids",
    hardness: 0.9,
    hidden: true,
    insulate: true,
    state: "solid",
    stateHigh: "magma",
    tempHigh: 5000,
    darkText: true
}

elements.dwarf = {
    color: ["#f3e7db", "#f7ead0", "#eadaba", "#d7bd96", "#a07e56", "#825c43", "#604134", "#3a312a"],
    behavior: function (pixel) {
        behaviors.CRAWLER2(pixel, function (pixel, newX, _newY) {
            if (!pixel.dwarf_hilled && !isEmpty(pixel.x + newX, pixel.y, true) && pixelMap[pixel.x + newX][pixel.y].element === "dwarf_wall") {
                pixel.dwarf_hilled = true
            }
        }, function (pixel, newX, _newY) {
            if (Math.random() < 0.01 && !isEmpty(pixel.x + newX, pixel.y + 1, true) && eLists.CRAWLTHRU.indexOf(pixelMap[pixel.x + newX][pixel.y + 1].element) !== -1) {
                if (!pixel.dwarf_hilled || !isEmpty(pixel.x + newX, pixel.y, true) && pixelMap[pixel.x + newX][pixel.y].element === "dwarf_wall") {
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
                    // loop through wallCoords, change pixel to dwarf_wall if in crawlthru
                    for (var i = 0; i < wallCoords.length; i++) {
                        var x = pixel.x + newX + wallCoords[i][0]
                        var y = pixel.y + 1 + wallCoords[i][1]
                        if (!isEmpty(x, y, true) && eLists.CRAWLTHRU.indexOf(pixelMap[x][y].element) !== -1) {
                            changePixel(pixelMap[x][y], "dwarf_wall")
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
    breakInto: "rotten_meat",
    category: "life",
    density: 500,
    state: "solid",
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
    tempHigh: 120,
    tempLow: -50,
    reactions: {
        "beans": { elem2: [null, null, null, "stench"], chance: 0.05 },
        "diamond": { elem2: null, chance: 0.1 },
        "fallout": { elem1: "rotten_meat", chance: 0.02 },
        "gold_coin": { elem2: null },
        "gold": { elem2: null },
        "light": { stain1: "#825043" },
        "neutron": { elem1: "rotten_meat", chance: 0.02 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.4 },
        "radiation": { elem1: "rotten_meat", chance: 0.1 },
        "silver": { elem2: null, chance: 0.05 },
        "sun": { elem1: "cooked_meat" },
    }
}

elements.philosophers_stone = {
    behavior: behaviors.POWDER,
    category: "magic",
    color: ["#ff0000", "#ff8800", "#ffff00", "#0000ff", "#ff00ff"],
    darkText: true,
    density: 1,
    excludeRandom: true,
    state: "solid",
    reactions: {
        "amalgam": { elem2: "silver" },
        "ash": { elem2: "diamond" },
        "cancer": { elem2: "skin" },
        "copper": { elem2: "bronze" },
        "dirt": { elem2: "stable_aether" },
        "glitter": { elem2: "diamond" },
        "iron": { elem2: "steel" },
        "lead": { elem2: "gold" },
        "mercury": { elem2: "silver" },
        "oil": { elem2: "gold" },
        "poison": { elem2: "vaccine" },
        "rust": { elem2: "steel" },
        "static": { elem2: "rainbow" },
        "tin": { elem2: "brass" },
        "unstable_aether": { elem2: "stable_aether" },
        "zinc": { elem2: "bronze" },
    }
}

elements.magic_drill = {
    behavior: [
        "XX|XX|XX",
        "XX|DL|XX",
        "CH:wall|M1 AND CH:magic_drill AND CR:magic_drill|CH:wall"
    ],
    category: "magic",
    color: "#0000ff",
    state: "solid"
}

elements.stable_aether = {
    behavior: behaviors.WALL,
    category: "magic",
    color: ["#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff"],
    state: "solid"
}

elements.unstable_aether = {
    behavior: behaviors.GAS,
    category: "magic",
    color: ["#8a2be2", "#da70d6", "#ba55d3"],
    density: 0.5,
    state: "gas",
    tick: function (pixel) {
        if (Math.random() < decay(1160)) {
            changePixel(pixel, "gold")
        }
    }
}

elements.primordial_chaos = {
    behavior: behaviors.SUPERFLUID,
    category: "magic",
    color: "#1b1b32",
    density: 0.1,
    excludeRandom: true,
    hardness: 1,
    insulate: true,
    movable: false,
    state: "liquid",
    viscosity: 0,
    reactions: {
        "blood": { elem1: ["dwarf", "homunculus"], elem2: "blood" },
        "cancer": { elem1: "cancer", elem2: "cancer" },
        "clay": { elem1: ["dwarf", "homunculus"], elem2: "clay" },
        "dirt": { elem1: ["algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], elem2: "dirt" },
        "grass": { elem1: ["potato", "bee", "plant", "ant"], elem2: "grass" },
        "light": { elem1: ["algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], elem2: null },
        "oxygen": { elem1: ["dwarf", "homunculus", "algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], elem2: null },
        "poison": { elem1: ["cancer", "plague"], elem2: "poison" },
        "water": { elem1: ["potato", "bee", "plant", "ant", "dwarf", "algae", "fish"], elem2: "water" },
    }
}

elements.dark_ice = {
    alias: "corrupted_ice",
    behavior: behaviors.WALL,
    breakInto: [
        "snow",
        "fallout"
    ],
    category: "magic",
    color: ["#1a193c", "#00003c"],
    desc: "Cold substance.",
    excludeRandom: true,
    hardness: 0.9,
    hazard: true,
    hidden: true,
    insulate: true,
    stain: 1,
    state: "solid",
    stateHigh: "dark_water",
    tempHigh: 1,
    temp: -75
}

elements.dark_water = {
    behavior: behaviors.SUPERFLUID,
    category: "magic",
    color: "#00003c",
    density: 999,
    excludeRandom: true,
    stain: 1,
    state: "liquid",
    stateHigh: "dark_steam",
    stateLow: "dark_ice",
    temp: 20,
    tempHigh: 100,
    tempLow: 0,
    viscosity: 5,
    reactions: {
        "dirty_water": { elem2: "fallout" },
        "salt_water": { elem2: null },
        "sugar_water": { elem2: null },
    },
    tick: function (pixel) {
        for (i = 0; i < adjacentCoords.length; i++) {
            //if (Math.random() < 0.5) {
            var checkPosX = pixel.x + adjacentCoords[i][0]
            var checkPosY = pixel.y + adjacentCoords[i][1]
            if (!isEmpty(checkPosX, checkPosY, true)) {
                var newElement = pixelMap[checkPosX][checkPosY].element
                var newCategory = elements[newElement].category
                if (removeElementsDark.includes(newElement) || newCategory === "food" || newCategory === "life") {
                    if (typeof (pixel[newElement]) === "undefined") {
                        pixel[newElement] = 0
                    };
                    pixel[newElement]++
                    deletePixel(checkPosX, checkPosY)
                };
            };
            //};
        };
    },
}

elements.dark_steam = {
    category: "magic",
    behavior: behaviors.GAS,
    color: "#00003c",
    density: 999,
    excludeRandom: true,
    hidden: true,
    stain: 1,
    state: "gas",
    stateLow: "dark_water",
    temp: 150,
    tempLow: 99
}

elements.electric_gas = {
    behavior: behaviors.GAS,
    category: "magic",
    color: "#ffff00",
    conduct: 1,
    density: 20,
    excludeRandom: true,
    stain: -0.75,
    state: "gas",
    tick: function (pixel) {
        doDefaults(pixel)
        if (pixel.freq !== undefined && pixelTicks % (pixel.freq * 4) !== 0) return
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i]
            var x = pixel.x + coords[0]
            var y = pixel.y + coords[1]
            if (!isEmpty(x, y, true)) {
                chargePixel(pixelMap[x][y])
            }
        }
    },
}

elements.liquid_shock = {
    behavior: behaviors.LIQUID,
    category: "magic",
    color: "#ffff00",
    conduct: 1,
    density: 20,
    excludeRandom: true,
    stain: -0.75,
    state: "liquid",
    viscosity: 1,
    tick: function (pixel) {
        doDefaults(pixel)
        if (pixel.freq !== undefined && pixelTicks % (pixel.freq * 4) !== 0) return
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i]
            var x = pixel.x + coords[0]
            var y = pixel.y + coords[1]
            if (!isEmpty(x, y, true)) {
                chargePixel(pixelMap[x][y])
            }
        }
    },
}

elements.odd_radio = {
    behavior: behaviors.WALL,
    breakInto: ["copper", "dna"],
    category: "magic",
    color: "#6e2f04",
    desc: "Speeds up evolution.",
    excludeRandom: true,
    hardness: 0.9,
    state: "solid",
    tick: function (pixel) {
        doDefaults(pixel)
        if (pixelTicks % 4 === 0) {
            for (var i = 0; i < adjacentCoords.length; i++) {
                var x = pixel.x + adjacentCoords[i][0]
                var y = pixel.y + adjacentCoords[i][1]
                if (isEmpty(x, y)) {
                    if (Math.random() > 0.2) { continue }
                    createPixel("odd_radiowave", x, y)
                }
            }
        }
    },
}

elements.odd_radiowave = {
    category: "energy",
    color: "#542607",
    density: 0.0001,
    ignoreAir: true,
    insulate: true,
    state: "gas",
    tick: function (pixel) {
        if (Math.random() < 0.02) {
            deletePixel(pixel.x, pixel.y)
            return
        }
        if (pixel.bx === undefined) {
            // choose 1, 0, or -1
            pixel.bx = Math.random() < 0.5 ? 1 : Math.random() < 0.5 ? 0 : -1
            pixel.by = Math.random() < 0.5 ? 1 : Math.random() < 0.5 ? 0 : -1
            // if both are 0, make one of them 1 or -1
            if (pixel.bx === 0 && pixel.by === 0) {
                if (Math.random() < 0.5) { pixel.bx = Math.random() < 0.5 ? 1 : -1 }
                else { pixel.by = Math.random() < 0.5 ? 1 : -1 }
            }
        }
        // move and invert direction if hit
        if (pixel.bx && !tryMove(pixel, pixel.x + pixel.bx, pixel.y)) {
            if (!isEmpty((pixel.x + pixel.bx), pixel.y, true)) {
                var newPixel = pixelMap[pixel.x + pixel.bx][pixel.y]
                if (!elements[newPixel.element].insulate) {
                    newPixel.temp += 1
                    pixelTempCheck(newPixel)
                }
            }
            pixel.bx = -pixel.bx
        }
        if (!pixel.del && pixel.by && !tryMove(pixel, pixel.x, pixel.y + pixel.by)) {
            if (!isEmpty(pixel.x, (pixel.y + pixel.by), true)) {
                var newPixel = pixelMap[pixel.x][pixel.y + pixel.by]
                if (!elements[newPixel.element].insulate) {
                    newPixel.temp += 1
                    pixelTempCheck(newPixel)
                }
            }
            pixel.by = -pixel.by
        }
    },
    reactions: {
        "cancer": { elem2: "wheat_seed" },
        "cell": { elem2: "ant" },
        "dwarf": { elem2: "human" },
        "flower_seed": { elem2: "sapling" },
        "fly": { elem2: "firefly" },
        "grass": { elem2: "sapling" },
        "homunculus": { elem2: "human" },
        "infection": { elem2: "wheat_seed" },
        "plant": { elem2: "snake" },
        "slug": { elem2: "snail" },
        "tagpole": { elem2: "frog" },
    },
}

elements.ichor = {
    behavior: behaviors.LIQUID,
    category: "magic",
    color: "#ffff00",
    darkText: true,
    density: 100,
    extinguish: true,
    stain: -1,
    state: "liquid",
    viscosity: 1
}

elements.bless.reactions.dark_ice = { elem2: null }
elements.bless.reactions.dark_steam = { elem2: null }
elements.bless.reactions.dark_water = { elem2: null }
elements.ichor.reactions = elements.bless.reactions