let state = 0
let ball;
let floors = [];
let showInstructions = true;
let dots, secondDots, thirdDots;
const dotCount = 6;
let score = 0;
let flag;
let state3StartTime = 0;//tracks when state 2 starts
let state3Duration = 7000; //5 seconds in milliseconds
let state4StartTime = 0;
let state4Duration = 7000;
let floorlvl2;
let heartobstacles; //lvl 2 heart obstacles
let flaglvl2;

let state7StartTime = 0
let state7Duration = 4000;
let floorlvl3;
let lvl3Instructions = false;
let family;
let familySpeed = 2;
let familyDirection = 1;
let familyMinX, familyMaxX;
let survivalTimer = 0; //track start time  of level 3
let state10StartTime = 0;//tracks when state 6 starts
let state10Duration = 4000; //5 seconds in milliseconds
let state11StartTime = 0;//tracks when state 7 starts
let state11Duration = 7000; //5 seconds in milliseconds
let state12StartTime = 0;
let state12Duration = 7000;


function setup() {
	new Canvas(windowWidth, windowHeight);
	displayMode('centered');
	world.gravity.y = 10;

	// Create the player ball
	ball = new Sprite();
	ball.diameter = 50;
	ball.color = 'red';
	ball.x = width * 0.1; // Starting position
	ball.y = height * 0.75;

	camera.active = false;

	//LEVEL 1 SPRITES BELOW

		//create lvl1 platforms
		floors.push(new Sprite(width * 0.05, height * 0.95, 300, 5, 'static'));
		floors.push(new Sprite(325, height * 0.8, 200, 5, 'static'));
		floors.push(new Sprite(600, height * 0.95, 200, 5, 'static'));
		floors.push(new Sprite(850, height * 0.8, 200, 5, 'static'));
		floors.push(new Sprite(1200, height * 0.95, 300, 5, 'static'));

		dots = new Group();
		// Add dots to the group above the first floor
		for (let i = 0; i < dotCount; i++) {
			let dot = new Sprite((i * 30) + 40, height * 0.9, 10, 10, 'static'); // Positioning the dots above the first floor
			dot.color = 'yellow'; // Set the color of the dots
			dots.add(dot); // Add the dot to the dots group
		}
			// Create the second dots group
			secondDots = new Group();

			// Add dots to the group above the second floor (325, 500)
			for (let i = 0; i < dotCount; i++) {
				let dot = new Sprite((i * 30) + 250, height * 0.75, 10, 10, 'static'); // Positioning the dots above the second floor
				dot.color = 'yellow'; // Set the color of the dots
				secondDots.add(dot); // Add the dot to the second dots group
			}

			//create the third group of dots
			thirdDots = new Group();
			//add dots above the third platform
			for (let i = 0; i < dotCount; i++) {
				let dot = new Sprite((i * 30) + 525, height * 0.9, 10, 10, 'static'); // Positioning the dots above the second floor
				dot.color = 'yellow'; // Set the color of the dots
				thirdDots.add(dot); // Add the dot to the second dots group
			}
			ball.overlaps(dots, collect);
			ball.overlaps(secondDots, collect);
			ball.overlaps(thirdDots, collect);

			//create the flag at the end of the level
			flag = new Sprite(1200, height * 0.88, 30, 80, 'static');
			flag.color = 'purple';

			//enable ball and flag collision check
			ball.overlaps(flag, winLevel);
		
		//LEVEL 2 SPRITES BELOW

			floorlvl2 = new Sprite(40, height * 0.95, 4000, 5, 'static');
			floorlvl2.autodraw = false;
			floorlvl2.visible = false;

			heartobstacles = new Group();
			flaglvl2 = new Sprite (2000,height * 0.88,30,80, 'static');
			flaglvl2.color = green;
			flaglvl2.autodraw = false; //hidden until state 3
			flaglvl2.visible = false;
			

			for (let i = 0; i < 5; i++) {
				let heartobstacle = new Sprite(400 + i * 300, height * 0.9, 30, 30, 'static');
				heartobstacle.autodraw = false;
				heartobstacle.visible = false;
				heartobstacles.add(heartobstacle);
			}

		//LEVEL 3 SPRITES BELOW
			
			floorlvl3 = new Sprite(width * 0.5, height * 0.95, width * 1, 5, 'static');
			floorlvl3.visible = false;
			floorlvl3.autodraw = false;

			//create a family sprite that moves randomly
			family = new Sprite();
			family.size = width * 0.1;
			family.x = width * 0.3;
			family.y = height * 0.9;
			family.collider = 'dynamic';

			family.visible = false;
			family.autodraw = false;

			// Set the boundaries for family movement along the floor
			familyMinX = floorlvl3.x - (floorlvl3.width / 2) + (family.size / 2); // Left edge
			familyMaxX = floorlvl3.x + (floorlvl3.width / 2) - (family.size / 2); // Right edge

	
}

function draw() {
	background('skyblue');
	
	

	switch (state) {
		case 0:
		case 1:
			//level 1 intro screen

			if (showInstructions) {
				textAlign(CENTER, CENTER);
				textSize(width * 0.08);
				fill(0);
				text("Level 1: Gold Rush Valley", width / 2, height / 3);

				textSize(width * 0.025);
				text("Use the arrow keys to control your player in attempts to collect as much money as you can.", width / 2, height / 2);
				text("Beat the level by making it to the finish line and at the end of the level you will receive a reward from the money you made!", width / 2, height / 2 + 40);
				text("Press the space bar to start.", width / 2, height / 2 + 80);
			}
			break;

		case 2:
			ballMovement();
			camera.x = ball.x; // Default: camera follows the ball
			camera.y = constrain(camera.y, height * 0.5, height); // Keep camera within bounds
			break;

		case 3:
			background('skyblue');
			textAlign(CENTER, CENTER);
			textSize(48);
			fill(0);
			text("Congrats!", width / 2, height / 2);
			textSize(32);
			text(`Now you get ${score}!`, width / 2, height / 2 + 50);

			//check if 5 seconds have passed
			if (millis() - state3StartTime >= state3Duration) {
				state = 4;
				//floorlvl2.visible = true;
				//resetForState3(); //reset ball for state 3
				
			}
			break;
		case 4:
			background('white');
			//"hey man..."
			text ("x",  width / 2, height / 2);
			//check if 5 seconds have passed
			if (state4StartTime === 0) {
				state4StartTime = millis(); // Record the time when state 6 starts
			}
			//check if 5 seconds have passed
			if (millis() - state4StartTime >= state4Duration) {
				state = 5;
				floorlvl2.visible = true;
			}
			break;

		case 5:
			//LVL 2 INSTRUCTIONS
			background('skyblue');
			textAlign(CENTER, CENTER);
				textSize(width * 0.08);
				fill(0);
				text("Level 2: Love Barriers", width / 2, height / 3);

				textSize(width * 0.025);
				text("Use the arrow keys to control your player in attempts to avoid true love.", width / 2, height / 2);
				text("Beat the level by making it to the finish line while avoiding all of the potential love you could find!", width / 2, height / 2 + 40);
				text("Soulmates will distract you from making money.", width / 2, height / 2 + 80);
				text("Press the space bar to start.", width / 2, height / 2 + 120);
				
				
		case 6:
			//LVL 2 GAME PLAY

			if (floorlvl2.visible) {
				 floorlvl2.draw();
			};
			//make the player ball reappear
			ball.visible = true;
			ball.active = true;
			
			ballMovement();
			
			// Draw heart obstacles and flag for Level 2

			heartobstacles.visible = true;
			heartobstacles.forEach(heartobstacle => {
				if (heartobstacle.visible) heartobstacle.draw();
			});
			
			flaglvl2.visible = true;
			if (flaglvl2.visible) flaglvl2.draw();
		

			//check if  ball collides w any obstacles
			ball.overlaps(heartobstacles, resetForState6);

			//check if ball reaches flag
			ball.overlaps(flaglvl2, winLevel2);
			camera.x = ball.x; // Default: camera follows the ball
			camera.y = constrain(camera.y, height * 0.5, height); // Keep camera within bounds
			break;

		case 7:
			background('skyblue');
			textAlign(CENTER, CENTER);
			textSize(48);
			fill(0);
			text("Congrats!", width / 2, height / 2);
			textSize(32);
			text(`Now you get ${score}!`, width / 2, height / 2 + 50);

			// Ensure state4StartTime is set when entering state 4
			if (state7StartTime === 0) {
				state7StartTime = millis(); // Record the time when state 4 starts
			}
			
			if (millis() - state7StartTime >= state7Duration) {
				state = 8;
				survivalTime = 0; // Reset survival time counter
				resetLevel3();
			}
			break;

		case 8:
			//LVL 3 INSTRUCTIONS
			textAlign(CENTER, CENTER);
			textSize(width * 0.08);
			fill(0);
			text("Level 3: Family Bonds", width / 2, height / 3);

			textSize(width * 0.025);
			text("Use the arrow keys to control your player in attempts to avoid spending time with your family.", width / 2, height / 2);
			text("Families bring love and will distract you from building your career!", width / 2, height / 2 + 40);
			text("CEOs of companies never spend quality time with their families.", width / 2, height / 2 + 80);
			text("Win this level by surviving 10 seconds without contacting your family.", width / 2, height / 2 + 100);
			
			
		case 9:
			//LVL 3 GAMEPLAY

			background('skyblue'); // Clear the screen for each frame

			floorlvl3.visible = true;
			if (floorlvl3.visible) floorlvl3.draw();

			//ball reappears
			ball.visible = true;
			ball.active = true;
			ballMovement();

			
			// Ensure ball stays within screen bounds
            ball.x = constrain(ball.x, 0, width); // Constrain horizontal movement
            ball.y = constrain(ball.y, 0, height); // Constrain vertical movement

			family.visible = true;
			family.draw();

            // Family sprite moves randomly in level 3
			let speed = 4; // Movement speed
			family.x += speed * familyDirection;

			// Reverse direction if family reaches the left or right edge
			if (family.x <= familyMinX || family.x >= familyMaxX) {
				family.vel.x *= -1; // Reverse horizontal direction
			}
            ball.overlaps(family, handleCollision);

			// Update survival timer (increment every frame)
			if (frameCount % 60 === 0) { // Increment once per second (60 FPS)
				survivalTime++;
			}

			// Display the survival timer
			textAlign(RIGHT, TOP); // Align text to the top-right corner
			textSize(32); // Set text size
			fill(0); // Set text color to black
			text(`Survival Time: ${Math.floor(survivalTimer / 1000)}s`, width - 20, 20); // Show the timer in seconds

            // Check if 10 seconds have passed
    		if (survivalTime >= 10) {
       			 state = 10; // Move to state 6
				 winLevel3();
    		}

			// Fix the camera at the center of the screen
			camera.x = width * 0.5;
			camera.y = height * 0.5;
            break;

		case 10:
			//REWARD 4 LVL 3

			background('skyblue');
			textAlign(CENTER, CENTER);
			textSize(48);
			fill(0);
			text("Congrats!", width / 2, height / 2);
			textSize(32);
			text(`Now you get ${score}!`, width / 2, height / 2 + 50);

			// Ensure state6StartTime is set when entering state 6
			if (state10StartTime === 0) {
				state10StartTime = millis(); // Record the time when state 6 starts
			}
			//check if 5 seconds have passed
			if (millis() - state10StartTime >= state10Duration) {
				state = 11;
			}
			break;
		case 11:
			//REALIZATION

			background('skyblue');
			textAlign(CENTER, CENTER);
			textSize(48);
			fill(0);
			text("u are now 80...", width / 2, height / 2);
			textSize(32);

			// Ensure state7StartTime is set when entering state 6
			if (state11StartTime === 0) {
				state11StartTime = millis(); // Record the time when state 6 starts
			}
			if (millis() - state11StartTime >= state11Duration) {
				state = 12;
			}
			break;
		case 12:
			//U DIE
			background('skyblue');
			textAlign(CENTER, CENTER);
			textSize(48);
			fill(0);
			text("u die lol", width / 2, height / 2);
			textSize(32);
			if (state12StartTime === 0) {
				state12StartTime = millis(); // Record the time when state 6 starts
			}
			if (millis() - state12StartTime >= state12Duration) {
				state = 13;
			}
			break;
		case 13:
			background('red');
			break;
	}
	
}


function keyPressed() {
	// Check if an space bar is pressed to start the level
	if (keyCode === 32) { // 32 is the keyCode for the space bar
        showInstructions = false; // Hide the instructions
        state = 2; // Move to the actual level gameplay
		//lvl3Instructions.visible = false;
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
	//ball.y += ball.vel.y; // Update ball's vertical position

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
	log("winlevel")
	state = 3;//move to win state

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
function resetForState6() {
    // Reset ball properties
    ball.visible = true;
    ball.x = 50; // Reset to initial position
    ball.y = 550; // Place it on the ground level or any desired starting y-coordinate
    ball.vel.x = 0;
    ball.vel.y = 0;
}

function winLevel2() {
	state = 7;
	ball.visible = false;
	heartobstacles.forEach(heartobstacle => heartobstacle.remove());
	flaglvl2.remove();
	floorlvl2.remove();
}

//function resetState3() {
	//resetForState3();
//}

function resetLevel3() {
    // Reset the level if the ball touches the family sprite
	// Reset ball properties
	ball.visible = true;
	ball.x = 400; // Reset to initial position
	ball.y = 550; // Place it on the ground level or any desired starting y-coordinate
	ball.vel.x = 0;
	ball.vel.y = 0;
    family.x = width * 0.3; // Reset family position
    family.vel.x = familySpeed; // Reset family speed
   
	// Reset survival timer
   
}

function handleCollision() {
    // Reset ball and family positions on collision
    resetLevel3();

    // Keep survivalTimer intact so it doesn't reset
}

function winLevel3() {
	state = 10;

	//remove sprites
	ball.visible = false;
	floorlvl3.remove();
	family.remove();
}
console.log