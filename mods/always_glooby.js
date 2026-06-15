function clamp(x, min, max) {
    return Math.max(min, Math.min(x, max))
}

function irradiateNearby(pixel, radius = 1, intensity = 1) {
    // List of elements to explicitly exclude
    const excludedElements = new Set([
        "acid",
        "deuterium",
        "dirt",
        "gloob",
        "glowder",
        "groove",
        "plague",
        "plutonium",
        "super_acid",
        "uranium",
    ])

    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            if (dx === 0 && dy === 0) continue
            let nx = pixel.x + dx
            let ny = pixel.y + dy
            let p = getPixel(nx, ny)
            if (p && !elements[p.element].radioactive && !elements[p.element].shielding && !excludedElements.has(p.element) && !elements[p.element].antiRadiation && Math.random() < 0.1 * intensity) {
                p.temp += 15 * intensity
                p.irradiated = (p.irradiated || 0) + intensity
                if (p.irradiated > 10 && Math.random() < 0.2) {
                    changePixel(p, "irradiated_matter")
                }
            }
        }
    }
}

elements.glowder = {
    name: "Glowder",
    color: ["#62e36f", "#a5d9aa", "#b3c9b6"],
    behavior: behaviors.POWDER,
    category: "glooby",
    state: "solid",
    reactions: {
        "water": { elem1: "glowder", elem2: "dirt" },
        "dirty_water": { elem1: null, elem2: "dirt" }
    },
    density: 100,
    radioactive: true,
    tick: function (pixel) {
        irradiateNearby(pixel, 4, 0.5)
    }
}

// Irradiated matter (weakened)
elements.irradiated_matter = {
    behavior: behaviors.STURDYPOWDER,
    category: "powders",
    color: "#777733",
    density: 900,
    hardness: 5,
    state: "solid",
    tempHigh: 400,
    reactions: {
        "water": { elem2: "glolt" },
    },
    tick: function (pixel) {
        if (Math.random() < 0.1 || pixel.temp < 300) {
            pixel.temp += 1
        }
    },
}

elements.gloob = {
    behavior: behaviors.LIQUID,
    breakInto: ["glowder", "water"],
    category: "glooby",
    color: ["#62e36f", "#a5d9aa", "#b3c9b6"],
    density: 900,
    state: "liquid",
    tempHigh: 3000,
    stateHigh: "glowder",
    viscosity: 10,
    reactions: {
        "salt": { elem1: "dirt", elem2: null },
        "rock": { elem2: "dirt", chance: 0.05 },
        "sand": { elem1: "dirt", elem2: null },
        "bless": { elem1: "dirt", elem2: "bless" },
    },
}

elements.groove = {
    behavior: behaviors.WALL,
    category: "glooby",
    color: ["#e5edc2", "#bec797"],
    state: "solid",
    stateHigh: "glolt",
    tempHigh: 2000,
    breakInto: ["water", "bless"],
    tick: function (pixel) {
        //if (pixel.temp < 100) {
        pixel.temp = clamp(pixel.temp, 0, 20)
        //}
    }
}
elements.glolt = {
    behavior: behaviors.LIQUID,
    category: "glooby",
    color: ["#6615d6", "#9651f5", "#d3c3eb"],
    state: "liquid",
    stateLow: "groove",
    tempLow: 1999,
    temp: 2500,
    density: 500,
    viscosity: 1000
}

elements.test_thingie = {
    behavior: behaviors.LIQUID,
    category: "liquids",
    color: "#777733",
    density: 900,
    hardness: 5,
    state: "liquid",
    viscosity: 100,
    tick: function (pixel) {
        if (Math.random() < 0.1 || pixel.temp < 101) {
            pixel.temp += 1
        }
    },
}
