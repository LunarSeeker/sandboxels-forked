function decay(ms) { //Taken from decays.js
    return 1 / (Math.pow(Math.log10(ms * 30 + 1), 2) * 10)
}


elements.philosophers_stone = {
    behavior: behaviors.POWDER,
    category: "magic",
    color: ["#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff"],
    density: 1,
    excludeRandom: true,
    state: "solid",
    reactions: {
        "ash": { elem2: "diamond" },
        "cancer": { elem2: "skin" },
        "copper": { elem2: "bronze" },
        "dirt": { elem2: "stable_aether" },
        "glitter": { elem2: "diamond" },
        "iron": { elem2: "steel" },
        "lead": { elem2: "gold" },
        "mercury": { elem2: "silver" },
        "oil": { elem2: "gold" },
        "poison": { elem2: "vaccine" },
        "rust": { elem2: "steel" },
        "tin": { elem2: "brass" },
        "unstable_aether": { elem2: "stable_aether" },
        "zinc": { elem2: "bronze" },
    }
}

elements.stable_aether = {
    behavior: behaviors.WALL,
    category: "magic",
    color: ["#ff8800", "#ffff00", "#00ff00", "#00ffff", "#0000ff"],
    density: 1,
    state: "solid"
}

elements.unstable_aether = {
    behavior: behaviors.GAS,
    category: "magic",
    color: ["#ff0000", "#ff8800", "#0000ff", "#ff00ff"],
    density: 1,
    state: "gas",
    tick: function (pixel) {
        if (Math.random() < decay(1160)) {
            changePixel(pixel, "gold")
        }
    }
}

elements.primordial_chaos = {
    behavior: behaviors.SUPERFLUID,
    category: "magic",
    color: "#1b1b32",
    density: 0.1,
    excludeRandom: true,
    hardness: 1,
    insulate: true,
    movable: false,
    viscosity: 0,
    state: "liquid",
    reactions: {
        "blood": { elem1: ["dwarf", "homunculus"], elem2: "antibody" },
        "clay": { elem1: ["dwarf", "homunculus"], chance: 0.2 },
        "dirt": { elem1: ["algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], elem2: null },
        "grass": { elem1: ["potato", "bee", "plant", "ant"], chance: 0.25 },
        "light": { elem1: ["algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], elem2: null },
        "oxygen": { elem1: ["dwarf", "homunculus", "algae", "cell", "mushroom_spore", "lichen", "yeast", "antibody"], elem2: null },
    }
}
