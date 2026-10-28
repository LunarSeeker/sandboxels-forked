const rng_density = Math.max(32, 16 << Math.floor(Math.random() * 10)) / 2

elements.void.color = "#ff0000"
//Elements
elements.idk_one = {
    behavior: [
        "XX|CR:radiation%3 AND CR:fallout%0.2|XX",
        "CR:steel|XX|CR:wood",
        "XX|XX|XX"
    ],
    category: "misc",
    color: "#00d9ff",
    excludeRandom: true,
    hidden: true
}
elements.idk_two = {
    behavior: [
        "XX|XX|XX",
        "M2|CH:gold_coin,water,cell%5|M2",
        "M1|M1|M1"
    ],
    category: "misc",
    color: "#ff0000",
    density: rng_density,
    state: "liquid"
}