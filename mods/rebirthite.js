elements.rebirthite = {
    color: ["#530000", "#FF0000"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    breakInto: ["hydrogen", "water"],
    reactions: {
        "ash": { "elem1": null, "elem2": "sugar" },
        "cancer": { "elem1": null, "elem2": "cell" },
        "dead_bug": { "elem1": null, "elem2": "bee" },
        "dead_plant": { "elem1": null, "elem2": "plant" },
        "fallout": { "elem1": null, "elem2": "salt" },
        "fly": { "elem1": null, "elem2": "bee" },
        "grass": { "elem1": null, "elem2": "sapling" },
        "meat": { "elem1": null, "elem2": "ant" },
        "pistil": { "elem1": null, "elem2": "sapling" },
        "rat": { "elem1": null, "elem2": "ant" },
        "rotten_meat": { "elem1": null, "elem2": "ant" },
        "tree_branch": { "elem1": null, "elem2": "sapling" },
        "wood": { "elem1": null, "elem2": "sapling" },
        "worm": { "elem1": null, "elem2": "sapling" }
    },
    state: "liquid",
    density: 1.2,
    viscosity: 2
}

elements.bless.reactions.rebirthite = { elem2: null }

elements.give_life = {
    color: '#FF0000',
    tool: function (pixel) {
        if (pixel.element == 'dead_bug') {
            pixel.element = 'bee'
        }
        if (pixel.element == 'cancer' || pixel.element == 'meat' || pixel.element == 'rotten_meat') {
            pixel.element = 'cell'
        }
        if (pixel.element == 'dead_plant') {
            pixel.element = 'plant'
        }
    },
    category: 'tools',
}
