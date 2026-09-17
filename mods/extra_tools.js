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
        if (pixel.element == 'dead_bug' || pixel.element == 'zombie_body') {
            pixel.temp = 20
            pixel.element = randomChoice(['bee', 'ant'])
        }
        if (pixel.element == 'cancer' || pixel.element == 'dna' || pixel.element == 'head_008') {
            pixel.element = 'cell'
        } else if (pixel.element == 'meat' || pixel.element == 'cooked_meat' || pixel.element == 'cured_meat' || pixel.element == 'rotten_meat') {
            pixel.temp = 20
            pixel.element = randomChoice(['snail', 'fish', 'fly', 'frog'])
        }
        if (pixel.element == 'dead_plant' || pixel.element == 'ash' || pixel.element == 'zombie_head' || pixel.element == 'body_008') {
            pixel.temp = 20
            pixel.element = randomChoice(['plant', 'grass', 'sapling', 'grass_seed', 'wheat_seed'])
        }
        if (pixel.element == 'feather' || pixel.element == 'yolk') {
            pixel.temp = 20
            pixel.element = 'bird'
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
        if (elements[pixel.element].tempHigh) {
            pixel.temp = elements[pixel.element].tempHigh
        } else {
            pixel.temp = 100
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
        if (elements[pixel.element].isFood) {
            deletePixel(pixel.x, pixel.y)
        }
    },
    category: "tools",
    desc: "Consumes edible pixels."
}
