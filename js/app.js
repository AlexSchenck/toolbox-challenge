"use strict";

function onReady () {
	var ul = document.getElementById("tiles");

	for (var i = 0; i < 16; i++) {
		var newLI = document.createElement("li");
		var newImg = document.createElement("img");
		newImg.src = "img/tile-back.png";

		newLI.appendChild(newImg);
		ul.appendChild(newLI);
	}
}

$(onReady);
