"use strict";

function onReady () {
	var ul = document.getElementById("tiles");
	var gameInfo = document.getElementById("game-info");

	for (var i = 0; i < 16; i++) {
		var newLI = document.createElement("li");
		var newImg = document.createElement("img");
		newImg.src = "img/tile-back.png";

		newLI.appendChild(newImg);
		ul.appendChild(newLI);
	}
}

document.getElementById("new-game").onclick = function() {
	window.location.reload();
}

$(onReady);
