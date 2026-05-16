elements.egg.color = elements.bead.color

function irradiateNearby(pixel, radius = 1, intensity = 1) {
    // List of elements to explicitly exclude
    const excludedElements = new Set([
        "glowder",
        "uranium",
        "plutonium",
        "acid",
        "plague",
        "dirt",
    ]);

    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            if (dx === 0 && dy === 0) continue;
            let nx = pixel.x + dx;
            let ny = pixel.y + dy;
            let p = getPixel(nx, ny);
            if (p && !elements[p.element].radioactive && !elements[p.element].shielding && !excludedElements.has(p.element) && !elements[p.element].antiRadiation && Math.random() < 0.1 * intensity) {
                p.temp += 15 * intensity;
                p.irradiated = (p.irradiated || 0) + intensity;
                if (p.irradiated > 10 && Math.random() < 0.2) {
                    changePixel(p, "irradiated_matter");
                }
            }
        }
    }
}

function freezeNearby(pixel, radius = 1, intensity = 1) {
    // List of elements to explicitly exclude
    const excludedElements = new Set([
        "water",
        "acid",
        "plague",
    ]);

    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            if (dx === 0 && dy === 0) continue;
            let nx = pixel.x + dx;
            let ny = pixel.y + dy;
            let p = getPixel(nx, ny);
            if (p && !excludedElements.has(p.element) && Math.random() < 0.1 * intensity) {
                p.temp = (p.temp || 0) - intensity;
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
        "water": { elem1: "glowder", elem2: "acid" },
        "dirty_water": { elem1: null, elem2: "acid" }
    },
    density: 1.25,
    radioactive: true,
    tick(pixel) {
        irradiateNearby(pixel, 1, 0.7);
    }
}

// Irradiated matter (weakened)
elements.irradiated_matter = {
    color: "#777733",
    behavior: behaviors.STURDYPOWDER,
    category: "glooby",
    tempHigh: 400,
    state: "solid",
    density: 900,
    hardness: 5,
    reactions: {
        "water": { elem2: "dirty_water" },
    },
    tick: function (pixel) {
        if (Math.random() < 0.15 || pixel.temp < 300) {
            pixel.temp += 1
        }
    },
};

elements.gice = {
    color: ["#62e36f", "#a5d9aa", "#b3c9b6"],
    behavior: behaviors.WALL,
    category: "glooby",
    state: "solid",
    density: 5,
    tick(pixel) {
        freezeNearby(pixel, 5, 0.6);
    }
}

elements.gloob = {
    color: ["#62e36f", "#a5d9aa", "#b3c9b6"],
    behavior: behaviors.LIQUID,
    tempHigh: 200,
    stateHigh: "glowder",
    tempLow: -50,
    stateLow: "gice",
    category: "glooby",
    reactions: {
        "salt": { elem1: "acid", elem2: null },
        "rock": { elem2: "wet_sand", chance: 0.005 },
        "sand": { elem1: "acid", elem2: null },
        "bless": { elem1: "wet_sand", elem2: "bless" },
    },
    state: "liquid",
    density: 900
}

elements.groove = {
    color: ["#e5edc2", "#bec797"],
    behavior: behaviors.WALL,
    category: "glooby",
    state: "solid",
    stateHigh: "molten_groove",
    tempHigh: 2000
};
elements.molten_groove = {
    color: ["#6615d6", "#9651f5", "#d3c3eb"],
    behavior: behaviors.LIQUID,
    category: "glooby",
    state: "liquid",
    stateLow: "groove",
    tempLow: 1999,
    temp: 2500,
    viscosity: 1000,
    density: 1000
};
