elements.egg.color = elements.bead.color

function irradiateNearby(pixel, radius = 1, intensity = 1) {
    // List of elements to explicitly exclude
    const excludedElements = new Set([
        "deuterium",
        "tritium",
        "glowder",
        "uranium",
        "plutonium",
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
    radioactivity: 0.3,
    tick(pixel) {
        irradiateNearby(pixel, 1, 0.7);
    }
}

// Irradiated matter (weakened)
elements.irradiated_matter = {
    color: "#777733",
    behavior: behaviors.POWDER,
    category: "glooby",
    tempHigh: 400,
    state: "solid",
    density: 900,
    burn: 80,
    burnTime: 250,
    hardness: 5
};
