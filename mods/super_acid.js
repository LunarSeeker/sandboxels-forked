acidBlacklist = [
	"acid",
	"black_hole",
	"bless",
	"border",
	"gloob",
	"gold",
	"gray_goo",
	"groove",
	"hydrogen",
	"ichor",
	"image",
	"midas_touch",
	"pipe_wall",
	"pipe",
	"portal_in",
	"portal_out",
	"stable_aether",
	"super_acid",
	"time",
	"void",
	"wall",
	"warp",
	"water",
]

elements.super_acid = {
	behavior: behaviors.LIQUID,
	breakInto: ["hydrogen", "water"],
	category: "liquids",
	color: "#77b300",
	density: 1000,
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
