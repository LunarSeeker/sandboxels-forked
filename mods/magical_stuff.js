function decay(ms) { //Taken from decays.js
    return 1 / (Math.pow(Math.log10(ms * 30 + 1), 2) * 10)
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
        "light": { stain1: "#825043" },
        "neutron": { elem1: "rotten_meat", chance: 0.02 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.4 },
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

elements.philosophers_stone = {
    behavior: behaviors.POWDER,
    category: "magic",
    color: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
    density: 1,
    excludeRandom: true,
    state: "solid",
    reactions: {
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
    color: ["#ff0000", "#ff8800", "#0000ff", "#ff00ff"],
    density: 1,
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
        "blood": { elem1: ["dwarf", "homunculus"], elem2: null },
        "cancer": { elem1: ["poison", "plague"], elem2: null },
        "clay": { elem1: ["dwarf", "homunculus"], elem2: "cell" },
        "dirt": { elem1: ["algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], elem2: null },
        "grass": { elem1: ["potato", "bee", "plant", "ant"], elem2: null },
        "light": { elem1: ["algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], elem2: null },
        "oxygen": { elem1: ["dwarf", "homunculus", "algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], elem2: null },
        "poison": { elem1: ["cancer", "plague"], elem2: null },
    }
}

elements.ichor = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    color: "#ffff00",
    density: 100,
    state: "liquid",
    viscosity: 1,
    reactions: {
        "acid_cloud": { elem2: "rain_cloud" },
        "acid_gas": { elem2: "hydrogen" },
        "acid": { elem2: "hydrogen" },
        "ammonia": { elem2: null },
        "antibody": { elem2: ["antibody", null] },
        "antimatter": { elem2: null },
        "armageddon": { elem2: null },
        "ash": { elem2: "ichor" },
        "bleach": { elem2: null },
        "blood_ice": { elem2: "ichor" },
        "blood": { elem2: "ichor" },
        "bone_marrow": { elem2: "bone" },
        "brick_rubble": { elem2: "brick" },
        "cancer": { elem2: "cell" },
        "carbon_dioxide": { elem2: "oxygen" },
        "clay_shard": { elem2: "baked_clay" },
        "color_smoke": { elem2: null },
        "copper": { elem2: "gold" },
        "cyanide_gas": { elem2: null },
        "cyanide": { elem2: null },
        "dead_bug": { elem2: "bee" },
        "dead_plant": { elem2: "plant" },
        "dioxin": { elem2: null },
        "dirt": { elem1: "grass", oneway: true },
        "dirty_water": { elem2: "water" },
        "dust": { elem2: null },
        "ember": { elem2: null },
        "fallout": { elem2: null },
        "filler": { elem2: null },
        "fire_cloud": { elem2: "cloud" },
        "fire": { elem2: null },
        "fireball": { elem2: "ball" },
        "flashbang": { elem2: "metal_scrap" },
        "flea": { elem2: "dwarf" },
        "fly": { elem2: "bee" },
        "fragrance": { elem2: null },
        "frozen_frog": { elem2: "frog" },
        "frozen_worm": { elem2: "worm" },
        "fw_ember": { elem2: null },
        "glass_shard": { elem2: "glass" },
        "gray_goo": { elem2: "malware" },
        "grease": { elem2: null },
        "greek_fire": { elem2: "smoke" },
        "grenade": { elem2: "metal_scrap" },
        "gunpowder": { elem2: "charcoal" },
        "ice_nine": { elem2: "ice" },
        "infection_ice": { elem2: "antibody_ice" },
        "infection": { elem2: "antibody" },
        "lattice": { elem2: null },
        "lead": { elem2: "gold" },
        "liquid_ammonia": { elem2: null },
        "liquid_stench": { elem2: null },
        "magma": { elem2: "rock" },
        "meat": { elem2: "cooked_meat", temp: 100 },
        "mercury_gas": { elem2: null },
        "mercury": { elem2: null },
        "midas_touch": { elem2: null },
        "molten_ash": { elem2: null },
        "molten_lead": { elem2: "molten_gold" },
        "molten_thermite": { elem2: "rock" },
        "molten_uranium": { elem2: "magma" },
        "nitro": { elem2: null },
        "oil": { elem2: "diamond" },
        "oxidized_copper": { elem2: "gold" },
        "plague": { elem2: null },
        "poison_gas": { elem2: "antidote" },
        "poison_ice": { elem2: "antidote" },
        "poison": { elem2: "antidote" },
        "porcelain_shard": { elem2: "porcelain" },
        "pyrocumulus": { elem2: null },
        "rad_cloud": { elem2: "rain_cloud" },
        "rad_glass": { elem2: "glass" },
        "rad_shard": { elem2: "glass_shard" },
        "rad_steam": { elem2: "steam" },
        "radiation": { elem2: "flash" },
        "rat": { elem2: "dwarf" },
        "rotten_cheese": { elem2: "cheese" },
        "rotten_meat": { elem2: "cooked_meat", temp: 100 },
        "ruins": { elem2: "rock_wall" },
        "rust": { elem2: "iron" },
        "smog": { elem2: "cloud" },
        "smoke_grenade": { elem2: "metal_scrap" },
        "smoke": { elem2: null },
        "solid_mercury": { elem2: null },
        "spray_paint": { elem2: null },
        "static": { elem2: "rainbow" },
        "stench": { elem2: null },
        "strange_matter": { elem2: null },
        "uranium": { elem2: "rock" },
        "virus": { func: function (_pixel1, pixel2) { pixel2.heal = true } },
        "warp": { elem2: null },
        "wood": { func: function (_pixel1, pixel2) { if (pixel2.wc) { changePixel(pixel2, "tree_branch") } } }
    },
}