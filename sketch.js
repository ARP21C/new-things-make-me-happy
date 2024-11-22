let state = 0
let ball;
let floors = [];
let showInstructions = true;
let dots, secondDots, thirdDots, fourthDots;
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
let playerLvl4;
let belt;
let beltSpeed = 2;
let beltDirectionX = 1;
let beltDirectionY = 1;
let car;
let carSpeed = 2;
let carDirectionX = 1;
let carDirectionY = 1;
let house;
let houseSpeed = 2;
let houseDirectionX = 1;
let houseDirectionY = 1;


//PRELOAD STUFF
let font1;
let pic1;
let pic2;
let pic3;
let pic4;
let pic5;
let pic6;



function preload() {
    // Load the image before setup
    pic3 = loadImage("assets/vgpic3.webp"); // Ensure you provide the correct path to your image
	pic4 = loadImage("assets/vgpic4.png");
	pic5 = loadImage("assets/vgpic5.png");
	pic6 = loadImage("assets/vgpic6.png");
	
}

function setup() {
	new Canvas(windowWidth, windowHeight);
	displayMode('centered');
	world.gravity.y = 10;

	// Create the player ball
	ball = new Sprite();
	ball.addImage(pic3);
	ball.x = width * 0.1; // Starting position
	ball.y = height * 0.75;
	ball.visible = false;
	ball.rotation = 0; // Prevent rotation
  	ball.angularVelocity = 0; // Ensure no angular velocity
	ball.scale = 0.5;
 

	camera.active = false;

	//LEVEL 1 SPRITES BELOW

		//create lvl1 platforms
		floors.push(new Sprite(width * 0.05, height * 0.95, 300, 5, 'static'));
		floors.push(new Sprite(width * .25, height * 0.8, 300, 5, 'static'));
		floors.push(new Sprite(width * .5, height * 0.95, 300, 5, 'static'));
		floors.push(new Sprite(width * .7, height * 0.8, 300, 5, 'static'));
		floors.push(new Sprite(width * .95, height * 0.95, 300, 5, 'static')); 
		
		// Set visibility to false for all floor sprites
		for (let i = 0; i < floors.length; i++) {
			floors[i].color = color(255, 215, 0);
			floors[i].visible = false;

		  }

		dots = new Group();
		
		// Add dots to the group above the first floor
		for (let i = 0; i < dotCount; i++) {
			let dot = new Sprite((i * 30) +40, height * 0.9, 10, 10, 'static'); // Positioning the dots above the first floor
			dot.text = "💰"; // Set the text of the dot to the money emoji
    		dot.font = 'Arial'; // You can choose a font, but most fonts will support the emoji
   			 dot.textSize = 24; // Adjust the size of the emoji
			dots.add(dot); // Add the dot to the dots group
		}

		

			// Create the second dots group
			secondDots = new Group();

			// Add dots to the group above the second floor (325, 500)
			for (let i = 0; i < dotCount; i++) {
				let dot = new Sprite((i * 30) + 400, height * 0.75, 10, 10, 'static'); // Positioning the dots above the second floor
				dot.text = "💰"; // Set the text of the dot to the money emoji
    			dot.font = 'Arial'; // You can choose a font, but most fonts will support the emoji
    			dot.textSize = 24; // Adjust the size of the emoji
				secondDots.add(dot); // Add the dot to the second dots group
			}

		

			//create the third group of dots
			thirdDots = new Group();
			//add dots above the third platform
			for (let i = 0; i < dotCount; i++) {
				let dot = new Sprite((i * 30) + 900 , height * 0.9, 10, 10, 'static'); // Positioning the dots above the second floor
				dot.text = "💰"; // Set the text of the dot to the money emoji
    			dot.font = 'Arial'; // You can choose a font, but most fonts will support the emoji
    			dot.textSize = 24; // Adjust the size of the emoji
				thirdDots.add(dot); // Add the dot to the second dots group
			}

			//create the fourth group of dots
			fourthDots = new Group();
			//add dots above the third platform
			for (let i = 0; i < dotCount; i++) {
				let dot = new Sprite((i * 30) + 1300 , height * 0.75, 10, 10, 'static'); // Positioning the dots above the second floor
				dot.text = "💰"; // Set the text of the dot to the money emoji
    			dot.font = 'Arial'; // You can choose a font, but most fonts will support the emoji
   				 dot.textSize = 24; // Adjust the size of the emoji
				fourthDots.add(dot); // Add the dot to the second dots group
			}

			ball.overlaps(dots, collect);
			ball.overlaps(secondDots, collect);
			ball.overlaps(thirdDots, collect);
			ball.overlaps(fourthDots, collect);

			dots.forEach(dot => dot.visible = false);
			secondDots.forEach(dot => dot.visible = false);
			thirdDots.forEach(dot => dot.visible = false);
			fourthDots.forEach(dot => dot.visible = false);

			//create the flag at the end of the level
			flag = new Sprite(width * .95, height * 0.88, 30, 80, 'static');
			flag.addImage(pic4);
			flag.visible = false;

			//enable ball and flag collision check
			ball.overlaps(flag, winLevel);
		
		//LEVEL 2 SPRITES BELOW

			floorlvl2 = new Sprite(40, height * 0.95, 4000, 5, 'static');
			floorlvl2.autodraw = false;
			floorlvl2.visible = false;
			floorlvl2.collider = 'none';

			heartobstacles = new Group();
			flaglvl2 = new Sprite (2000,height * 0.88,30,80);
			flaglvl2.color = green;
			flaglvl2.autodraw = false; //hidden until state 3
			flaglvl2.visible = false;
			heartobstacles.collider = 'none';
			

			for (let i = 0; i < 5; i++) {
				let heartobstacle = new Sprite(400 + i * 300, height * 0.9, 30, 30);
				heartobstacle.autodraw = false;
				heartobstacle.visible = false;
				heartobstacle.collider = 'none';
				heartobstacles.add(heartobstacle);
			}

		//LEVEL 3 SPRITES BELOW
			
			floorlvl3 = new Sprite(width * 0.5, height * 0.95, width * 1, 5, 'static');
			floorlvl3.visible = false;
			floorlvl3.autodraw = false;
			floorlvl3.collider = 'none';

			//create a family sprite that moves randomly
			family = new Sprite();
			family.size = width * 0.1;
			family.x = width * 0.3;
			family.y = height * 0.9;
			family.collider = 'none';

			family.visible = false;
			family.autodraw = false;

			// Set the boundaries for family movement along the floor
			familyMinX = floorlvl3.x - (floorlvl3.width / 2) + (family.size / 2); // Left edge
			familyMaxX = floorlvl3.x + (floorlvl3.width / 2) - (family.size / 2); // Right edge

		//LEVEL 4 SPRITES BELOW
			 // Create player sprite
  			playerLvl4 = new Sprite(width / 2, height / 2, 40, 40); // Positioned at center
			playerLvl4.autodraw = false;
			playerLvl4.visible = false;
			playerLvl4.collider = 'none';

			
  			// Create the "belt" sprite
  			belt = new Sprite(width * 0.1, height * 0.9, 30, 30);
			belt.autodraw = false;
			belt.visible = false; 
			belt.collider = 'none';

			//create the "car" sprite
			car = new Sprite(width * 0.5, height * 0.3, 30, 30);
			car.autodraw = false;
			car.visible = false; 
			car.collider = 'none';

			// Create the "house" sprite
 			 house = new Sprite(width * 0.2, height * 0.5, 30, 30);
			house.autodraw = false;
			house.visible = false; 
			house.collider = 'none';

		//PRELOADING
			font1 = loadFont("assets/Copyduck.ttf");
			pic1 = loadImage("assets/VG pic 1.png");
			pic2 = loadImage("assets/vgpic2.jpg");
			
}
// Function for ball movement with arrow keys
function ballMovement() {
	// Reset angular velocity and rotation
	ball.rotation = 0;
	ball.angularVelocity = 0;
   // Move the ball left and right
   if (keyIsDown(LEFT_ARROW)) {
	   ball.x -= 5; // Move left
   }
   if (keyIsDown(RIGHT_ARROW)) {
	   ball.x += 5; // Move right
   }
   // Jump if the ball is on the floor
   if (keyIsDown(UP_ARROW)) { // Change this condition as needed to check if on the floor
	   ball.vel.y = -15; // Jump velocity
   }

   // Apply gravity
   ball.vel.y += 0.5; // Gravity effect
   //ball.y += ball.vel.y; // Update ball's vertical position
}

function draw() {
	background('skyblue');
	ballMovement();
	

	switch (state) {
		case 0:
			background('white');
			// Set up text styling for the text
			textAlign(LEFT,CENTER);
			textFont('Arial'); // You can change this to any font you prefer

			// Set color for "Welcome to:"
			fill(0); // Black color
			textSize(50); // Medium text size based on screen width
			text("welcome to:", width * 0.1, height * 0.3); // Position at 1/3 of the width and a bit below the top

			// Set color for "NEW THINGS MAKE ME HAPPY"
			textFont(font1);
			fill(0, 255, 0); // Bright light green
			stroke(0); // Black stroke
			strokeWeight(2); // Thin stroke
			textSize(150); // Very large text size
			text("NEW THINGS\nMAKE ME HAPPY", width * 0.1, height * 0.45); 

			// Set up text for "A game celebrating the thrills of capitalism!"
			textFont('Arial');
			textAlign(CENTER,CENTER);
			strokeWeight(0);
			fill(0); // Black color
			textSize(30); // Slightly smaller than "Welcome to:"
			text("A game celebrating the thrills of capitalism!", width * 0.5, height * 0.8); // Centered text below the first part

			// Set up text for "(Press space to start)"
			fill(0); // Black color
			textSize(20); // Smaller text size
			text("(Press space to start)", width * 0.5, height * 0.9); // Centered at the bottom

			image(pic1, (2/3) * width, height / 95, 500, 500);
			break;
		case 1:
			//level 1 intro screen
			background('white');
			image(pic2, 0, 0, width, height);
			
			if (showInstructions) {
				textAlign(CENTER, CENTER);
				textSize(width * 0.07 );
				stroke(0);
				strokeWeight(3); 
				fill(255, 215, 0);
				textFont(font1);
				text("Level 1: Gold Rush Valley", width / 2, height / 3.5);

				textFont('Arial');
				textSize(20);
				text("Use the arrow keys to control your player.\nBeat the level by reaching the flag.\nTry to collect as much money as you can!\nCollect more money for a better designer item.\nThis is important because how many expensive things\n you have determines your happiness.\n(Press space to start.)", width / 2, height / 2.5 );
				
			}
			
			break;

		case 2:
			//LVL 1 GAME PLAY
			background('white'); 
			image(pic2, 0, 0, width, height);

			//visibility
			ball.visible = true; 
			// Set visibility for all dot groups
			dots.forEach(dot => dot.visible = true);
			secondDots.forEach(dot => dot.visible = true);
			thirdDots.forEach(dot => dot.visible = true);
			fourthDots.forEach(dot => dot.visible = true);
			// Set visibility to false for all floor sprites
		for (let i = 0; i < floors.length; i++) {
			floors[i].visible = true;
		  }
			
			floors.visible = true;
			flag.visible = true;
			camera.x = ball.x; // Default: camera follows the ball
			camera.y = constrain(camera.y, height * 0.5, height); // Keep camera within bounds
			break;

		case 3:
			background('white');
			let aspectRatio = pic5.width / pic5.height;
			let newWidth = 500;
			let newHeight = newWidth / aspectRatio;
			image(pic5, (width - newWidth) / 2, (height - newHeight) / 2, newWidth, newHeight);
			strokeWeight(0);
			textAlign(CENTER, CENTER);
			textSize(24);
			fill(0);
			text("You made so much money!\nNow you can buy a...", width / 2, height * 0.3);
			textSize(50);
			text("Gucci Belt!!!!", width / 2, height * 0.4);
			textSize(25);
			text("So much instant gratification!!!", width / 2, height * 0.6);

			//check if 5 seconds have passed
			if (state3StartTime === 0) {
				state3StartTime = millis(); // Record the time when state 4 starts
			}
			
			if (millis() - state3StartTime >= state3Duration) {
				state = 4;
				//floorlvl2.visible = true;
				//resetForState3(); //reset ball for state 3
				
			}
			break;
		case 4:
			background('white');
			image(pic3, width * .2, height / 2);
			strokeWeight(0);
			strokeWeight(0);
			textAlign(CENTER, CENTER);
			textSize(24);
			fill(0);
			text("Hey man, this belt made me realize\nmoney IS the point of life.\nMoney allows me to buy expensive\nbrand name items that make me\ncooler than everyone else and get\nattention from the ladiesssss.", width /2 , height / 2);
			//check if 5 seconds have passed
			if (state4StartTime === 0) {
				state4StartTime = millis(); // Record the time when state 6 starts
			}
			//check if 5 seconds have passed
			if (millis() - state4StartTime >= state4Duration) {
				state = 5;
				floorlvl2.visible = true;
				resetForState6();
		
			}
			break;

		case 5:
			//LVL 2 INSTRUCTIONS
			background('white');
			
			
				textSize(width * 0.07 );
				stroke(0);
				strokeWeight(3); 
				fill(255, 0, 0);
				textFont(font1);
				text("Level 2:Love Barriers", width / 2, height / 3.5);

				textFont('Arial');
				textSize(20);
				text("Now that you've dedicated your life to becoming rich,\nyou have to avoid many distractions,\nsuch as finding true love.\nJump over the love barriers and make it\nto the finish line to be able to afford\nanother luxury item! Use the arrow keys\nto control your player and press the space bar to start.", width / 2, height / 2.5 );
			
			break;
				
		case 6:
			//LVL 2 GAME PLAY
			background('white');
	
			image(pic6, width / 2 - pic6.width / 2, height / 2 - pic6.height / 2);
			if (floorlvl2.visible) floorlvl2.draw();
			 floorlvl2.collider = 'static';
			 
			
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
			ball.overlaps(heartobstacles, resetBall);

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
			//LVL 4 INSTRUCTIONS
			break;
		case 14:
			//LVL 4 GAMEPLAY
			noGravity();
			background('red');
			// Player movement
			if (kb.pressing('left')) playerLvl4.vel.x = -5;
			else if (kb.pressing('right')) playerLvl4.vel.x = 5;
			else playerLvl4.vel.x = 0;

			if (kb.pressing('up')) playerLvl4.vel.y = -5;
			else if (kb.pressing('down')) playerLvl4.vel.y = 5;
			else playerLvl4.vel.y = 0;

			// Constrain player within screen boundaries
			playerLvl4.x = constrain(playerLvl4.x, playerLvl4.w / 2, width - playerLvl4.w / 2);
			playerLvl4.y = constrain(playerLvl4.y, playerLvl4.h / 2, height - playerLvl4.h / 2);

			//make everything visible
			belt.visible = true;
			belt.draw();
			playerLvl4.visible = true;
			playerLvl4.draw();
			car.visible = true;
			car.draw();
			house.visible = true;
			house.draw();

			// Move the "belt" sprite
			belt.x += beltSpeed * beltDirectionX;
			belt.y += beltSpeed * beltDirectionY;

			//move the "car" sprite
			car.x += carSpeed * carDirectionX;
			car.y += carSpeed * carDirectionY;

			house.x += houseSpeed * houseDirectionX;
			house.y += houseSpeed * houseDirectionY;

			// Reverse direction on hitting canvas boundaries
			if (belt.x < belt.w / 2 || belt.x > width - belt.w / 2) {
				beltDirectionX *= -1; // Reverse horizontal movement
			}
			if (belt.y < belt.h / 2 || belt.y > height - belt.h / 2) {
				beltDirectionY *= -1; // Reverse vertical movement
			}

			//reverse direction on hitting canvas boundaries
			if (car.x < car.w /2 || car.x > width - car.w /2) {
				carDirectionX *= -1;
			}
			if (car.y < car.h / 2 || car.y > height - car.h / 2) {
				carDirectionY *= -1; // Reverse vertical movement
			}

			// Reverse direction on hitting canvas boundaries
			if (house.x < house.w / 2 || house.x > width - house.w / 2) {
				houseDirectionX *= -1; // Reverse horizontal movement
			}
			if (house.y < house.h / 2 || house.y > height - house.h / 2) {
				houseDirectionY *= -1; // Reverse vertical movement
			}

			//collisions
			playerLvl4.overlaps(belt, resetForLvl4);
			playerLvl4.overlaps(car, resetForLvl4);
			playerLvl4.overlaps(house, resetForLvl4);

	}
	
}


function keyPressed() {
    // Check if the space bar is pressed
    if (keyCode === 32) { // 32 is the keyCode for the space bar
		if (state === 0) {
			state = 1;
		} else if (state === 1) { 
            // Transition from instructions (state 1) to level gameplay (state 2)
            showInstructions = false; // Hide the instructions
            state = 2; // Move to level gameplay
			
        } else if (state === 5) {
			state = 6;
			resetBall();
		
		}
         else if (state === 8) {
			state = 9;
		} else if (state === 13) {
			state = 14;
		}
		
    }
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

function collect(ball, fourthDots) {
	fourthDots.remove();
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
	fourthDots.remove();
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

//function resetBall(x = width / 2, y = height /2) {
   // console.log("Resetting ball to:", x, y);
   // ball.x = x; // Use provided x or default to 50
   // ball.y = y; // Use provided y or default to height * 0.8
    //ball.visible = true; // Make the ball visible
   // ball.velocity.x = 0; // Reset horizontal velocity
    //ball.velocity.y = 0; // Reset vertical velocity
    //ball.rotation = 0; // Reset rotation
   // ball.angularVelocity = 0; // Reset angular velocity
//}

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

function resetForLvl4() {
	playerLvl4.x = width / 2;
	playerLvl4.y = height / 2;
}
console.log