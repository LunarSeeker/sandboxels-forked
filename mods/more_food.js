const newFoods = {
    ambrosia: "#ffff00",
    apple: "#FF0000",
    banana: "#FFE135",
    blueberry: "#4B0082",
    elderberry: "#990099",
    fig: "#8B4513",
    kiwi: "#32CD32",
    lemon: "#FFFACD",
    lime: "#98FB98",
    orange: "#eda137",
    peach: "#FFDAB9",
    pear: "#9ACD32",
    pitaya: "#ff00ff",
    plum: "#8E4585",
    pomegranate: "#8B0000",
    strawberry: "#FF4D4D",
    watermelon: "#FF6666",
}

for (const [name, color] of Object.entries(newFoods)) {
    const leaves = name + "_leaves"
    const branch = name + "_branch"

    elements[name] = {
        behavior: behaviors.POWDER,
        breakInto: "juice",
        breakIntoColor: color,
        category: "food",
        color: color,
        density: 1154,
        isFood: true,
        state: "solid",
        stateHigh: ["steam", "sugar"],
        tempHigh: 256,
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

    elements[name + "_seed"] = {
        color: color,
        tick: function (pixel) {
            if (!tryMove(pixel, pixel.x, pixel.y + 1)) {
                if (Math.random() < 0.02 && pixel.age > 50 && pixel.temp < 100) {
                    if (!outOfBounds(pixel.x, pixel.y + 1)) {
                        var dirtPixel = pixelMap[pixel.x][pixel.y + 1]
                        if (dirtPixel && (eLists.SOIL.indexOf(dirtPixel.element) !== -1 || dirtPixel.element === "grass")) {
                            changePixel(dirtPixel, "root")
                        }
                    }
                    if (isEmpty(pixel.x, pixel.y - 1)) {
                        movePixel(pixel, pixel.x, pixel.y - 1)
                        createPixel(Math.random() > 0.5 ? "wood" : branch, pixel.x, pixel.y + 1)
                    }
                }
                else if (pixel.age > 1000) {
                    changePixel(pixel, "wood")
                }
                pixel.age++
            }
            doDefaults(pixel)
        },
        properties: {
            "age": 0
        },
        burn: 65,
        burnTime: 15,
        category: "seeds",
        cooldown: defaultCooldown,
        density: 1500,
        seed: true,
        state: "solid",
        stateHigh: "dead_plant",
        stateLow: "frozen_plant",
        tempHigh: 100,
        tempLow: -2,
        behavior: [
            "XX|XX|XX",
            "XX|FX%10|XX",
            "XX|M1|XX",
        ],
    }

    elements[branch] = {
        color: "#786531",
        behavior: [
            "CR:" + leaves + "," + branch + "%2|CR:" + leaves + "," + leaves + "," + leaves + "," + branch + "%2|CR:" + leaves + "," + branch + "%2",
            "XX|XX|XX",
            "XX|XX|XX",
        ],
        breakInto: ["sap", "sawdust"],
        burn: 40,
        burnInto: ["sap", "ember", "charcoal"],
        burnTime: 50,
        category: "life",
        density: 1500,
        hardness: 0.15,
        hidden: true,
        state: "solid",
        stateHigh: "wood",
        stateLow: "wood",
        tempHigh: 100,
        tempLow: -30,
        hidden: true,
    }
    elements[leaves] = {
        behavior: [
            "XX|XX|XX",
            "XX|XX|XX",
            "XX|CR:" + name + "_seed%0.1|XX",
        ],
        breakInto: "dead_plant",
        burn: 65,
        burnInto: "dead_plant",
        burnTime: 60,
        category: "life",
        color: "#00bf00",
        density: 1050,
        seed: name + "_seed",
        state: "solid",
        stateHigh: "dead_plant",
        stateLow: "frozen_plant",
        tempHigh: 100,
        tempLow: -2,
        hidden: true,
        reactions: elements.plant.reactions,
    }
}

elements.pitaya.alias = "dragon fruit"

elements.mustard = {
    behavior: behaviors.LIQUID,
    category: "liquids", //Ketchup is in the 'liquids' category so this is just for consistency
    color: "#e1ad01",
    density: 1235,
    isFood: true,
    stain: 0.05,
    state: "liquid",
    stateHigh: ["carbon_dioxide", "methane", "steam", "sugar"],
    tempHigh: 260,
    viscosity: 50000
}

elements.pepper = {
    behavior: behaviors.POWDER,
    category: "food",
    color: "#362712",
    density: 2160,
    isFood: true,
    state: "solid",
    stateHigh: ["ash", "smoke"],
    tempHigh: 250
}