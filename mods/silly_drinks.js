elements.gleeb = {
    color: "#c9c5b1",
    behavior: behaviors.LIQUID,
    reactions: {
        "virus": { "elem2": null },
        "plague": { "elem2": null },
        "body": { "elem2": "cheese", "chance": 0.02 },
    },
    viscosity: 2,
    category: "liquids",
    state: "liquid",
    density: 792,
    stain: -0.25,
}

elements.glorp = {
    color: "#f0bb00",
    behavior: behaviors.LIQUID,
    reactions: {
        "virus": { "elem2": null },
        "plague": { "elem2": null },
        "body": { "elem2": "cheese", "chance": 0.1 },
    },
    viscosity: 0.5,
    category: "liquids",
    state: "liquid",
    density: 300,
    stain: -0.25,
}
