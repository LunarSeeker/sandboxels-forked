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
    //stain: -0.25,
    tick: function (pixel) {
        for (let dx = -2; dx <= 2; dx++) {
            for (let dy = -2; dy <= 2; dy++) {
                if (dx === 0 && dy === 0) continue;
                let p = getPixel((pixel.x + dx), (pixel.y + dy));
                if (p && !excludedElements.has(p.element) && Math.random() < 0.2 && p.state !== "gas") {
                    changePixel(p, "cheese");
                }
            }
        }
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
