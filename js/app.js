"use strict";

var selectedTile = null;
var pics = [];
var userCanClick = true;

// Makes array of 32 possible usable pictures
for (var i = 1; i < 33; i++) {
	pics.push(i);
}

// Randomly chooses which 8 pictures to use,
// doubles that selection
// then shuffles again to create board arrangement
pics = _.shuffle(pics).slice(0, 8)
pics = pics.concat(pics);
pics = _.shuffle(pics);

function onReady () {
	// Files board with images
	var ul = $(document.getElementById("tiles"));
	for (var i = 0; i < 16; i++) {
		var newLI = $(document.createElement("li"));
		var newImg = $(document.createElement("img"));
		newImg.attr("src", "img/tile-back.png")
		newImg.data("number", pics[i]); // Which picture
		newImg.data("position", i);     // What position on the board it's in
		newImg.data("flipped", false);  // If it's flipped face up
		newImg.click(onTileClick);

		newLI.append(newImg);
		ul.append(newLI);
	}

	// New game button clicked, reload game
	$("#new-game").click(function() {
		window.location.reload();
	});

	var startTime = _.now();

	var timer = window.setInterval(function() {
		$("#current-time").html(Math.floor((_.now() - startTime) / 1000));
	}, 1000);
}

function onTileClick() {
	if (userCanClick && !$(this).data("flipped")) {
		// User can click and the tile is not flipped
		// Flips tile
		$(this).attr("src", "img/tile" + $(this).data("number") + ".jpg");
		$(this).data("flipped", true);

		// No other tile currently selected
		if (selectedTile == null) {
			selectedTile = $(this);
		}
		else {
			// Not the same tile as one already selected, or any face up
			userCanClick = false; // Two tiles selected, user cannot click

			if (selectedTile.data("number") == $(this).data("number")) {
				// Match!
				// Increments match counter
				var matchElement = $("#matches");
				var matches = parseInt(matchElement.html());
				matchElement.html(matches + 1);

				// Decrements pairs remaining counter
				var pairsremainingElement = $("#remaining");
				var remaining = parseInt(pairsremainingElement.html());
				pairsremainingElement.html(remaining - 1);

				selectedTile = null;
				userCanClick = true;
			}
			else {
				// Not a match
				var mismatchElement = $("#mismatches");
				var mismatches = parseInt(mismatchElement.html());
				mismatchElement.html(mismatches + 1);

				setTimeout(function() {
					$(this).attr("src", "img/tile-back.png");
					$(this).data("flipped", false);
					selectedTile.attr("src", "img/tile-back.png");
					selectedTile.data("flipped", false);

					selectedTile = null;
					userCanClick = true;
				}, 1000);
			}
		}
	}
}

$(onReady);
