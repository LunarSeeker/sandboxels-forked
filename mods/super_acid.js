acidBlacklist = [
	"acid",
	"bless",
	"gloob",
	"gold",
	"gray_goo",
	"groove",
	"hydrogen",
	"super_acid",
	"wall",
	"water"
]

elements.super_acid = {
	behavior: behaviors.LIQUID,
	breakInto: ["hydrogen", "water"],
	category: "liquids",
	color: "#77b300",
	density: 300,
	state: "liquid",
	tick: function (pixel) {
		for (i = 0; i < adjacentCoords.length; i++) {
			//if (Math.random() < 0.5) {
			var checkPosX = pixel.x + adjacentCoords[i][0]
			var checkPosY = pixel.y + adjacentCoords[i][1]
			if (!isEmpty(checkPosX, checkPosY, true)) {
				var newElement = pixelMap[checkPosX][checkPosY].element
				if (!acidBlacklist.includes(newElement)) {
					if (typeof (pixel[newElement]) === "undefined") {
						pixel[newElement] = 0
					};
					pixel[newElement]++
					deletePixel(checkPosX, checkPosY)
				};
			};
			//};
		};
	},
}

elements.bless.reactions.super_acid = { elem2: null }