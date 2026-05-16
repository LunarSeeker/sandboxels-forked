elements.gloob = {
    color: "#411900",
    density: 200,
    state: "solid",
    burn: 5,
    tempHigh: 400,
    burnTime: 200,
    burnInto: ["glube"],
    category: "Glooby stuff",
}

elements.glube = {
    behavior: behaviors.POWDER,
    color: '#181100',
    state: 'powder',
    category: "Glooby stuff",
    reactions: {
        "water": { elem1: null, elem2: "wetGloob" },
        "milk": { elem1: null, elem2: "gloobyMilk" },
    },
    stateHigh: ["gloobGas"],
    density: 10
}

elements.wetGloob = {
    behavior: behaviors.LIQUID,
    color: "#A9844F",
    state: 'liquid',
    category: 'Glooby stuff',
    density: '25'
}

elements.gloobyMilk = {
    behavior: behaviors.LIQUID,
    color: '#BEB2AD',
    state: 'liquid',
    category: "Glooby stuff",
    density: 10
}

elements.gloobGas = {
    behavior: behaviors.GAS,
    color: '#E5E4E2',
    category: 'Glooby stuff',
    density: .86,
    state: 'gas',
}