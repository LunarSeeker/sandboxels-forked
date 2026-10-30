const rng_density = Math.max(32, 16 << Math.floor(Math.random() * 10)) / 2

elements.void.color = "#ff0000"
//Elements
elements.idk_one = {
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
elements.idk_two = {
    behavior: behaviors.POWDER,
    category: "special",
    color: "#ff0000",
    density: rng_density,
    extinguish: true,
    state: "solid"
}
