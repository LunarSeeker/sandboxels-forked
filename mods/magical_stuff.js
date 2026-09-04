function decay(ms) { //Taken from decays.js
    return 1 / (Math.pow(Math.log10(ms * 30 + 1), 2) * 10)
}

elements.dwarf = {
    color: ["#f3e7db", "#f7ead0", "#eadaba", "#d7bd96", "#a07e56", "#825c43", "#604134", "#3a312a"],
    behavior: [
        "XX|XX|XX",
        "M2%0.5|XX|M2%0.5",
        "XX|M1|XX"
    ],
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
        "gold": { elem2: null },
        "light": { stain1: "#825043" },
        "neutron": { elem1: "rotten_meat", chance: 0.02 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.4 },
        "radiation": { elem1: "rotten_meat", chance: 0.1 },
        "sun": { elem1: "cooked_meat" }
    }
}

elements.philosophers_stone = {
    tick: function (pixel) {
        var t = pixelTicks + pixel.x + pixel.y
        pixel.color = "rgb(" + Math.floor(126 * (1 - Math.cos(t * Math.PI / 90 + 4 * Math.PI / 3))) + "," + Math.floor(127 * (1 - Math.cos(t * Math.PI / 90 + 2 * Math.PI / 3))) + "," + Math.floor(127 * (1 - Math.cos(t * Math.PI / 90))) + ")"
        doDefaults(pixel)
    },
    behavior: behaviors.POWDER,
    category: "magic",
    color: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
    darkText: true,
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
    tick: function (pixel) {
        for (var i = 0; i < adjacentCoords.length; i++) {
            var coords = adjacentCoords[i]
            var x = pixel.x + coords[0]
            var y = pixel.y + coords[1]
            if (!isEmpty(x, y, true) && pixelMap[x][y].element === "water" && pixel.start !== pixelTicks) {
                changePixel(pixel, "water")
                return
            }
        }
        var top = mousePos.y - Math.floor(mouseSize / 2)
        var bottom = mousePos.y + Math.floor(mouseSize / 2)
        var left = mousePos.x - Math.floor(mouseSize / 2)
        var right = mousePos.x + Math.floor(mouseSize / 2)
        if (pixel.x > left && pixel.x < right && pixel.y > top && pixel.y < bottom) {
            pixel.color = choose(["#122250", "#000000"])
        }
        else {
            pixel.color = choose(["#ffffff", "#000000"])
        }
        doDefaults(pixel)
    },
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
    category: "magic",
    color: "#ffff00",
    darkText: true,
    density: 100,
    extinguish: true,
    state: "liquid",
    viscosity: 1
}

elements.ichor.reactions = elements.bless.reactions