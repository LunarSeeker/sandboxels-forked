//Inversium Stuff

elements.red_ice = {
    behavior: behaviors.POWDER,
    category: "powders",
    color: "#D2042D",
    density: 917,
    excludeRandom: true,
    hazard: true,
    state: "solid",
    stateLow: "red_water",
    tempLow: 0,
    ignore: [
        "bone",
        "fish",
        "flesh_plant",
        "grass",
        "hazmat_body",
        "hazmat_head",
        "plant",
        "red_fish",
    ],
    tick: function (pixel) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue
                let p = getPixel((pixel.x + dx), (pixel.y + dy))
                if (p && elements[p.element].state !== "gas" && elements.red_ice.ignore.indexOf(p.element) === -1 && elements[p.element].category === "life") {
                    changePixel(p, "red_ice")
                }
            }
        }
    },
    reactions: {
        "ant_wall": { elem2: "red_water" },
        "antibody_ice": { elem2: "red_water" },
        "antibody": { elem2: "red_water" },
        "blood_ice": { elem2: "red_water" },
        "blood": { elem2: "red_water" },
        "cloud": { elem2: "red_steam", temp: -150 },
        "cream": { elem2: "red_water" },
        "dirty_ice": { elem2: "red_ice", temp: 30 },
        "dirty_water": { elem2: "red_water", temp: -30 },
        "fiber": { elem2: "red_water" },
        "fish": { elem2: "red_fish", temp: -20 },
        "foam": { elem2: "red_water" },
        "grape": { elem2: "red_water" },
        "hair": { elem2: "red_water" },
        "ice_cream": { elem2: "red_water" },
        "ice_nine": { elem2: "red_water" },
        "ice": { elem2: "red_ice", temp: 30 },
        "infection_ice": { elem2: "red_water" },
        "infection": { elem2: "red_water" },
        "iron": { elem2: "rust", chance: 0.05 },
        "juice": { elem2: "red_water" },
        "lettuce": { elem2: "red_water" },
        "meat": { elem2: "red_water" },
        "packed_snow": { elem2: "red_water" },
        "pickle": { elem2: "red_water" },
        "plant": { elem2: "flesh_plant", temp: -20 },
        "pool_water": { elem2: "red_water", temp: -30 },
        "rain_cloud": { elem2: "red_steam", temp: -150 },
        "rime": { elem2: "red_water" },
        "rotten_meat": { elem2: "red_water" },
        "salt_water": { elem2: "red_water", temp: -30 },
        "seltzer": { elem2: "red_water" },
        "skin": { elem2: "red_water" },
        "slush": { elem2: "red_water" },
        "snow": { elem2: "red_water" },
        "steam": { elem2: "red_steam", temp: -150 },
        "sugar_water": { elem2: "red_water", temp: -30 },
        "tea": { elem2: "red_water" },
        "tomato": { elem2: "red_water" },
        "water": { elem2: "red_water", temp: -30 },
        "yolk": { elem2: "red_water" },
    },
}

elements.red_water = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    color: "#ff2100",
    conduct: 0.02,
    density: 997,
    excludeRandom: true,
    extinguish: true,
    hazard: true,
    stain: -0.5,
    state: "liquid",
    stateHigh: "red_ice",
    stateLow: "red_steam",
    temp: -20,
    tempHigh: 0,
    tempLow: -100,
    tick: function (pixel) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue
                let p = getPixel((pixel.x + dx), (pixel.y + dy))
                if (p && elements[p.element].state !== "gas" && elements.red_ice.ignore.indexOf(p.element) === -1 && elements[p.element].category === "life") {
                    changePixel(p, "red_water")
                }
            }
        }
    },
}

elements.red_steam = {
    behavior: behaviors.GAS,
    category: "gases",
    color: "#F88379",
    conduct: 0.002,
    density: 0.6,
    excludeRandom: true,
    extinguish: true,
    stain: -0.05,
    state: "gas",
    stateHigh: "red_water",
    temp: -150,
    tempHigh: -100
}

elements.red_steam.reactions = elements.red_ice.reactions
elements.red_water.reactions = elements.red_ice.reactions

elements.red_water.reactions.limestone = { elem2: "wet_sand", chance: 0.00035 }
elements.red_water.reactions.mudstone = { elem2: "mud", chance: 0.00035 }
elements.red_water.reactions.rock = { elem2: "wet_sand", chance: 0.00035 }
elements.red_water.reactions.ruins = { elem2: "rock", chance: 0.00035 }
elements.red_water.reactions.tuff = { elem2: "wet_sand", color2: "#bb6a19", chance: 0.00035 }

elements.flesh_plant = {
    behavior: behaviors.WALL,
    breakInto: "meat",
    burn: 10,
    burnInto: "cooked_meat",
    burnTime: 250,
    category: "life",
    color: "#8fbf00",
    density: 1050,
    forceSaveColor: true,
    renderer: renderPresets.PLANTCHAR,
    state: "solid",
    stateHigh: "meat",
    stateLow: "red_steam",
    temp: -20,
    tempHigh: 20,
    tempLow: -100,
    reactions: {
        "vinegar": { elem1: "red_ice", elem2: null, chance: 0.035 },
        "baking_soda": { elem1: "red_ice", elem2: null, chance: 0.01 },
        "bleach": { elem1: "red_ice", elem2: null, chance: 0.05 },
        "alcohol": { elem1: "red_ice", elem2: null, chance: 0.035 },
        "mercury": { elem1: "red_ice", elem2: null, chance: 0.01 },
        "sugar": { elem1: "red_ice", elem2: null, chance: 0.001 },
        "stench": { elem2: null, chance: 0.25 },
        "chlorine": { stain1: "#a2bf00" },
        "oxygen": { elem2: "carbon_dioxide", chance: 0.5 }
    },
}

elements.red_fish = {
    alias: "Otherworldly Fish",
    color: "#ac505f",
    behavior: [
        "XX|M2%5|SW:red_ice,red_water,primordial_soup%14",
        "XX|FX%0.5|BO",
        "M2|M1|M2 AND SW:red_ice,red_water,primordial_soup%5"
    ],
    breakInto: "red_water",
    burn: 20,
    burnTime: 200,
    category: "life",
    conduct: 0.2,
    density: 1080,
    eggColor: ["#211316", "#2C1A1D", "#503734"],
    foodNeed: 20,
    state: "solid",
    stateHigh: "red_ice",
    stateHighColor: "#dbe4b9",
    stateLow: ["red_steam", "red_steam", "red_steam", "red_steam"],
    temp: -20,
    tempHigh: 20,
    tempLow: -120,
    reactions: {
        "fly": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "firefly": { elem2: null, chance: 0.3, func: behaviors.FEEDPIXEL },
        "bee": { elem2: null, chance: 0.05, func: behaviors.FEEDPIXEL },
        "worm": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "ant": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
        "stink_bug": { elem2: "stench", chance: 0.025, func: behaviors.FEEDPIXEL },
        "dead_bug": { elem2: null, chance: 0.04, func: behaviors.FEEDPIXEL },
        "lichen": { elem2: null, chance: 0.04, func: behaviors.FEEDPIXEL },
        "termite": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
        "flea": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
        "mushroom_cap": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
        "mushroom_gill": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
        "seeds": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "flower_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "wheat_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "corn_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "corn": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "potato_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "grass_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "crumb": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "pumpkin": { elem2: null, chance: 0.025, func: behaviors.FEEDPIXEL },
        "pumpkin_seed": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "rice": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "coffee_bean": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "coffee_ground": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "nut": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "nut_meat": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "nut_butter": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "jelly": { elem2: null, chance: 0.25, func: behaviors.FEEDPIXEL },
        "spider": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
        "web": { elem2: null, chance: 0.1, func: behaviors.FEEDPIXEL },
        "plague": { elem1: "plague", chance: 0.05 },
        "carbon_dioxide": { elem2: "oxygen", chance: 0.5 },
    },
}

elements.inversium = {
    behavior: behaviors.LIQUID,
    category: "special",
    color: "#0000ff",
    density: 50,
    excludeRandom: true,
    //renderer: renderPresets.WOODCHAR,
    state: "liquid",
    viscosity: 0.5,
    reactions: {
        "dirty_water": { elem1: null, elem2: "red_water", temp: -35 },
        "gold": { elem1: null, elem2: "lead" },
        "ice": { elem1: null, elem2: "red_ice", temp: 30 },
        "pool_water": { elem1: null, elem2: "red_water", temp: -25 },
        "salt_water": { elem1: null, elem2: "red_water", temp: -25 },
        "salt": { elem2: "sugar" },
        "slush": { elem1: null, elem2: "red_ice", temp: 25 },
        "snow": { elem1: null, elem2: "red_ice" },
        "sugar_water": { elem1: null, elem2: "red_water", temp: -25 },
        "steam": { elem1: null, elem2: "red_steam", temp: -150 },
        "water": { elem1: null, elem2: "red_water", temp: -30 },
    },
}

//

elements.blue_goo = {
    behavior: behaviors.LIQUID,
    category: "special",
    color: ["#b0e9f7", "#0008ff", "#09c8f7"],
    density: 0.75,
    excludeRandom: true,
    hazard: true,
    ignore: [
        "blue_goo",
        "inversium",
        "midas_touch",
        "strange_matter",
        "water",
        "time"
    ],
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
    viscosity: 1050,
    reactions: {
        "ant": { elem1: null, elem2: "dead_bug" },
        "bee": { elem1: null, elem2: "dead_bug" },
        "body": { elem1: null, elem2: "rotten_meat" },
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

elements.bless.reactions.blue_goo = { elem2: "water" }
elements.bless.reactions.flesh_plant = { elem2: "plant", temp: 20 }
elements.bless.reactions.inversium = { elem2: null }
elements.bless.reactions.red_fish = { elem2: "fish", temp: 20 }
elements.bless.reactions.red_ice = { elem2: "ice", temp: -20 }
elements.bless.reactions.red_steam = { elem2: "steam", temp: 100 }
elements.bless.reactions.red_water = { elem2: "water", temp: 20 }
