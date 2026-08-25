function bluegooFunc(pixel) {
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue
            let p = getPixel((pixel.x + dx), (pixel.y + dy))
            if (p && elements[p.element].state === "liquid" && p.element !== "blue_goo") {
                changePixel(p, "blue_goo")
            }
        }
    }
}

elements.red_ice = {
    color: "#D2042D",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|M1|XX",
    ],
    reactions: {
        "dirty_water": { elem2: "red_water" },
        "ice": { elem2: "red_ice" },
        "pool_water": { elem2: "red_water" },
        "salt_water": { elem2: "red_water" },
        "slush": { elem2: "red_ice" },
        "sugar_water": { elem2: "red_water" },
        "water": { elem2: "red_water" },
        "steam": { elem2: "red_steam" },
    },
    tempLow: 0,
    stateLow: "red_water",
    category: "solids",
    state: "solid",
    density: 917,
}

elements.red_water = {
    color: "#880808",
    behavior: behaviors.LIQUID,
    reactions: {
        "dirty_water": { elem2: "red_water" },
        "ice": { elem2: "red_ice" },
        "pool_water": { elem2: "red_water" },
        "salt_water": { elem2: "red_water" },
        "slush": { elem2: "red_ice" },
        "sugar_water": { elem2: "red_water" },
        "water": { elem2: "red_water" },
        "steam": { elem2: "red_steam" },
    },
    temp: -20,
    tempLow: -100,
    stateLow: "red_steam",
    tempHigh: 0,
    stateHigh: "red_ice",
    category: "liquids",
    state: "liquid",
    density: 997,
    temp: -10
}

elements.red_steam = {
    behavior: behaviors.GAS,
    category: "gases",
    color: "#F88379",
    density: 0.6,
    extinguish: true,
    hidden: true,
    state: "gas",
    stateHigh: "red_water",
    temp: -150,
    tempHigh: -100,
    reactions: {
        "dirty_water": { elem2: "red_water" },
        "ice": { elem2: "red_ice" },
        "pool_water": { elem2: "red_water" },
        "salt_water": { elem2: "red_water" },
        "slush": { elem2: "red_ice" },
        "sugar_water": { elem2: "red_water" },
        "water": { elem2: "red_water" },
        "steam": { elem2: "red_steam" },
    }
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

elements.burn_juice = {
    color: "#da1a1a",
    behavior: behaviors.LIQUID,
    reactions: {
        "meat": { "elem2": "cooked_meat" },
        "head": { "elem2": "cooked_meat" },
        "body": { "elem2": "cooked_meat" },
    },
    burn: 100,
    burnTime: 2,
    category: "liquids",
    density: 792,
    stain: -0.25,
    state: "liquid",
    viscosity: 1.15,
}

elements.inversium = {
    behavior: behaviors.LIQUID,
    category: "special",
    color: ["#0000b0", "#0000bb", "#0000ce"],
    density: 50,
    excludeRandom: true,
    state: "liquid",
    viscosity: 0.5,
    reactions: {
        "cancer": { elem1: null, elem2: "cell" },
        "dirt": { elem1: null, elem2: "sand" },
        "dirty_water": { elem1: null, elem2: "red_water" },
        "ice": { elem1: null, elem2: "red_ice" },
        "magma": { elem1: null, elem2: "water" },
        "pool_water": { elem1: null, elem2: "red_water" },
        "salt_water": { elem1: null, elem2: "sugar_water" },
        "salt": { elem1: null, elem2: "sugar" },
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
    state: "liquid",
    viscosity: 1.05,
    tick: function (pixel) {
        bluegooFunc(pixel)
    },
}

elements.heavy_water = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    color: "#2167ff",
    conduct: 0.02,
    density: 1.1056,
    stain: -0.5,
    state: "liquid",
    viscosity: 1.2467,
    extinguish: true
}

elements.deuterium = {
    behavior: behaviors.GAS,
    category: "gases",
    color: "#ace0e6",
    density: 0.18,
    state: "gas",
    reactions: {
        "oxygen": { elem1: "heavy_water", elem2: null },
    },
}

elements.bless.reactions.blue_goo = { elem2: "water" }
elements.bless.reactions.inversium = { elem2: null }
elements.bless.reactions.red_ice = { elem2: "ice" }
elements.bless.reactions.red_steam = { elem2: "steam" }
elements.bless.reactions.red_water = { elem2: "water" }