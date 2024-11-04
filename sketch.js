let state = 0
let ball;
let showInstructions = true;
let platforms = []; //array to hold platform sprites for level 1 only
let platformsCreated = false;

function setup() {
	new Canvas(windowWidth, windowHeight);
	displayMode('centered');

	// Create the player ball
	ball = new Sprite();
	ball.diameter = 50;
	ball.color = 'red';
	ball.x = width / 4; // Starting position
	ball.y = height - 100;

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
			}
			break;
		case 1:
			// Level 1 gameplay
			if (!platformsCreated) {
				createPlatforms();
				platformsCreated = true;
			}

			// Ball movement and gravity
			ballMovement();

			// Draw platforms and check for collisions
			for (let platform of platforms) {
				if (ball.collides(platform)) {
					ball.vel.y = 0;
					ball.y = platform.y - ball.diameter / 2;
				}
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

	// Function to create platforms for Level 1
function createPlatforms() {
	let platformPositions = [
		{ x: 150, y: height - 100 },
		{ x: 400, y: height - 150 },
		{ x: 650, y: height - 100 },
		{ x: 900, y: height - 150 },
		{ x: 1150, y: height - 100 }
	]
	for (let pos of platformPositions) {
		let platform = new Sprite();
		platform.width = 150;
		platform.height = 20;
		platform.color = 'green';
		platform.x = pos.x;
		platform.y = pos.y;
		platforms.push(platform);
}
}

// Function for ball movement with arrow keys
function ballMovement() {
	if (keyIsDown(LEFT_ARROW)) {
		ball.x -= 5;
	}
	if (keyIsDown(RIGHT_ARROW)) {
		ball.x += 5;
	}
	if (keyIsDown(UP_ARROW) && ball.vel.y === 0) { // Jump only if on a platform or ground
		ball.vel.y = -10;
	}
	ball.vel.y += 0.5; // Gravity
	ball.y += ball.vel.y;
}