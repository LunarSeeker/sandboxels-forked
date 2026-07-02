acidBlacklist = ["super_acid", "acid", "gloob", "gold_coin", "gold", "gray_goo", "groove", "hydrogen", "ice", "wall", "water", "steam", "steel", "bless"]

elements.super_acid = {
	color: "#77b300",
	behavior: behaviors.LIQUID,
	state: "liquid",
	category: "liquids",
	density: 300,
	breakInto: ["hydrogen", "water"],
	tick: function (pixel) {
		for (i = 0; i < adjacentCoords.length; i++) {
			//if (Math.random() < 0.5) {
			var checkPosX = pixel.x + adjacentCoords[i][0];
			var checkPosY = pixel.y + adjacentCoords[i][1];
			if (!isEmpty(checkPosX, checkPosY, true)) {
				var newElement = pixelMap[checkPosX][checkPosY].element;
				if (!acidBlacklist.includes(newElement)) {
					if (typeof (pixel[newElement]) === "undefined") {
						pixel[newElement] = 0;
					};
					pixel[newElement]++;
					deletePixel(checkPosX, checkPosY);
				};
			};
			//};
		};
	},
};

elements.bless.reactions.super_acid = { elem2: null }