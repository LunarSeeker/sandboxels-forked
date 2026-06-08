elements.rebirthite = {
    color: ["#530000", "#FF0000"],
    behavior: behaviors.LIQUID,
    category: "liquids",
    breakInto: ["hydrogen", "water"],
    reactions: {
        "blood": { "elem1": ["rebirthite", "water", null], "elem2": "cell" },
        "plant": { "elem1": ["rebirthite", "water", null], "elem2": "sapling" },
        "lichen": { "elem1": ["rebirthite", "water", null], "elem2": "sapling" },
        "rat": { "elem1": ["rebirthite", "water", null], "elem2": "cell" },
        "frog": { "elem1": ["rebirthite", "water", null], "elem2": "cell" },
        "fish": { "elem1": ["rebirthite", "water", null], "elem2": "cell" },
        "bird": { "elem1": ["rebirthite", "water", null], "elem2": "cell" },
        "head": { "elem1": ["rebirthite", "water", null], "elem2": "cell" },
        "body": { "elem1": ["rebirthite", "water", null], "elem2": "cell" },
        "worm": { "elem1": ["rebirthite", "water", null], "elem2": "ant" },
        "fly": { "elem1": ["rebirthite", "water", null], "elem2": "ant" },
        "firefly": { "elem1": ["rebirthite", "water", null], "elem2": "ant" },
        "bee": { "elem1": ["rebirthite", "water", null], "elem2": "ant" },
        "snail": { "elem1": ["rebirthite", "water", null], "elem2": "slug" },
        "grass": { "elem1": ["rebirthite", "water", null], "elem2": "sapling" },
        "root": { "elem1": ["rebirthite", "water", null], "elem2": "sapling" },
        "pistil": { "elem1": ["rebirthite", "water", null], "elem2": "sapling" },
        "petal": { "elem1": ["rebirthite", "water", null], "elem2": "sapling" },
        "meat": { "elem1": ["rebirthite", "water", null], "elem2": "cell" },
        "wood": { "elem1": ["rebirthite", "water", null], "elem2": "sapling" },
    },
    state: "liquid",
    density: 1.05,
    viscosity: 2
};

elements.bless.reactions.rebirthite = { elem2: null }
