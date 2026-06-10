elements.goobberry = {
    behavior: behaviors.POWDER,
    breakInto: "juice",
    breakIntoColor: "#5dd507",
    category: "food",
    color: ["#464196", "#5dd507"],
    reactions: {},
    state: "solid",
}

elements.burn_juice = {
    color: "#da1a1a",
    behavior: behaviors.LIQUID,
    reactions: {
        "meat": { "elem2": "cooked_meat" },
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

elements.xon_stone = {
    color: ["#7c2617", "#984227", "#c72114", "#b0634a", "#802720"],
    behavior: behaviors.WALL,
    reactions: {
        "plant": { elem2: ["dead_plant", "xon_stone"], chance: 0.005 },
        "grass": { elem2: ["dead_plant", "xonwood"], chance: 0.005 },
        "tree_branch": { elem1: null, elem2: "xonwood" },
        "sapling": { elem2: "xonwood" },
    },
    burn: 20,
    burnTime: 60,
    burnInto: "meat",
    category: "xon",
    breakInto: ["blood", "meat", "water"],
    state: "solid",
    density: 462
}

elements.xonwood = {
    color: ["#9e4839", "#ba6449", "#a14940"],
    tick: function (pixel) {
        if (!pixel.burning) {
            if (!pixel.lc) { pixel.lc = "#7c2617" }
            if (!pixel.wc) { pixel.wc = "#ba6449" }
            if (isEmpty(pixel.x - 1, pixel.y - 1) && Math.random() < 0.02) {
                if (Math.random() < 0.5) {
                    createPixel("xon_stone", pixel.x - 1, pixel.y - 1)
                    pixelMap[pixel.x - 1][pixel.y - 1].color = pixelColorPick(pixelMap[pixel.x - 1][pixel.y - 1], pixel.lc)
                }
                else {
                    createPixel("xonwood", pixel.x - 1, pixel.y - 1)
                    pixelMap[pixel.x - 1][pixel.y - 1].color = pixelColorPick(pixelMap[pixel.x - 1][pixel.y - 1], pixel.wc)
                    pixelMap[pixel.x - 1][pixel.y - 1].wc = pixel.wc
                    pixelMap[pixel.x - 1][pixel.y - 1].lc = pixel.lc
                }
            }
            if (isEmpty(pixel.x + 1, pixel.y - 1) && Math.random() < 0.02) {
                if (Math.random() < 0.55) {
                    createPixel("xon_stone", pixel.x + 1, pixel.y - 1)
                    pixelMap[pixel.x + 1][pixel.y - 1].color = pixelColorPick(pixelMap[pixel.x + 1][pixel.y - 1], pixel.lc)
                }
                else {
                    createPixel("xonwood", pixel.x + 1, pixel.y - 1)
                    pixelMap[pixel.x + 1][pixel.y - 1].color = pixelColorPick(pixelMap[pixel.x + 1][pixel.y - 1], pixel.wc)
                    pixelMap[pixel.x + 1][pixel.y - 1].wc = pixel.wc
                    pixelMap[pixel.x + 1][pixel.y - 1].lc = pixel.lc
                }
            }
            if (isEmpty(pixel.x, pixel.y - 1) && Math.random() < 0.02) {
                if (Math.random() < 0.8) {
                    createPixel("xon_stone", pixel.x, pixel.y - 1)
                    pixelMap[pixel.x][pixel.y - 1].color = pixelColorPick(pixelMap[pixel.x][pixel.y - 1], pixel.lc)
                }
                else {
                    createPixel("xonwood", pixel.x, pixel.y - 1)
                    pixelMap[pixel.x][pixel.y - 1].color = pixelColorPick(pixelMap[pixel.x][pixel.y - 1], pixel.wc)
                    pixelMap[pixel.x][pixel.y - 1].wc = pixel.wc
                    pixelMap[pixel.x][pixel.y - 1].lc = pixel.lc
                }
            }
        }
        doDefaults(pixel)
    },
    renderer: renderPresets.WOODCHAR,
    reactions: {
        "plant": { elem2: ["dead_plant", "xon_stone"], chance: 0.005 },
        "grass": { elem2: "xon_stone", chance: 0.005 },
        "tree_branch": { elem1: null, elem2: "xonwood" },
        "sapling": { elem2: "xon_stone" },
    },
    category: "xon",
    burn: 2,
    burnTime: 300,
    burnInto: ["juice", "cooked_meat"],
    state: "solid",
    density: 1500,
    hardness: 0.5,
    breakInto: ["blood", "meat"]
}
