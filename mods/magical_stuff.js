dependOn("mega_library.js", function () {
    dwarfcrawlThru = [...eLists.CRAWLTHRU, ...eLists.SOIL, "granite", "ice", "snow", "plant", "concrete"]

    let magic_textures = {
        p_stone: [
            "sssggg",
            "sssggg",
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
            "cancer": { elem2: null },
            "dirty_water": { elem2: "water" },
            "electrum": { elem1: "silver", elem2: "gold" },
            "gallium": { elem2: "silver" },
            "glitter": { elem2: "diamond" },
            "iron": { elem2: "steel" },
            "lead": { elem2: "gold" },
            "mercury": { elem2: "silver" },
            "metal_scrap": { elem2: "steel" },
            "nickel": { elem2: "invar" },
            "oil": { elem2: "gold_coin" },
            "oxidized_copper": { elem2: "copper" },
            "poison": { elem2: "vaccine" },
            "purple_gold": { elem2: "gold" },
            "pyrite": { elem2: "gold" },
            "rose_gold": { elem2: "gold" },
            "rust": { elem2: "steel" },
            "sand": { elem2: "dirt" },
            "solid_mercury": { elem2: "silver" },
            "static": { elem2: "rainbow" },
            "sterling": { elem2: "silver" },
            "tin": { elem2: "brass" },
            "zinc": { elem2: "bronze" },
        }
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
            if (pixel.temp > -100) {
                pixel.temp = clamp(pixel.temp, 15, 400)
                pixelTempCheck(pixel)
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

    elements.bless.reactions.ancient_curse = { elem2: null }
    elements.bless.reactions.cold_steam = { elem2: "ice" }
    elements.bless.reactions.hot_ice = { elem2: "steam" }
    elements.bless.reactions.mirror_water = { elem2: "water" }

    elements.ichor.reactions = elements.bless.reactions
})
