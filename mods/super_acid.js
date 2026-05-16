acidBlacklist = ["super_acid", "acid", "wall", "gold", "water", "ice", "gold_coin", "gloob", "groove"]

elements.super_acid = {
	color: "#77b300",
	behavior: behaviors.LIQUID,
	state: "liquid",
	category: "liquids",
	density: 3000,
	hardness: 1,
	breakInto: ["hydrogen","acid"],
	tick: function (pixel) {
		for (i = 0; i < adjacentCoords.length; i++) {
			if (Math.random() < 0.5) {
				var pX = pixel.x
				var pY = pixel.y
				var oX = adjacentCoords[i][0];
				var oY = adjacentCoords[i][1];
				var checkPosX = pX + oX;
				var checkPosY = pY + oY;
				if (!isEmpty(checkPosX, checkPosY, true)) {
					var newPixel = pixelMap[checkPosX][checkPosY];
					var newElement = newPixel.element;
					if (!acidBlacklist.includes(newElement)) {
						if (typeof (pixel[newElement]) === "undefined") {
							pixel[newElement] = 0;
						};
						pixel[newElement]++;
						deletePixel(checkPosX, checkPosY);
					};
				};
			};
		};
	},
};
