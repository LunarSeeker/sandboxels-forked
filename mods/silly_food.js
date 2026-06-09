elements.goobberry = {
    behavior: behaviors.POWDER,
    breakInto: "juice",
    breakIntoColor: "#5dd507",
    category: "food",
    color: ["#464196", "#5dd507"],
    reactions: {},
    state: "solid",
};

elements.burn_juice = {
    color: "#da1a1a",
    behavior: behaviors.LIQUID,
    reactions: {
        "water": { "elem2": null },
        "head": { "elem2": "cooked_meat" },
        "body": { "elem2": "cooked_meat" },
    },
    burn: 100,
    burnTime: 2,
    category: "liquids",
    density: 792,
    stain: -0.25,
    state: "liquid",
    viscosity: 1.14,
}