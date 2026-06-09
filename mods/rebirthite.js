elements.rebirthite = {
    color: ["#530000", "#FF0000"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    breakInto: ["hydrogen", "water"],
    reactions: {
        "dead_bug": { "elem1": null, "elem2": "bee" },
        "dead_plant": { "elem1": null, "elem2": "sapling" },
        "fly": { "elem1": null, "elem2": "bee" },
        "grass": { "elem1": null, "elem2": "sapling" },
        "meat": { "elem1": null, "elem2": "ant" },
        "pistil": { "elem1": null, "elem2": "sapling" },
        "plant": { "elem1": null, "elem2": "sapling" },
        "rat": { "elem1": null, "elem2": "sapling" },
        "root": { "elem1": null, "elem2": "sapling" },
        "snail": { "elem1": null, "elem2": "sapling" },
        "tree_branch": { "elem1": null, "elem2": "sapling" },
        "wood": { "elem1": null, "elem2": "sapling" },
        "worm": { "elem1": null, "elem2": "sapling" },
    },
    state: "liquid",
    density: 1.2,
    viscosity: 2
};

elements.bless.reactions.rebirthite = { elem2: null }