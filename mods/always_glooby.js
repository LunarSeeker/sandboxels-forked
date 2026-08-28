function clamp(x, min, max) {
    return Math.max(min, Math.min(x, max))
}

elements.gloob = {
    behavior: behaviors.LIQUID,
    category: "glooby",
    color: ["#62e36f", "#a5d9aa", "#b3c9b6"],
    density: 600,
    state: "liquid",
    viscosity: 10,
    reactions: {
        "algae": { elem2: "gloob" },
        "ant": { elem2: "gloob" },
        "bee": { elem2: "gloob" },
        "bird": { elem2: "gloob" },
        "blood": { elem2: "gloob" },
        "body": { elem2: "gloob" },
        "cactus": { elem2: "gloob" },
        "chlorine": { elem1: null },
        "coral": { elem2: "gloob" },
        "evergreen": { elem2: "gloob" },
        "firefly": { elem2: "gloob" },
        "fish": { elem2: "gloob" },
        "flea": { elem2: "gloob" },
        "fly": { elem2: "gloob" },
        "frog": { elem2: "gloob" },
        "grass": { elem2: "gloob" },
        "hair": { elem2: "gloob" },
        "head": { elem2: "gloob" },
        "homunculus": { elem2: "gloob" },
        "kelp": { elem2: "gloob" },
        "lichen": { elem2: "gloob" },
        "liquid_chlorine": { elem1: null },
        "meat": { elem2: "gloob" },
        "mushroom_cap": { elem2: "gloob" },
        "mushroom_gill": { elem2: "gloob" },
        "mushroom_spore": { elem2: "gloob" },
        "mushroom_stalk": { elem2: "gloob" },
        "petal": { elem2: "gloob" },
        "pistil": { elem2: "gloob" },
        "plant": { elem2: "gloob" },
        "rat": { elem2: "gloob" },
        "slug": { elem2: "gloob" },
        "snail": { elem2: "gloob" },
        "soap": { elem1: "water" },
        "spider": { elem2: "gloob" },
        "stink_bug": { elem2: "gloob" },
        "tadpole": { elem2: "gloob" },
        "termite": { elem2: "gloob" },
        "vine": { elem2: "gloob" },
        "water": { elem2: "gloob" },
        "worm": { elem2: "gloob" }
    }
}

elements.groove = {
    behavior: behaviors.WALL,
    category: "glooby",
    color: ["#e5edc2", "#bec797"],
    state: "solid",
    breakInto: ["water", "bless"],
    tick: function (pixel) {
        pixel.temp = clamp(pixel.temp, 0, 20)
    }
}

elements.spamtonium = {
    behavior: behaviors.SUPERFLUID,
    category: "glooby",
    color: ["#fff200", "#ffffff", "#ffaec9"],
    density: 500,
    state: "liquid",
    reactions: {
        "diamond": { elem2: "pipis" },
        "egg": { elem2: "pipis" },
        "gold": { elem2: "cheese" },
    },
}

elements.pipis = {
    behavior: behaviors.POWDER,
    breakInto: ["sand", "yolk"],
    category: "glooby",
    color: ["#00bfff", "#0085b0"],
    density: 150,
    state: "solid",
    reactions: {
        "body": { elem2: "meat" },
        "egg": { elem2: "pipis" },
        "head": { elem2: "blood" },
        "plant": { elem2: "dead_plant" }
    },
}

elements.bless.reactions.gloob = { elem2: "groove" }
elements.bless.reactions.pipis = { elem2: "gold" }
