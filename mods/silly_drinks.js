function cheesifyNearby(pixel, radius = 1, intensity = 1) {
    // List of elements to explicitly exclude
    const excludedElements = new Set([
        "water",
        "ice",
        "algae",
        "coral",
        "dirt",
        "grass",
        "plant",
        "irradiated_matter",
        "gloob",
        "glowder",
        "glolt",
        "groove",
        "melted_cheese",
        "cheese",
        "gleeb",
        "glorp",
    ]);

    for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
            if (dx === 0 && dy === 0) continue;
            let nx = pixel.x + dx;
            let ny = pixel.y + dy;
            let p = getPixel(nx, ny);
            if (p && !excludedElements.has(p.element) && Math.random() < 0.1 * intensity) {
                if (Math.random() < 0.6) {
                    changePixel(p, "cheese");
                }
            }
        }
    }
}

elements.gleeb = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
        "virus": { "elem2": null },
        "plague": { "elem2": null },
        "smoke": { "elem2": null }
    },
    viscosity: 2,
    category: "liquids",
    state: "liquid",
    density: 800,
    tick(pixel) {
        cheesifyNearby(pixel, 4, 0.5);
    }
}

elements.glorp = {
    color: "#f0bb00",
    behavior: behaviors.LIQUID,
    reactions: {
        "head": { "elem2": null },
        "body": { "elem2": "cheese", "chance": 0.1 },
    },
    viscosity: 0.5,
    category: "liquids",
    state: "liquid",
    density: 300,
    stain: -0.25,
}
