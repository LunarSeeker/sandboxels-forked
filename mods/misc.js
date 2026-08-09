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
    color: "#F88379",
    behavior: behaviors.GAS,
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
    temp: -150,
    tempHigh: -100,
    stateHigh: "red_water",
    category: "gases",
    state: "gas",
    density: 0.6,
    hidden: true,
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

elements.arsenic = {
    behavior: behaviors.POWDER,
    category: "powders",
    color: "#478800",
    density: 0.5782,
    state: "solid",
    tempHigh: 614, // From what I can gather, arsenic has a melting point hotter than this, but since it turns into gas at this temp, I'll just go with this.
    stateHigh: "arsenic_gas",
    reactions: {
        "blood": { elem1: null, elem2: "arsenic" },
        "water": { elem1: null, elem2: "dirty_water" },
        "salt_water": { elem1: null, elem2: "dirty_water" },
        "sugar_water": { elem1: null, elem2: "dirty_water" },
        "soap": { elem1: null },
        "plant": { elem1: null, elem2: "dead_plant" },
        "evergreen": { elem1: null, elem2: "dead_plant" },
        "cactus": { elem1: null, elem2: "dead_plant" },
        "grass": { elem1: null, elem2: "dead_plant" },
        "vine": { elem1: null, elem2: "dead_plant" },
        "algae": { elem1: null, elem2: null },
        "kelp": { elem1: null, elem2: "dirty_water" },
        "coral": { elem1: null, elem2: "dirty_water" },
        "mushroom_spore": { elem1: null, elem2: null },
        "lichen": { elem1: null, elem2: null },
        "yeast": { elem1: null, elem2: null },
        "rat": { elem2: "rotten_meat" },
        "frog": { elem2: "slime" },
        "tadpole": { elem2: "slime" },
        "fish": { elem2: "rotten_meat" },
        "bird": { elem2: "rotten_meat" },
        "head": { elem2: "rotten_meat" },
        "body": { elem2: "rotten_meat" },
        "homunculus": { elem2: "rotten_meat" },
        "ant": { elem1: null, elem2: "dead_bug" },
        "worm": { elem1: null, elem2: "dead_bug" },
        "fly": { elem1: null, elem2: "dead_bug" },
        "firefly": { elem1: null, elem2: "dead_bug" },
        "bee": { elem1: null, elem2: "dead_bug" },
        "stink_bug": { elem1: null, elem2: "dead_bug" },
        "termite": { elem1: null, elem2: "dead_bug" },
        "spider": { elem1: null, elem2: "dead_bug" },
        "flea": { elem1: null, elem2: "dead_bug" },
        "slug": { elem1: null, elem2: "slime" },
        "snail": { elem1: null, elem2: "limestone" },
        "flower_seed": { elem1: null, elem2: "dead_plant" },
        "pistil": { elem1: null, elem2: "dead_plant" },
        "petal": { elem1: null, elem2: "dead_plant" },
        "grass_seed": { elem1: null, elem2: "dead_plant" },
        "meat": { elem2: "rotten_meat" },
        "cheese": { elem1: null, elem2: "rotten_cheese" },
        "cheese_powder": { elem1: null, elem2: "rotten_cheese" },
        "mushroom_cap": { elem1: null, elem2: null, chance: 0.01 },
        "mushroom_gill": { elem1: null, elem2: null, chance: 0.01 },
        "mushroom_stalk": { elem1: null, elem2: null, chance: 0.01 },
        "pollen": { elem2: null, chance: 0.01 },
        "mushroom_spore": { elem1: null, elem2: null, chance: 0.1 },
        "head": { elem2: "rotten_meat" },
        "body": { elem2: "rotten_meat" },
        "hair": { elem1: null, elem2: null, chance: 0.01 }
    },
}

elements.arsenic_gas = {
    behavior: behaviors.GAS,
    category: "gases",
    color: "#478800",
    density: 0.5782,
    state: "gas",
    temp: 700,
    tempLow: 613,
    stateLow: "arsenic",
    reactions: {
        "blood": { elem1: null, elem2: "arsenic" },
        "water": { elem1: null, elem2: "dirty_water" },
        "salt_water": { elem1: null, elem2: "dirty_water" },
        "sugar_water": { elem1: null, elem2: "dirty_water" },
        "plant": { elem1: null, elem2: "dead_plant" },
        "evergreen": { elem1: null, elem2: "dead_plant" },
        "cactus": { elem1: null, elem2: "dead_plant" },
        "grass": { elem1: null, elem2: "dead_plant" },
        "vine": { elem1: null, elem2: "dead_plant" },
        "algae": { elem1: null, elem2: null },
        "kelp": { elem1: null, elem2: "dirty_water" },
        "coral": { elem1: null, elem2: "dirty_water" },
        "mushroom_spore": { elem1: null, elem2: null },
        "lichen": { elem1: null, elem2: null },
        "yeast": { elem1: null, elem2: null },
        "rat": { elem2: "rotten_meat" },
        "frog": { elem2: "slime" },
        "tadpole": { elem2: "slime" },
        "fish": { elem2: "rotten_meat" },
        "bird": { elem2: "rotten_meat" },
        "head": { elem2: "rotten_meat" },
        "body": { elem2: "rotten_meat" },
        "homunculus": { elem2: "rotten_meat" },
        "ant": { elem1: null, elem2: "dead_bug" },
        "worm": { elem1: null, elem2: "dead_bug" },
        "fly": { elem1: null, elem2: "dead_bug" },
        "firefly": { elem1: null, elem2: "dead_bug" },
        "bee": { elem1: null, elem2: "dead_bug" },
        "stink_bug": { elem1: null, elem2: "dead_bug" },
        "termite": { elem1: null, elem2: "dead_bug" },
        "spider": { elem1: null, elem2: "dead_bug" },
        "flea": { elem1: null, elem2: "dead_bug" },
        "slug": { elem1: null, elem2: "slime" },
        "snail": { elem1: null, elem2: "limestone" },
        "flower_seed": { elem1: null, elem2: "dead_plant" },
        "pistil": { elem1: null, elem2: "dead_plant" },
        "petal": { elem1: null, elem2: "dead_plant" },
        "grass_seed": { elem1: null, elem2: "dead_plant" },
        "meat": { elem2: "rotten_meat" },
        "cheese": { elem1: null, elem2: "rotten_cheese" },
        "cheese_powder": { elem1: null, elem2: "rotten_cheese" },
        "mushroom_cap": { elem1: null, elem2: null, chance: 0.01 },
        "mushroom_gill": { elem1: null, elem2: null, chance: 0.01 },
        "mushroom_stalk": { elem1: null, elem2: null, chance: 0.01 },
        "pollen": { elem2: null, chance: 0.01 },
        "mushroom_spore": { elem1: null, elem2: null, chance: 0.1 },
        "head": { elem2: "rotten_meat" },
        "body": { elem2: "rotten_meat" },
        "hair": { elem1: null, elem2: null, chance: 0.01 }
    },
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
        "dirty_water": { elem1: null, elem2: "red_water" },
        "ice": { elem1: null, elem2: "red_ice" },
        "magma": { elem1: null, elem2: "water" },
        "pool_water": { elem1: null, elem2: "red_water" },
        "salt_water": { elem1: null, elem2: "red_water" },
        "slush": { elem1: null, elem2: "red_ice" },
        "steam": { elem1: null, elem2: "red_steam" },
        "sugar_water": { elem1: null, elem2: "red_water" },
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

elements.bless.reactions.arsenic = { elem2: null }
elements.bless.reactions.arsenic_gas = { elem2: null }
elements.bless.reactions.blue_goo = { elem2: "water" }
elements.bless.reactions.inversium = { elem2: null }
elements.bless.reactions.red_ice = { elem2: "water" }
elements.bless.reactions.red_steam = { elem2: "water" }
elements.bless.reactions.red_water = { elem2: "water" }
