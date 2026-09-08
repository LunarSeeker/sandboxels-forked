elements.give_life = {
    color: '#FF0000',
    tool: function (pixel) {
        if (pixel.element == 'dead_bug') {
            pixel.element = 'bee'
        }
        if (pixel.element == 'cancer' || pixel.element == 'meat' || pixel.element == 'rotten_meat') {
            pixel.element = 'cell'
        }
        if (pixel.element == 'dead_plant' || pixel.element == 'ash' || pixel.element == 'zombie_head') {
            pixel.element = 'plant'
        }
    },
    category: 'tools',
}

elements.absolute_zero = {
    color: "#66ccff",
    category: "energy",
    tool: function (pixel) {
        pixel.temp = -273
        pixelTempCheck(pixel)
    }
}