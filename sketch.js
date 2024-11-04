let state = 0
let ball;
let floor1;
let showInstructions = true;
let dots;
const dotCount = 6;
let score = 0;



function setup() {
	new Canvas(windowWidth, windowHeight);
	displayMode('centered');
	world.gravity.y = 10;

	// Create the player ball
	ball = new Sprite();
    ball.diameter = 50;
    ball.color = 'red';
    ball.x = 50; // Starting position
  

	//create lvl1 platforms
	floor1 = new Sprite(40, 600, 300, 5, 'static');
	floor1 = new Sprite(325, 500, 200, 5, 'static');
	floor1 = new Sprite(600, 600, 200, 5, 'static');
	floor1 = new Sprite(850, 500, 200, 5, 'static');
	floor1 = new Sprite(1200, 600, 300, 5, 'static');
	
	dots = new Group();
	// Add dots to the group above the first floor
    for (let i = 0; i < dotCount; i++) {
        let dot = new Sprite((i * 30) + 40, 580, 10, 10, 'static'); // Positioning the dots above the first floor
        dot.color = 'yellow'; // Set the color of the dots
        dots.add(dot); // Add the dot to the dots group

	ball.overlaps(dot, collect);
	}
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
    if (keyIsDown(UP_ARROW) ) { // Change this condition as needed to check if on the floor
        ball.vel.y = -5; // Jump velocity
    }

    // Apply gravity
    ball.vel.y += 0.5; // Gravity effect
    ball.y += ball.vel.y; // Update ball's vertical position

}
// Function to check for dot collection
function collectDots() {
    // Create a copy of the dots array to avoid modifying it while iterating
    let collectedDots = [];
    for (let dot of dots) {
        if (ball.collides(dot)) {
            score += 1; // Increase score by 1
            collectedDots.push(dot); // Mark the dot for removal
        }
    }
    // Remove collected dots from the dots group
    for (let dot of collectedDots) {
        dots.remove(dot); // Remove the dot from the group
    }
}

function collect(ball, dot){
	dot.remove();
}

console.log