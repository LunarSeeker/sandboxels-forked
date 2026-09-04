//The Moon
elements.lunar_dust = {
    behavior: behaviors.POWDER,
    category: "land",
    color: ["#ababab", "#c5c5c5"],
    density: 1500,
    state: "solid"
}
elements.moon_rock = {
    behavior: behaviors.STURDYPOWDER,
    breakInto: "lunar_dust",
    category: "land",
    color: ["#a5a5a5", "#bdbdbd"],
    density: 1605,
    hardness: 0.5,
    state: "solid",
    stateHigh: "magma",
    tempHigh: 800
}
//Mars
elements.mars_dust = {
    behavior: behaviors.POWDER,
    category: "land",
    color: ["#ab2a20", "#c53227"],
    density: 2600,
    state: "solid"
}
elements.mars_rock = {
    behavior: behaviors.STURDYPOWDER,
    breakInto: "mars_dust",
    category: "land",
    color: ["#a51002", "#bd1102"],
    density: 1605,
    hardness: 0.75,
    state: "solid",
    stateHigh: "magma",
    tempHigh: 800
}