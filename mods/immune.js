// --- 1. THE FIREWALL ---

elements.body_tissue = {
    color: "#b06d67",
    behavior: behaviors.WALL,
    category: "land",
    state: "solid",
    density: 2000,
}

elements.cytokines = {
    color: "#fff700",
    behavior: behaviors.GAS,
    category: "life",
    state: "gas",
    density: 1,
    tick: function (pixel) {
        if (Math.random() < 0.05) { deletePixel(pixel.x, pixel.y) }
    }
}

// --- 3. CORE LOGIC (Movement & Targeting) ---

function findTarget(pixel, targets, radius) {
    for (var i = -radius; i <= radius; i++) {
        for (var j = -radius; j <= radius; j++) {
            var nx = pixel.x + i
            var ny = pixel.y + j
            if (!outOfBounds(nx, ny)) {
                var check = pixelMap[nx][ny]
                if (check && targets.includes(check.element)) {
                    return { x: nx, y: ny }
                }
            }
        }
    }
    return null
}

function moveStep(pixel, tx, ty) {
    var nx = pixel.x + Math.sign(tx - pixel.x)
    var ny = pixel.y + Math.sign(ty - pixel.y)

    if (isEmpty(nx, ny)) {
        tryMove(pixel, nx, ny)
    } else {
        var obs = pixelMap[nx][ny]
        // STRICT BARRIER: Cannot move through or swap with Tissue or Skin
        if (obs && obs.element !== "body_tissue" && obs.element !== "skin" && obs.element !== "wall") {
            var ox = pixel.x
            var oy = pixel.y
            movePixel(pixel, nx, ny)
            movePixel(obs, ox, oy)
        }
    }
}

// --- 4. PATHOGENS ---

elements.bacteria = {
    color: "#2feb5b",
    behavior: behaviors.LIQUID,
    category: "life",
    tick: function (pixel) {
        if (!pixel.eatCD) { pixel.eatCD = 0 }
        if (pixel.eatCD > 0) { pixel.eatCD--; return }

        var target = findTarget(pixel, ["cell", "rbc", "stem_cell"], 8)
        if (target) {
            if (Math.abs(target.x - pixel.x) <= 1 && Math.abs(target.y - pixel.y) <= 1) {
                // Kill with Cooldown
                deletePixel(target.x, target.y)
                if (Math.random() < 0.3) createPixel("cytokines", target.x, target.y)
                createPixel("dna", target.x, target.y)
                pixel.eatCD = 40
            } else {
                moveStep(pixel, target.x, target.y)
            }
        } else {
            if (Math.random() < 0.2) tryMove(pixel, pixel.x + Math.floor(Math.random() * 3) - 1, pixel.y + Math.floor(Math.random() * 3) - 1)
        }
    }
}

// --- 5. IMMUNE SYSTEM ---

elements.phagocyte = {
    color: "#e0f7fa",
    category: "life",
    tick: function (pixel) {
        var target = findTarget(pixel, ["bacteria", "infection", "pus"], 12) || findTarget(pixel, ["cytokines"], 20)
        if (target) {
            moveStep(pixel, target.x, target.y)
        } else {
            if (Math.random() < 0.1) tryMove(pixel, pixel.x + Math.floor(Math.random() * 3) - 1, pixel.y + Math.floor(Math.random() * 3) - 1)
        }
    },
    reactions: {
        "bacteria": { elem2: null, func: function (pixel) { pixel.ate = (pixel.ate || 0) + 1; if (pixel.ate > 5) changePixel(pixel, "pus") } },
        "infection": { elem2: null, func: function (pixel) { pixel.ate = (pixel.ate || 0) + 1; if (pixel.ate > 5) changePixel(pixel, "pus") } },
        "cytokines": { elem2: null }
    }
}

elements.t_cell = {
    color: "#2962ff",
    category: "life",
    tick: function (pixel) {
        if (!pixel.killCD) { pixel.killCD = 0 }
        if (pixel.killCD > 0) { pixel.killCD--; return }

        var target = findTarget(pixel, ["cancer"], 12) || findTarget(pixel, ["cytokines"], 15)
        if (target) {
            var targetPixel = pixelMap[target.x][target.y]
            if (targetPixel.element === "cancer" && Math.abs(target.x - pixel.x) <= 1 && Math.abs(target.y - pixel.y) <= 1) {
                changePixel(targetPixel, "pus")
                pixel.killCD = 30
            } else {
                moveStep(pixel, target.x, target.y)
            }
        } else {
            if (Math.random() < 0.1) tryMove(pixel, pixel.x + Math.floor(Math.random() * 3) - 1, pixel.y + Math.floor(Math.random() * 3) - 1)
        }
    }
}

elements.b_cell = {
    color: "#ffaa00",
    behavior: behaviors.CELL,
    category: "life",
    tick: function (pixel) {
        if (!pixel.cd) { pixel.cd = 0 }
        if (pixel.cd > 0) { pixel.cd-- }

        if (pixel.cd === 0 && Math.random() < 0.4) {
            if (findTarget(pixel, ["bacteria", "infection", "cancer"], 20)) {
                var rx = Math.floor(Math.random() * 3) - 1
                var ry = Math.floor(Math.random() * 3) - 1
                if (isEmpty(pixel.x + rx, pixel.y + ry)) {
                    createPixel("antibody", pixel.x + rx, pixel.y + ry)
                    pixel.cd = 25
                }
            }
        }
        if (Math.random() < 0.05) tryMove(pixel, pixel.x + Math.floor(Math.random() * 3) - 1, pixel.y + Math.floor(Math.random() * 3) - 1)
    }
}

// --- 6. MISC ---

elements.stem_cell = {
    color: "#ffc0cb",
    behavior: behaviors.CELL,
    category: "life",
    tick: function (pixel) {
        if (Math.random() < 0.05) {
            var rx = Math.floor(Math.random() * 3) - 1
            var ry = Math.floor(Math.random() * 3) - 1
            if (isEmpty(pixel.x + rx, pixel.y + ry)) {
                createPixel(Math.random() < 0.8 ? "cell" : "body_tissue", pixel.x + rx, pixel.y + ry)
            }
        }
    }
}

elements.rbc = { color: ["#ff0000", "#d10000", "#e62e2e"], behavior: behaviors.LIQUID, category: "life", state: "liquid", density: 1010 }
elements.pus = { color: "#ebf2a0", behavior: behaviors.LIQUID, category: "life", state: "liquid", density: 1100 }