dead_elements = [
    "ash",
    "blood",
    "body_008",
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
    category: 'tools',
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
    category: "tools",
    desc: "Consumes edible pixels."
}

elements.drink = {
    color: ["#03c6fc", "#03a1fc"],
    tool: function (pixel) {
        if (elements[pixel.element].state === "liquid") {
            deletePixel(pixel.x, pixel.y)
        }
    },
    category: "tools",
    desc: "Drinks pixels."
}