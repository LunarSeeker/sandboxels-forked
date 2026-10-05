dead_elements = [
    "ash",
    "blood",
    "body_008",
    "bone",
    "cancer",
    "cooked_meat",
    "cured_meat",
    "dead_bug",
    "dead_plant",
    "dna",
    "feather",
    "head_008",
    "infection",
    "meat",
    "rotten_meat",
    "yolk",
    "zombie_body",
    "zombie_head",
]

//Random integer from 0 to n
function randomIntegerFromZeroToValue(value) {
    var absoluteValuePlusOne = Math.abs(value) + 1
    if (value >= 0) { //Positive case
        return Math.floor(Math.random() * absoluteValuePlusOne)
    } else { //Negative case: flip sign
        return 0 - Math.floor(Math.random() * absoluteValuePlusOne)
    };
};

function randomChoice(array) {
    if (array.length === 0) { throw new Error(`The array ${array} is empty`) };
    return array[(randomIntegerFromZeroToValue(array.length - 1))]
};

elements.give_life = {
    color: '#FF0000',
    tool: function (pixel) {
        if (dead_elements.includes(pixel.element)) {
            pixel.temp = 20
            pixel.element = randomChoice(['bee', 'ant', 'snail', 'fish', 'fly', 'frog', 'plant', 'grass', 'sapling', 'grass_seed', 'wheat_seed'])
        }
    },
    category: 'extratools',
}

elements.desand = {
    color: "#192a88",
    tool: function (pixel) {
        if (pixel.element === "sand" || pixel.element === "color_sand" || pixel.element === "glass_shard" || pixel.element === "glass") {
            deletePixel(pixel.x, pixel.y)
        }
        else if (pixel.element === "packed_sand") {
            changePixel(pixel, "foam")
        }
        else if (pixel.element === "rad_glass" || pixel.element === "rad_shard") {
            changePixel(pixel, "radiation")
        }
        else if (pixel.element === "molten_rad_glass" || pixel.element === "molten_glass") {
            changePixel(pixel, "fire")
        }
        else if (pixel.element === 'stained_glass') {
            pixel.element = "smoke"
        }
        else if (pixel.element === "wet_sand") {
            changePixel(pixel, "water")
        }
        else if (pixel.element === "sandstorm") {
            if (Math.random() < 0.95) {
                pixel.element = "foam"
            }
            else {
                changePixel(pixel, "cloud")
            }
        }
        else if (pixel.element === "tornado") {
            if (pixel.fired === "sand") {
                pixel.fired = null
                pixel.color = pixelColorPick(pixel, elements.tornado.color)
            }
        }
        else if (pixel.element === "concrete") {
            if (Math.random() < 0.95) {
                pixel.element = "gravel"
            }
            else {
                changePixel(pixel, "oxygen")
            }
        }
        else if (pixel.element === "cement") {
            if (Math.random() < 0.80) {
                pixel.element = "gravel"
            }
            else {
                changePixel(pixel, "water")
            }
        }
    },
    category: "extratools",
}

elements.absolute_zero = {
    category: "energy",
    color: "#66ccff",
    darkText: true,
    tool: function (pixel) {
        pixel.temp = -273
        pixelTempCheck(pixel)
    }
}

elements.boil = {
    category: "energy",
    color: "#ff7866",
    tool: function (pixel) {
        pixel.temp = 100
        pixelTempCheck(pixel)
    }
}

elements.lowest_temp = {
    category: "energy",
    color: "#ff6685",
    tool: function (pixel) {
        if (elements[pixel.element].tempLow) {
            pixel.temp = elements[pixel.element].tempLow
        }
        pixelTempCheck(pixel)
    }
}

elements.absolute_temp = {
    category: "energy",
    color: "#8566ff",
    tool: function (pixel) {
        pixel.temp = Math.abs(pixel.temp)
        pixelTempCheck(pixel)
    }
}

elements.eat = {
    color: ["#ffba79", "#efff79"],
    tool: function (pixel) {
        if (elements[pixel.element].isFood || elements[pixel.element].category === "food") {
            deletePixel(pixel.x, pixel.y)
        }
    },
    category: "extratools",
    desc: "Consumes edible pixels."
}

elements.drink = {
    color: ["#03c6fc", "#03a1fc"],
    tool: function (pixel) {
        if (elements[pixel.element].state === "liquid") {
            deletePixel(pixel.x, pixel.y)
        }
    },
    category: "extratools",
    desc: "Drinks pixels."
}
