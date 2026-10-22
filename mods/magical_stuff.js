function growTree(pixel, leaf, branch, growRate) {
    //if (!pixel.burning) {
    if (isEmpty(pixel.x - 1, pixel.y - 1) && Math.random() < growRate) {
        if (Math.random() < 0.5) {
            createPixel(leaf, pixel.x - 1, pixel.y - 1)
        }
        else {
            createPixel(branch, pixel.x - 1, pixel.y - 1)
        }
    }
    if (isEmpty(pixel.x + 1, pixel.y - 1) && Math.random() < growRate) {
        if (Math.random() < 0.5) {
            createPixel(leaf, pixel.x + 1, pixel.y - 1)
        }
        else {
            createPixel(branch, pixel.x + 1, pixel.y - 1)
        }
    }
    if (isEmpty(pixel.x, pixel.y - 1) && Math.random() < growRate) {
        if (Math.random() < 0.75) {
            createPixel(leaf, pixel.x, pixel.y - 1)
        }
        else {
            createPixel(branch, pixel.x, pixel.y - 1)
        }
    }
    //}
    // Add doDefaults(pixel) at the end of every element that uses growTree just in case.
}

dwarfcrawlThru = [...eLists.CRAWLTHRU, ...eLists.SOIL, "granite", "ice", "snow", "plant", "concrete"]

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

let magic_textures = {
    p_stone: [
        "sssggg",
        "sssggg",
        "sssggg",
        "gggsss",
        "gggsss",
        "gggsss"
    ],
    magic_steel: [
        "AAABBB",
        "AABBCC",
        "BBAACC",
    ]
}

elements.dwarf_wall = {
    behavior: behaviors.WALL,
    breakInto: "dust",
    category: "solids",
    color: "#8a6249",
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
            if (Math.random() < 0.01 && !isEmpty(pixel.x + newX, pixel.y + 1, true) && dwarfcrawlThru.indexOf(pixelMap[pixel.x + newX][pixel.y + 1].element) !== -1) {
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
                        if (!isEmpty(x, y, true) && dwarfcrawlThru.indexOf(pixelMap[x][y].element) !== -1) {
                            changePixel(pixelMap[x][y], "dwarf_wall")
                        }
                    }
                    deletePixel(pixel.x + newX, pixel.y + 1)
                    tryMove(pixel, pixel.x + newX, pixel.y + 1)
                }
            }
            else if (Math.random() < 0.1 && !isEmpty(pixel.x + newX, pixel.y - 1, true) && dwarfcrawlThru.indexOf(pixelMap[pixel.x + newX][pixel.y - 1].element) !== -1) {
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
        "copper": { elem2: null },
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
        "tungsten": { elem2: null, chance: 0.01 },
        "zinc": { elem2: null },
    }
}

elements.philosophers_stone = {
    name: "ALCHEMY",
    behavior: behaviors.POWDER,
    category: "special",
    colorPattern: magic_textures.p_stone,
    colorKey: {
        "g": "#7dce2b",
        "s": "#EAB115",
    },
    darkText: true,
    density: 1,
    excludeRandom: true,
    state: "solid",
    reactions: {
        "aluminum": { elem2: "silver" },
        "amalgam": { elem2: "silver" },
        "ash": { elem2: "diamond" },
        "blue_gold": { elem2: "gold" },
        "cancer": { elem2: "cell" },
        "copper": { elem2: "bronze" },
        "electrum": { elem1: "silver", elem2: "gold" },
        "gallium": { elem2: "silver" },
        "glitter": { elem2: "diamond" },
        "iron": { elem2: "steel" },
        "lead": { elem2: "gold" },
        "mercury": { elem2: "silver" },
        "metal_scrap": { elem2: "steel" },
        "nickel": { elem2: "invar" },
        "oil": { elem2: "gold" },
        "poison": { elem2: "vaccine" },
        "purple_gold": { elem2: "gold" },
        "pyrite": { elem2: "gold" },
        "rose_gold": { elem2: "gold" },
        "rust": { elem2: "steel" },
        "solid_mercury": { elem2: "silver" },
        "static": { elem2: "rainbow" },
        "sterling": { elem2: "silver" },
        "tin": { elem2: "brass" },
        "zinc": { elem2: "bronze" },
    }
}

elements.magic_drill = {
    behavior: [
        "XX|M1 AND BO|XX",
        "DL|XX|DL",
        "M2|M1|M2"
    ],
    category: "special",
    color: "#0000ff",
    state: "solid"
}

elements.primordial_chaos = {
    behavior: behaviors.SUPERFLUID,
    category: "life",
    color: "#1b1b32",
    density: 1,
    excludeRandom: true,
    stain: -0.1,
    state: "liquid",
    viscosity: 0,
    reactions: {
        "ant": { elem1: "ant", elem2: "ant" },
        "bee": { elem1: "bee", elem2: "bee" },
        "blood": { elem1: ["dwarf", "homunculus"], elem2: "blood" },
        "body": { elem2: "homunculus" },
        "cancer": { elem1: "cancer", elem2: "cancer" },
        "clay": { elem1: ["dwarf", "homunculus"], elem2: "clay" },
        "dirt": { elem1: ["algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], elem2: "dirt" },
        "grass": { elem1: ["potato", "bee", "plant", "ant"], elem2: "grass" },
        "head": { elem2: "homunculus" },
        "light": { elem1: ["algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], elem2: null },
        "mercury": { elem1: ["cancer", "plague"] },
        "milk": { elem2: ["cell", "yeast"] },
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
    category: "solids",
    color: "#00003c",
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
    category: "liquids",
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
    category: "gases",
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
    category: "gases",
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
    category: "liquids",
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
    category: "special",
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
                    if (Math.random() > 0.1) { continue }
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
        "blood": { elem2: "human" },
        "cancer": { elem2: "wheat_seed" },
        "cell": { elem2: "ant" },
        "dwarf": { elem2: "human" },
        "flower_seed": { elem2: "sapling" },
        "fly": { elem2: "firefly" },
        "grass": { elem2: "sapling" },
        "homunculus": { elem2: "human" },
        "infection": { elem2: "wheat_seed" },
        "plant": { elem2: "sapling" },
        "slug": { elem2: "snail" },
        "tagpole": { elem2: "frog" },
    },
}

elements.ichor = {
    behavior: behaviors.LIQUID,
    category: "special",
    color: "#ffff00",
    darkText: true,
    density: 100,
    extinguish: true,
    stain: -1,
    state: "liquid",
    viscosity: 1
}

elements.magic_steel = {
    colorKey: {
        "A": "#ff0000",
        "B": "#ff8800",
        "C": "#ffff00",
    },
    colorPattern: magic_textures.magic_steel,
    behavior: behaviors.WALL,
    category: "solids",
    conduct: 0.2,
    density: 7850,
    hardness: 0.9
}

elements.ancient_curse = {
    behavior: behaviors.LIQUID,
    color: ["#ff695e", "#ff8682"],
    tick: function (pixel) {
        var coords = rectCoords(pixel.x - 1, pixel.y - 1, pixel.x + 1, pixel.y + 3)
        for (var i = 0; i < coords.length; i++) {
            var x = coords[i].x
            var y = coords[i].y
            if (!isEmpty(x, y, true)) {
                elements.ancient_curse.tool(pixelMap[x][y])
            }
        }
    },
    tool: function (pixel) {
        if (elements[pixel.element].id === elements.ancient_curse.id) { return }
        if (elements.ancient_curse.reactions[pixel.element]) { return }
        if (elements[pixel.element].state === "gas") { return }
        if (elements[pixel.element].state === "liquid") {
            changePixel(pixel, (pixel.temp > 327 ? "molten_lead" : "ancient_curse"))
        }
        else if (elements[pixel.element].movable) {
            changePixel(pixel, "sand")
        }
        else {
            changePixel(pixel, "lead")
        }
    },
    canPlace: true,
    category: "special",
    density: 193,
    excludeRandom: true,
    state: "liquid",
    reactions: {
        "aluminum": {},
        "body": {},
        "cooked_meat": { elem2: "rotten_meat" },
        "cured_meat": { elem2: "rotten_meat" },
        "gold": { elem2: "pyrite" },
        "head": {},
        "ichor": {},
        "lead": {},
        "meat": { elem2: "rotten_meat" },
        "molten_lead": {},
        "molten_silver": { elem2: "aluminum" },
        "pipe": {},
        "pyrite": {},
        "rotten_meat": {},
        "sand": {},
        "silver": { elem2: "aluminum" },
        "wall": {},
    },
}

elements.potion = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    color: ["#5eff89", "#82fffd"],
    density: 193,
    excludeRandom: true,
    ignore: ["dwarf", "plant", "tree_branch"],
    state: "liquid",
    onCollide: function (_pixelOG, pixel) {
        if (elements[pixel.element].id === elements.potion.id) { return }
        if (elements.potion.reactions[pixel.element]) { return }
        if (elements.potion.ignore.indexOf(pixel.element) !== -1) return
        if (elements[pixel.element].category === "life" || elements[pixel.element].pickElement === "human") {
            if (eLists.ANIMAL.indexOf(pixel.element) !== -1) {
                changePixel(pixel, "gold_coin")
            } else if (eLists.SEEDS.indexOf(pixel.element) !== -1) {
                changePixel(pixel, "snake")
            } else {
                changePixel(pixel, "clay")
            }
        }
    },
    reactions: {
        "ant": { elem2: "dwarf" },
        "cooked_meat": { elem2: "plant" },
        "copper": { elem2: "philosophers_stone" },
        "cured_meat": { elem2: "plant" },
        "ice": { elem2: "cold_steam" },
        "meat": { elem2: "plant" },
        "mycelium": { elem2: "dirt" },
        "rotten_meat": { elem2: "plant" },
        "water": { elem2: "potion" },
        "wood": { elem2: "tree_branch" },
    },
}

elements.cold_steam = {
    alias: "cold vapor",
    behavior: behaviors.GAS,
    category: "gases",
    color: "#ff6dba",
    density: 0.6,
    extinguish: true,
    stain: -0.05,
    state: "gas",
    stateHigh: "mirror_water",
    temp: -5,
    tempHigh: 5,
    hidden: true
}
elements.hot_ice = {
    behavior: behaviors.WALL,
    category: "solids",
    color: "#bead2b",
    conduct: 0.002,
    density: 917,
    state: "solid",
    stateLow: "mirror_water",
    temp: 150,
    tempLow: 95,
    hidden: true
}

elements.mirror_water = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    color: "#ff7612",
    conduct: 0.02,
    density: 997,
    extinguish: true,
    stain: -0.5,
    state: "liquid",
    stateHigh: "hot_ice",
    stateLow: "cold_steam",
    tempHigh: 100,
    tempLow: 0,
    reactions: {
        "wet_sand": { elem2: "tuff", chance: 0.00035 },
        "rock": { elem2: "ruins", chance: 0.00035 },
        "mud": { elem2: "mudstone", chance: 0.00035 },
        "fly": { elem2: "dead_bug", chance: 0.1, oneway: true },
        "firefly": { elem2: "dead_bug", chance: 0.1, oneway: true },
        "bee": { elem2: "dead_bug", chance: 0.05, oneway: true },
        "stink_bug": { elem2: "dead_bug", chance: 0.1, oneway: true },
        "water": { elem2: "mirror_water", chance: 0.1 },
        "mirror_water": { elem2: "bubble", attr2: { "clone": "mirror_water" }, chance: 0.001, tempMax: 15 },
        // electrolysis:
        "aluminum": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.0025 },
        "zinc": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.015 },
        "steel": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.0125 },
        "iron": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.0125 },
        "tin": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.01 },
        "brass": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.001 },
        "bronze": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.001 },
        "copper": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.0075 },
        "silver": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.0075 },
        "gold": { elem1: ["hydrogen", "hydrogen", "oxygen"], charged: true, chance: 0.0075 }
    }
}

elements.iron_tree = {
    behavior: behaviors.WALL,
    breakInto: ["iron", "glass_shard"],
    category: "solids",
    color: "#757575",
    density: 1500,
    hardness: 0.5,
    movable: false,
    state: "solid",
    tick: function (pixel) {
        growTree(pixel, "iron", "iron_tree", 0.05)
        doDefaults(pixel)
    },
}

elements.gold_tree = {
    behavior: behaviors.WALL,
    breakInto: ["gold", "glass_shard"],
    category: "solids",
    color: "#757575",
    density: 1500,
    hardness: 0.5,
    movable: false,
    state: "solid",
    tick: function (pixel) {
        growTree(pixel, "gold", "gold_tree", 0.02)
        doDefaults(pixel)
    },
}

elements.ore_crystal = {
    behavior: behaviors.WALL,
    category: "special",
    color: "#505050",
    density: 917,
    excludeRandom: true,
    movable: false,
    state: "solid",
    tick: function (pixel) {
        if (Math.random() < 0.02) {
            if (isEmpty(pixel.x, pixel.y - 1)) { createPixel("ore_crystal", pixel.x, pixel.y - 1) }
            if (isEmpty(pixel.x, pixel.y + 1)) { createPixel("iron", pixel.x, pixel.y + 1) }
            if (isEmpty(pixel.x + 1, pixel.y + 1)) { createPixel("silver", pixel.x + 1, pixel.y + 1) }
            if (isEmpty(pixel.x + 1, pixel.y)) { createPixel("gold", pixel.x + 1, pixel.y) }
        }
        doDefaults(pixel)
    },
}

elements.aether_crystal = {
    behavior: behaviors.WALL,
    category: "special",
    color: "#505050",
    density: 917,
    excludeRandom: true,
    movable: false,
    state: "solid",
    tick: function (pixel) {
        if (Math.random() < 0.03) {
            if (isEmpty(pixel.x, pixel.y - 1)) { createPixel("aether_crystal", pixel.x, pixel.y - 1) }
            if (isEmpty(pixel.x, pixel.y + 1)) { createPixel("aether_crystal", pixel.x, pixel.y + 1) }
            if (isEmpty(pixel.x + 1, pixel.y + 1)) { createPixel("aether", pixel.x + 1, pixel.y + 1) }
            if (isEmpty(pixel.x + 1, pixel.y)) { createPixel("aether", pixel.x + 1, pixel.y) }
        }
        doDefaults(pixel)
    },
}

elements.aether = {
    behavior: behaviors.WALL,
    category: "solids",
    color: ["#FDF55F", "#FAD64A", "#EAB115", "#DC9710"],
    conduct: 0.9,
    density: 19300,
    hardness: 0.5,
    breakInto: "ichor"
}

elements.dark_aether = {
    category: "special",
    color: ["#0D000F", "#252422", "#302f2c"],
    density: 1900,
    hardness: 0.4,
    hidden: true,
    state: "solid",
    tick: function (pixel) {
        for (let d of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]]) {
            let nx = pixel.x + d[0]
            let ny = pixel.y + d[1]
            if (isEmpty(nx, ny, true)) continue

            let touching = pixelMap[nx]?.[ny]
            if (touching && touching.element !== "dark_aether") {
                changePixel(touching, "dark_aether")
            }
        }
    },
}

elements.bless.reactions.ancient_curse = { elem2: null }
elements.bless.reactions.dark_ice = { elem2: null }
elements.bless.reactions.dark_steam = { elem2: null }
elements.bless.reactions.dark_water = { elem2: null }
elements.bless.reactions.cold_steam = { elem2: "ice" }

elements.ichor.reactions = elements.bless.reactions