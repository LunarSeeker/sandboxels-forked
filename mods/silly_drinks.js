elements.gleeb = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    category: "glooby",
    reactions: {
        "sand": { elem1: "gleeb", elem2: null, chance: 0.1 }
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
    behavior: behaviors.LIQUID,
    reactions: {
        "head": { elem1: "glorp", elem2: "cheese" },
        "body": { elem1: "glorp", elem2: "cheese" },
        "rock": { elem1: "glorp", elem2: "cheese" },
        "sand": { elem1: "glorp", elem2: "cheese" },
    },
    viscosity: 0.5,
    category: "glooby",
    state: "liquid",
    density: 300,
    stain: -0.25,
}
