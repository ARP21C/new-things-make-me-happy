let state = 0
let ball;
let floors = [];
let showInstructions = true;
let dots, secondDots, thirdDots;
const dotCount = 6;
let score = 0;
let flag;
let state2StartTime = 0;//tracks when state 2 starts
let state2Duration = 7000; //5 seconds in milliseconds
let floorlvl2;
let heartobstacles; //lvl 2 heart obstacles
let flaglvl2;




function setup() {
	new Canvas(windowWidth, windowHeight);
	displayMode('centered');
	world.gravity.y = 10;

	// Create the player ball
	ball = new Sprite();
	ball.diameter = 50;
	ball.color = 'red';
	ball.x = 50; // Starting position
	ball.y = 550;

	//LEVEL 1 SPRITES BELOW

		//create lvl1 platforms
		floors.push(new Sprite(40, 600, 300, 5, 'static'));
		floors.push(new Sprite(325, 500, 200, 5, 'static'));
		floors.push(new Sprite(600, 600, 200, 5, 'static'));
		floors.push(new Sprite(850, 500, 200, 5, 'static'));
		floors.push(new Sprite(1200, 600, 300, 5, 'static'));

		dots = new Group();
		// Add dots to the group above the first floor
		for (let i = 0; i < dotCount; i++) {
			let dot = new Sprite((i * 30) + 40, 580, 10, 10, 'static'); // Positioning the dots above the first floor
			dot.color = 'yellow'; // Set the color of the dots
			dots.add(dot); // Add the dot to the dots group
		}
			// Create the second dots group
			secondDots = new Group();

			// Add dots to the group above the second floor (325, 500)
			for (let i = 0; i < dotCount; i++) {
				let dot = new Sprite((i * 30) + 250, 480, 10, 10, 'static'); // Positioning the dots above the second floor
				dot.color = 'yellow'; // Set the color of the dots
				secondDots.add(dot); // Add the dot to the second dots group
			}

			//create the third group of dots
			thirdDots = new Group();
			//add dots above the third platform
			for (let i = 0; i < dotCount; i++) {
				let dot = new Sprite((i * 30) + 525, 580, 10, 10, 'static'); // Positioning the dots above the second floor
				dot.color = 'yellow'; // Set the color of the dots
				thirdDots.add(dot); // Add the dot to the second dots group
			}
			ball.overlaps(dots, collect);
			ball.overlaps(secondDots, collect);
			ball.overlaps(thirdDots, collect);

			//create the flag at the end of the level
			flag = new Sprite(1200, 550, 30, 80, 'static');
			flag.color = 'purple';

			//enable ball and flag collision check
			ball.overlaps(flag, winLevel);
		
		//LEVEL 2 SPRITES BELOW

			floorlvl2 = new Sprite(40, 600, 2000, 5, 'static');
			floorlvl2.autodraw = false;
			floorlvl2.visible = false;

			heartobstacles = new Group();
			flaglvl2 = new Sprite (1800,550,30,80, 'static');
			flaglvl2.autodraw = false; //hidden until state 3
			flaglvl2.visible = false;
			

			for (let i = 0; i < 5; i++) {
				let heartobstacle = new Sprite(400 + i * 300, 570, 30, 30, 'static');
				heartobstacle.autodraw = false;
				heartobstacle.visible = false;
				heartobstacles.add(heartobstacle);
			}

	
}

function draw() {
	background('skyblue');

	//set the camera's x position to the ball's x position
	camera.x = ball.x;

	//constrain the camera to stay within the boundaries
	camera.x = constrain(camera.x, 200, 1050);

	switch (state) {
		case 0:
			//level 1 intro screen
			if (showInstructions) {
				textAlign(CENTER, CENTER);
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

		case 2:
			background('skyblue');
			textAlign(CENTER, CENTER);
			textSize(48);
			fill(0);
			text("Congrats!", width / 2, height / 2);
			textSize(32);
			text(`Now you get ${score}!`, width / 2, height / 2 + 50);

			//check if 5 seconds have passed
			if (millis() - state2StartTime >= state2Duration) {
				state = 3;
				floorlvl2.visible = true;
				resetForState3(); //reset ball for state 3
				
			}
			break;

		case 3:
			if (floorlvl2.visible) floorlvl2.draw();
			
			//make the player ball reappear
			ball.visible = true;
			ball.active = true;
			
			ballMovement();
			
			// Draw heart obstacles and flag for Level 2
			heartobstacles.forEach(heartobstacle => {
				if (heartobstacle.visible) heartobstacle.draw();
			});
			
			if (flaglvl2.visible) flaglvl2.draw();
		

			//check if  ball collides w any obstacles
			ball.overlaps(heartobstacles, resetState3);

			//check if ball reaches flag
			ball.overlaps(flaglvl2, winLevel2);
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
	if (keyIsDown(UP_ARROW)) { // Change this condition as needed to check if on the floor
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

function collect(ball, dot) {
	dot.remove();
}

function collect(ball, secondDots) {
	secondDots.remove();
}

function collect(ball, thirdDots) {
	thirdDots.remove();
}

function winLevel() {
	log("whiinlevel")
	state = 2;//move to win state

	// Remove everything from level 1
	ball.visible = false;
	dots.remove();
	flag.remove();
	secondDots.remove();
	thirdDots.remove();
	for (let floor of floors) {
		floor.remove();
	}
}

	// Reset function to prepare for state 3
function resetForState3() {
    // Reset ball properties
    ball.visible = true;
    ball.x = 50; // Reset to initial position
    ball.y = 550; // Place it on the ground level or any desired starting y-coordinate
    ball.vel.x = 0;
    ball.vel.y = 0;
}

function winLevel2() {
	state = 4;
	ball.visible = false;
	heartobstacles.forEach(heartobstacle => heartobstacle.remove());
	flaglvl2.remove();
}

function resetState3() {
	resetForState3();
}

console.log