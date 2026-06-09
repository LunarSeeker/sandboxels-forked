elements.gleeb = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    category: "glooby",
    reactions: {
        "sand": { elem1: "gleeb", elem2: null }
    },

    tick: function (pixel) {
        if (Math.random() > 0.03) return;

        const neighbors = [
            { x: pixel.x, y: pixel.y - 1 }, // up
            { x: pixel.x, y: pixel.y + 1 }, // down
            { x: pixel.x - 1, y: pixel.y }, // left
            { x: pixel.x + 1, y: pixel.y }, // right
        ];

        for (const n of neighbors) {
            const neighbor = pixelMap[n.x]?.[n.y];
            if (neighbor && neighbor.element === "sand") {
                changePixel(neighbor, "gleeb");
                return;
            }
        }
    }
}

elements.glorp = {
    color: "#f0bb00",
    behavior: [
        "SW:glorp_water%15|SW:glorp_water%15|XX AND SW:glorp_water%15",
        "M2 AND SW:glorp_water%15|XX|M2 AND SW:glorp_water%15",
        "M1 AND SW:glorp_water%15|M1 AND SW:glorp_water%15|M1 AND SW:glorp_water%15",
    ],
    density: 997,
    reactions: {
        "water": { "elem1": "glorp_water", "elem2": "glorp_water", "chance": 0.7 },
        "dirt": { "elem1": null, "elem2": "cheese" },
        "mud": { "elem1": "glorp_water", "elem2": "cheese", "chance": (1 / 3) },
        "sand": { "elem1": null, "elem2": "cheese" },
        "wet_sand": { "elem1": "glorp_water", "elem2": "cheese", "chance": (1 / 3) },
        "snow": { "elem1": null, "elem2": "cheese" },
        "blood": { "elem1": "infection", "elem2": "infection" },
    },
    viscosity: 1,
    category: "glooby",
    state: "liquid"
}

elements.glorp_water = {
    color: "#cae695",
    behavior: [
        "SW:glorp%5|SW:glorp%5|SW:glorp%5",
        "M2 AND SW:glorp%5|XX|M2 AND SW:glorp%5",
        "M1 AND SW:glorp%5|M1 AND SW:glorp%5|M1 AND SW:glorp%5",
    ],
    reactions: {
        "water": { "elem1": "glorp_water", "elem2": "glorp_water", "chance": 0.7 },
        "dirt": { "elem1": "water", "elem2": "cheese" },
        "sand": { "elem1": "water", "elem2": "cheese" },
        "snow": { "elem1": null, "elem2": "cheese" },
        "blood": { "elem1": "infection", "elem2": "infection" },
    },
    category: "glooby",
    conduct: 0.05,
    density: 900,
    stain: 0.25,
    state: "liquid",
    viscosity: 1.5,
}

elements.glorp_bomb = {
    color: "#ffea4d",
    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "M2|M1 AND EX:12>glorp|M2",
    ],
    category: "weapons",
    state: "solid",
    density: 1300,
}

elements.bless.reactions.gleeb = { elem2: null }
elements.bless.reactions.glorp = { elem2: null }
elements.bless.reactions.glorp_water = { elem2: null }