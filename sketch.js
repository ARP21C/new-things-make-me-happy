let state = 0
let ball, floor;
let showInstructions = true;


function setup() {
	new Canvas(windowWidth, windowHeight);
	displayMode('centered');
	world.gravity.y = 10;

	// Create the player ball
	ball = new Sprite();
    ball.diameter = 50;
    ball.color = 'red';
    ball.x = 50; // Starting position
    ball.y = height - 100;
    ball.vel = { x: 0, y: 0 }; // Initialize velocity

	floor = new Sprite(40, 600, 80, 5, 'static');

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
			ballMovement();
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
	
	// Function for ball movement with arrow keys
function ballMovement() {
    // Move the ball left and right
    if (keyIsDown(LEFT_ARROW)) {
        ball.x -= 5; // Move left
    }
    if (keyIsDown(RIGHT_ARROW)) {
        ball.x += 5; // Move right
    }
    // Jump if the ball is on the floor
    if (keyIsDown(UP_ARROW) && ball.y >= height - 100) { // Change this condition as needed to check if on the floor
        ball.vel.y = -10; // Jump velocity
    }

    // Apply gravity
    ball.vel.y += 0.5; // Gravity effect
    ball.y += ball.vel.y; // Update ball's vertical position

}