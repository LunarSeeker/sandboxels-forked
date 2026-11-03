elements.gravite = {
    behavior: behaviors.POWDER,
    category: "special",
    color: "#e35693",
    density: 0.06,
    state: "solid",
    stateHigh: "explosion",
    tempHigh: 1000
}
elements.anti_gravite = {
    color: ["#1a743c", "#1dc9f3", "#267cb0", "#91c7cc", "#bee347", "#eaede5", "#f4cd32", "#fab937", "#fe4a75", "#ff0101", "#ff6ffa"],
    buttonColor: ["#ff8080", "#ff2626"],
    behavior: [
        "M1%50|M1%50|M1%50",
        "M2%5|XX|M2%5",
        "M2%5|M2%5|M2%5"
    ],
    category: "special",
    density: 0.06,
    state: "solid",
    stateHigh: "explosion",
    tempHigh: 1000,
    reactions: {
        "gravite": { elem1: "explosion", elem2: "explosion" }
    }
}

elements.evil_bulb = {
    category: "machines",
    color: "#ebebc3",
    conduct: 1,
    density: 500,
    stateHigh: "molten_copper",
    tempHigh: 1500,
    behavior: behaviors.WALL,
    behaviorOn: [
        "XX|CR:radiation|XX",
        "CR:radiation|XX|CR:radiation",
        "XX|CR:radiation|XX"
    ],
}

elements.wall_gen = {
    behavior: [
        "XX|XX|XX",
        "XX|LB:wall AND RT%5|M1 AND BO:1,2,3",
        "XX|XX|XX"
    ],
    category: "special",
    color: "#00d9ff",
    excludeRandom: true,
    rotatable: true
}