const newFoods = {
    apple: "#FF0000",
    banana: "#FFE135",
    blueberry: "#4B0082",
    fig: "#8B4513",
    gloobberry: "#4dff59",
    kiwi: "#32CD32",
    lemon: "#FFFACD",
    lime: "#98FB98",
    peach: "#FFDAB9",
    pear: "#9ACD32",
    pitaya: "#ff00ff",
    plum: "#8E4585",
    pomegranate: "#8B0000",
    strawberry: "#FF4D4D",
    watermelon: "#FF6666",
}

for (const [name, color] of Object.entries(newFoods)) {
    elements[name] = {
        color: color,
        behavior: behaviors.POWDER,
        breakInto: "juice",
        breakIntoColor: color,
        category: "food",
        density: 1154,
        isFood: true,
        state: "solid",
        reactions: {
            "radiation": { elem1: "explosion", chance: 0.1, color1: color },
            "rock": { elem1: "juice", chance: 0.1, color1: color },
            "concrete": { elem1: "juice", chance: 0.1, color1: color },
            "basalt": { elem1: "juice", chance: 0.1, color1: color },
            "limestone": { elem1: "juice", chance: 0.1, color1: color },
            "tuff": { elem1: "juice", chance: 0.1, color1: color },
            "water": { elem2: "juice", chance: 0.005, color2: color },
            "sugar_water": { elem2: "juice", chance: 0.025, color2: color },
            "acid": { elem1: "juice", color1: color },
            "acid_gas": { elem1: "juice", color1: color }
        },
    }
}

elements.pitaya.alias = "dragon fruit"