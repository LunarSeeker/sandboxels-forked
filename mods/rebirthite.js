elements.rebirthite = {
    color: ["#530000", "#FF0000"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    breakInto: ["hydrogen", "water"],
    reactions: {
        "bird": { "elem1": null, "elem2": "bee" },
        "blood": { "elem1": null, "elem2": "grass_seed" },
        "body": { "elem1": null, "elem2": "slug" },
        "bone": { "elem1": null, "elem2": "grass_seed" },
        "coral": { "elem1": null, "elem2": "algae" },
        "evergreen": { "elem1": null, "elem2": "sapling" },
        "firefly": { "elem1": null, "elem2": "grass_seed" },
        "fly": { "elem1": null, "elem2": "bee" },
        "frog": { "elem1": null, "elem2": "slug" },
        "grass": { "elem1": null, "elem2": "grass_seed" },
        "head": { "elem1": null, "elem2": "grass_seed" },
        "lichen": { "elem1": null, "elem2": "algae" },
        "meat": { "elem1": null, "elem2": "grass_seed" },
        "petal": { "elem1": null, "elem2": "flower_seed" },
        "pistil": { "elem1": null, "elem2": "flower_seed" },
        "plant": { "elem1": null, "elem2": "seed" },
        "rat": { "elem1": null, "elem2": "grass_seed" },
        "root": { "elem1": null, "elem2": "sapling" },
        "snail": { "elem1": null, "elem2": "slug" },
        "worm": { "elem1": null, "elem2": "grass_seed" },
        "wood": { "elem1": null, "elem2": "sapling" },
    },
    state: "liquid",
    density: 1.2,
    viscosity: 2
};

elements.bless.reactions.rebirthite = { elem2: null }
