elements.rebirthite = {
    color: ["#530000", "#FF0000"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    breakInto: ["hydrogen", "water"],
    reactions: {
        "blood": { "elem1": null, "elem2": "cell" },
        "plant": { "elem1": null, "elem2": "sapling" },
        "lichen": { "elem1": null, "elem2": "algae" },
        "rat": { "elem1": null, "elem2": "cell" },
        "frog": { "elem1": null, "elem2": "cell" },
        "fish": { "elem1": null, "elem2": "algae" },
        "bird": { "elem1": null, "elem2": "bee" },
        "head": { "elem1": null, "elem2": "cell" },
        "body": { "elem1": null, "elem2": "cell" },
        "worm": { "elem1": null, "elem2": "ant" },
        "fly": { "elem1": null, "elem2": "bee" },
        "firefly": { "elem1": null, "elem2": "ant" },
        "snail": { "elem1": null, "elem2": "slug" },
        "grass": { "elem1": null, "elem2": "sapling" },
        "root": { "elem1": null, "elem2": "sapling" },
        "pistil": { "elem1": null, "elem2": "sapling" },
        "petal": { "elem1": null, "elem2": "sapling" },
        "evergreen": { "elem1": null, "elem2": "sapling" },
        "meat": { "elem1": null, "elem2": "cell" },
        "wood": { "elem1": null, "elem2": "sapling" },
    },
    state: "liquid"
};

elements.bless.reactions.rebirthite = { elem2: null }
