let state = 0
let ball;
let showInstructions = true;

function setup() {
	new Canvas(windowWidth, windowHeight);
	displayMode('centered');

	ball = new Sprite();
	ball.diameter = 50;
}

function draw() {
	background('skyblue');

	switch (state) {
		case 0:
			//level 1 intro screen
			if (showInstructions) {
				textAlign(CENTER,CENTER);
				textSize(48);
				fill(0);
				text("Level 1: Gold Rush Valley", width / 2, height / 3);

				textSize(20);
				text("Use the arrow keys to control your player in attempts to collect as much money as you can.", width / 2, height / 2);
				text("Beat the level by making it to the finish line and at the end of the level you will receive a reward from the money you made!", width / 2, height / 2 + 40);
				text("Press an arrow key to start.", width / 2, height / 2 + 80);
			} else {
				// Code for Level 1 gameplay goes here
			}
			break;
		}
	}

	function keyPressed() {
		// Check if an arrow key is pressed to start the level
		if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW || keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
			showInstructions = false; // Hide the instructions
			state = 1; // Move to the actual level gameplay
		}
	}
