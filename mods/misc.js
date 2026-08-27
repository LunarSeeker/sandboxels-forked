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
        "frozen_plant": { elem2: "flesh_plant" },
        "ice": { elem2: "red_ice" },
        "plant": { elem2: "flesh_plant" },
        "pool_water": { elem2: "red_water" },
        "salt_water": { elem2: "red_water" },
        "slush": { elem2: "red_ice" },
        "steam": { elem2: "red_steam" },
        "sugar_water": { elem2: "red_water" },
        "water": { elem2: "red_water" },
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
        "frozen_plant": { elem2: "flesh_plant" },
        "ice": { elem2: "red_ice" },
        "plant": { elem2: "flesh_plant" },
        "pool_water": { elem2: "red_water" },
        "salt_water": { elem2: "red_water" },
        "slush": { elem2: "red_ice" },
        "steam": { elem2: "red_steam" },
        "sugar_water": { elem2: "red_water" },
        "water": { elem2: "red_water" },
    },
    temp: -20,
    tempLow: -100,
    stateLow: "red_steam",
    tempHigh: 0,
    stateHigh: "red_ice",
    category: "liquids",
    state: "liquid",
    density: 997
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
        "frozen_plant": { elem2: "flesh_plant" },
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
    color: "#f3e7db",
    behavior: behaviors.WALL,
    reactions: {
        "beans": { elem1: null, elem2: "stench" },
        "cancer": { elem1: "cancer", chance: 0.01 },
        "fallout": { elem1: "cancer", chance: 0.05 },
        "neutron": { elem1: ["ash", "meat", "rotten_meat", "cooked_meat"], chance: 0.05 },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.5 },
        "plague": { elem1: "plague", chance: 0.1 },
        "radiation": { elem1: "cancer", chance: 0.4 },
        "sun": { elem1: "cooked_meat" },
        "water": { elem2: "bubble", attr2: { "clone": "water" }, chance: 0.001 },
    },
    breakInto: ["blood", "meat", "bone"],
    burn: 10,
    burnInto: "cooked_meat",
    burnTime: 250,
    category: "life",
    density: 1050,
    stateHigh: "cooked_meat",
    stateLow: "frozen_meat",
    temp: 25,
    tempHigh: 150,
    tempLow: -30,
    state: "solid"
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
        "body": { "elem2": "cooked_meat" },
        "head": { "elem2": "cooked_meat" },
        "meat": { "elem2": "cooked_meat" },
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
    color: ["#0000b0", "#0000bb", "#0000ce"],
    density: 50,
    excludeRandom: true,
    state: "liquid",
    viscosity: 0.5,
    reactions: {
        "cancer": { elem2: "cell" },
        "dead_plant": { elem2: "flesh_plant" },
        "dirt": { elem2: "sand" },
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
elements.bless.reactions.flesh_plant = { elem2: "plant" }
elements.bless.reactions.inversium = { elem2: null }
elements.bless.reactions.red_ice = { elem2: "ice" }
elements.bless.reactions.red_steam = { elem2: "steam" }
elements.bless.reactions.red_water = { elem2: "water" }