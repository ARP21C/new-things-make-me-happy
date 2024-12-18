let state = 0
let guy1;
let guy2;
let guy3;
let guy4;
let floors = [];
let showInstructions = true;
let dots, secondDots, thirdDots, fourthDots;
const dotCount = 6;
let score = 0;
let flag;
let state3StartTime = 0;//tracks when state 2 starts
let state3Duration = 4000; //5 seconds in milliseconds
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
//let familySpeed = 4;
let familyDirection = 1;
let familyMinX, familyMaxX;
let survivalTime = 0; //track start time  of level 3
let state10StartTime = 0;//tracks when state 6 starts
let state10Duration = 4000; //5 seconds in milliseconds
let state11StartTime = 0;//tracks when state 7 starts
let state11Duration = 9000; //5 seconds in milliseconds
let state12StartTime = 0;
let state12Duration = 3000;

let belt;
let beltSpeed = 3;
let beltDirectionX = 1;
let beltDirectionY = 1;
let car;
let carSpeed = 3;
let carDirectionX = 1;
let carDirectionY = 1;
let house;
let houseSpeed = 3;
let houseDirectionX = 1;
let houseDirectionY = 1;
let velocityX = 8;

let shakeAmount = 10;
let shakeDuration = 60;
let shakeSpeed = 1;



//PRELOAD STUFF
let font1;
let font2;
let pic1;
let pic2;
let pic3;
let pic4;
let pic5;
let pic6;
let pic7;
let pic8;
let pic9;
let pic10;
let pic11;
let pic12;
let backgroundMusic;


function preload() {
    // Load the image before setup
    pic3 = loadImage("assets/vgpic3.webp"); // Ensure you provide the correct path to your image
	pic4 = loadImage("assets/vgpic4.png");
	pic5 = loadImage("assets/vgpic5.png");
	pic6 = loadImage("assets/vgpic6.png");
	pic7 = loadImage("assets/heart.webp");
	pic8 = loadImage("assets/pic8.avif");
	pic9 = loadImage("assets/pic9.png");
	pic10 = loadImage("assets/pic10.png");
	pic11 = loadImage("assets/pic11.png")
	pic12 = loadImage("assets/pic12.jpg")
	backgroundMusic = loadSound("assets/backgroundMusic.mp3");
	
}

function setup() {
	new Canvas(windowWidth, windowHeight);
	displayMode('centered');
	world.gravity.y = 10;

	
	

	// Create the player ball
	guy1 = new Sprite();
	guy1.addImage(pic3);
	guy1.x = width * 0.1; // Starting position
	guy1.y = height * 0.75;
	guy1.visible = false;
	guy1.rotation = 0; // Prevent rotation
  	guy1.angularVelocity = 0; // Ensure no angular velocity
	guy1.scale = 0.5;
 

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

			guy1.overlaps(dots, collect);
			guy1.overlaps(secondDots, collect);
			guy1.overlaps(thirdDots, collect);
			guy1.overlaps(fourthDots, collect);

			dots.forEach(dot => dot.visible = false);
			secondDots.forEach(dot => dot.visible = false);
			thirdDots.forEach(dot => dot.visible = false);
			fourthDots.forEach(dot => dot.visible = false);

			//create the flag at the end of the level
			flag = new Sprite(width * .95, height * 0.88, 30, 80, 'static');
			flag.addImage(pic4);
			flag.visible = false;

			//enable ball and flag collision check
			guy1.overlaps(flag, winLevel);
		
		

		
		
		//PRELOADING
			font1 = loadFont("assets/Copyduck.ttf");
			font2 = loadFont("assets/INFECTED.ttf");
			pic1 = loadImage("assets/VG pic 1.png");
			pic2 = loadImage("assets/vgpic2.jpg");
			
}
// Function for ball movement with arrow keys
function ballMovement() {
	// Reset angular velocity and rotation
	guy1.rotation = 0;
	guy1.angularVelocity = 0;
   // Move the ball left and right
   if (keyIsDown(LEFT_ARROW)) {
	   guy1.x -= 5; // Move left
   }
   if (keyIsDown(RIGHT_ARROW)) {
	   guy1.x += 5; // Move right
   }
   // Jump if the ball is on the floor
   if (keyIsDown(UP_ARROW)) { // Change this condition as needed to check if on the floor
	   guy1.vel.y = -15; // Jump velocity
   }

   // Apply gravity
   guy1.vel.y += 0.5; // Gravity effect
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
			guy1.visible = true; 
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
			camera.x = guy1.x; // Default: camera follows the ball
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

			//camera.on();

			//LVL 2 GAME PLAY
			background('white');
			imageMode(CENTER);
		
			image(pic6, width / 2, height / 2, 800, 500);
			floorlvl2.draw();
			floorlvl2.visible = true;
			 floorlvl2.collider = 'static';
			 
			
			//make the player ball reappear
			guy2.visible = true;
			guy2.active = true;
			guy2.draw();
			guy2.collider = "dynamic";
			
			guy2Movement();
			
			
			// Draw heart obstacles and flag for Level 2

			heartobstacles.visible = true;
			heartobstacles.forEach(heartobstacle => {
				if (heartobstacle.visible) heartobstacle.draw();
			});
			heartobstacles.collider = "static";
			
			flaglvl2.visible = true;
			if (flaglvl2.visible) flaglvl2.draw();
		

			//check if  ball collides w any obstacles
			guy2.overlaps(heartobstacles, resetguy2);

			//check if ball reaches flag
			guy2.overlaps(flaglvl2, winLevel2);

			camera.active = true;

			camera.position.x = guy2.x;
			camera.y = constrain(camera.y, height * 0.5, height); // Keep camera within bounds
			break;

		case 7:
			background('white');
			textAlign(CENTER, CENTER);
			imageMode(CENTER);
		
			image(pic8, width / 2, height / 2, 600, 350);
			strokeWeight(0);
			textAlign(CENTER, CENTER);
			textSize(24);
			fill(0);
			text("Good job! You officially bossed up by\navoiding any meaningful connections in your life.\nNow you can buy...", width / 2, height * 0.2);
			textSize(50);
			text("A Lamborghini!!!!", width / 2, height * 0.8);
			
			// Ensure state4StartTime is set when entering state 4
			if (state7StartTime === 0) {
				state7StartTime = millis(); // Record the time when state 4 starts
			}
			
			if (millis() - state7StartTime >= state7Duration) {
				state = 8;
				//survivalTime = 0; // Reset survival time counter
			
			}
			break;

		case 8:
			//LVL 3 INSTRUCTIONS
			background('white');
			textSize(width * 0.07 );
			strokeWeight(0); 
			fill(0);
			textFont(font1);
			text("Level 3:Family Bonds", width / 2, height / 3.5);

			textFont('Arial');
			textSize(20);
			text("Some poor chick married and had kids with you anyways because of your money.\n(I told you money is the key to life)\nNow you have to avoid them because they will distract you from building\nyour networth. Billionares never spend time with their families!\nWin this level by avoiding contact with your family for 10 seconds.\nPress the space bar to start.", width / 2, height / 2.5 );
			break;
			
		case 9:
			//LVL 3 GAMEPLAY

			background('white'); // Clear the screen for each frame
			stroke(0);
			strokeWeight(3);

			floorlvl3.draw();
			floorlvl3.visible = true;
			floorlvl3.collider = 'static';

			
			guy3.visible = true;
			guy3.active = true;
			guy3.draw();
			guy3.collider = "dynamic";
			 
			guy3Movement();
	
			
			// Ensure ball stays within screen bounds
            guy3.x = constrain(guy3.x, 0, width); // Constrain horizontal movement
            guy3.y = constrain(guy3.y, 0, height); // Constrain vertical movement

			// Move the family sprite horizontally based on the velocity
			family.position.x += velocityX;

			// Reverse direction if family hits the left or right edge
			if (family.position.x <= 0 || family.position.x >= width) {
			velocityX = -velocityX; // Reverse the direction
			}
			family.visible = true;
			family.draw();
			family.collider = 'dynamic';

            guy3.overlaps(family, handleCollision);

			// Display the survival timer
			textAlign(RIGHT, TOP); // Align text to the top-right corner
			textSize(32); // Set text size
			fill(0); // Set text color to black
			strokeWeight(0);
			text(`Survival Time: ${Math.floor(survivalTime)}s`, width - 20, 20);

			if (frameCount % 60 === 0) { // Increment once per second (60 FPS)
				survivalTime++;
			  }

            // Check if 10 seconds have passed
    		if (survivalTime >= 10) {
				state = 10; // Move to state 10
				winLevel3(); // Trigger win
			  }

			// Fix the camera at the center of the screen
			camera.x = width * 0.5;
			camera.y = height * 0.5;
            break;

		case 10:
			//REWARD 4 LVL 3

			background('white');
			textAlign(CENTER, CENTER);
			imageMode(CENTER);
		
			image(pic10, width / 2, height / 2, 600, 350);
			strokeWeight(0);
			textAlign(CENTER, CENTER);
			textSize(24);
			fill(0);
			text("Congrats! You are now a billionare and can afford....", width / 2, height * 0.2);
			textSize(50);
			text("A MULTIMILLION DOLLAR MANSION!!!!", width / 2, height * 0.8);
			
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

			background('white');
			textAlign(CENTER, CENTER);
			textSize(30);
			fill(0);
			strokeWeight(0);
			text("You are now 80 years old and all alone. Your wife took the kids\nand half of your money because she never really liked you, only your money.\nIn solitude, you begin to realize material items don't mean anything if you have no one to show\nthem off to and the instant gratification they brought only got more and more instant.", width / 2, height / 2);

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
			background('white');
			textAlign(CENTER, CENTER);
			textSize(48);
			fill(0);
			text("You die of old age", width / 2, height * 0.1);
			imageMode(CENTER);
		
			image(pic11, width / 2, height / 2, 500, 500);
			if (state12StartTime === 0) {
				state12StartTime = millis(); // Record the time when state 6 starts
			}
			if (millis() - state12StartTime >= state12Duration) {
				state = 13;
			}
			break;
		case 13:
			background('red');
			imageMode(CENTER);
			image(pic12,width / 2, height / 2, width, height);
			//LVL 4 INSTRUCTIONS
			textSize(width * 0.07 );
			stroke("red");
			strokeWeight(3); 
			fill("white");
			textFont(font2);
			text("LEVEL XXFHYB: HELL", width / 2, height / 3.5);

			textFont('Arial');
			textSize(20);
			text("THERE IS NO WAY TO BEAT THIS LEVEL.\nYOU ARE FOREVER TORMENTED BY YOUR MATERIAL\nITEMS FOR CHOOSING THEM AND GREED\nOVER ANYTHING MEANINFUL OR FULFILLING IN YOUR LIFE.\nPRESS SPACE TO START.", width / 2, height / 2 );
			break;
		case 14:
			//LVL 4 GAMEPLAY
			//noGravity();
			background('red');
			imageMode(CENTER);
			image(pic12,width / 2, height / 2, width, height);

			guy4.visible = true;
			guy4.draw();

			// Player movement
			if (kb.pressing('left')) guy4.vel.x = -5;
			else if (kb.pressing('right')) guy4.vel.x = 5;
			else guy4.vel.x = 0;

			if (kb.pressing('up')) guy4.vel.y = -5;
			else if (kb.pressing('down')) guy4.vel.y = 5;
			else guy4.vel.y = 0;

			// Constrain player within screen boundaries
			guy4.x = constrain(guy4.x, guy4.w / 2, width - guy4.w / 2);
			guy4.y = constrain(guy4.y, guy4.h / 2, height - guy4.h / 2);

			//make everything visible
			belt.visible = true;
			belt.draw();
			guy4.visible = true;
			guy4.draw();
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
			guy4.overlaps(belt, resetForLvl4);
			guy4.overlaps(car, resetForLvl4);
			guy4.overlaps(house, resetForLvl4);

	}
	
}


function keyPressed() {
    // Check if the space bar is pressed
    if (keyCode === 32) { // 32 is the keyCode for the space bar
		if (state === 0) {
			state = 1;
			backgroundMusic.play();
		} else if (state === 1) { 
            // Transition from instructions (state 1) to level gameplay (state 2)
            showInstructions = false; // Hide the instructions
            state = 2; // Move to level gameplay
			
        } else if (state === 5) {
			state = 6;
			lvl2Setup();
		
		}
         else if (state === 8) {
			state = 9;
			lvl3Setup();
		} else if (state === 13) {
			state = 14;
			lvl4Setup();
		}
		
    }
}

function lvl2Setup() {
	// Create the player ball
	guy2 = new Sprite();
	guy2.addImage(pic3);
	guy2.collider = 'dynamic';
	guy2.x = width * 0.1; // Starting position
	guy2.y = height * 0.8;
	guy2.visible = false;
	guy2.rotation = 0; // Prevent rotation
  	guy2.angularVelocity = 0; // Ensure no angular velocity
	guy2.scale = 0.5;
	guy2.autodraw = false;

	//LEVEL 2 SPRITES BELOW

	floorlvl2 = new Sprite(width / 2, height * 0.95, width, 5, 'static');
	floorlvl2.autodraw = false;
	floorlvl2.visible = false;
	floorlvl2.collider = 'none';

	heartobstacles = new Group();
	flaglvl2 = new Sprite (width * .95,height * 0.88,30,80);
	flaglvl2.addImage(pic4);
	flaglvl2.autodraw = false; //hidden until state 3
	flaglvl2.visible = false;
	heartobstacles.collider = 'none';
	

	for (let i = 0; i < 5; i++) {
		let heartobstacle = new Sprite(400 + i * 300, height * 0.9, 40, 40);
		heartobstacle.image = pic7;
		heartobstacle.scale = 0.20;
		heartobstacle.autodraw = false;
		heartobstacle.visible = false;
		heartobstacle.collider = 'none';
		heartobstacles.add(heartobstacle);
	}
}

function lvl3Setup() {
	// Create the player ball
	guy3 = new Sprite();
	guy3.addImage(pic3);
	guy3.collider = 'dynamic';
	guy3.x = width * 0.1; // Starting position
	guy3.y = height * 0.8;
	guy3.visible = false;
	guy3.rotation = 0; // Prevent rotation
  	guy3.angularVelocity = 0; // Ensure no angular velocity
	guy3.scale = 0.5;
	guy3.autodraw = false;

	//LEVEL 3 SPRITES BELOW
			
	floorlvl3 = new Sprite(width * 0.5, height * 0.95, width * 1, 5, 'static');
	floorlvl3.visible = false;
	floorlvl3.autodraw = false;
	floorlvl3.collider = 'none';

	//create a family sprite that moves randomly
	family = new Sprite();
	family.addImage(pic9);
	family.size = width * 0.1;
	family.x = width * 0.3;
	family.y = height * 0.9;
	family.collider = 'none';
	family.scale = 0.35;

	family.visible = false;
	family.autodraw = false;
}

function lvl4Setup() {
	//LEVEL 4 SPRITES BELOW
	 // Create player sprite
	// Create the player ball
	guy4 = new Sprite();
	guy4.addImage(pic3);
	guy4.collider = 'dynamic';
	guy4.x = width * 0.1; // Starting position
	guy4.y = height * 0.8;
	guy4.visible = false;
	guy4.rotation = 0; // Prevent rotation
  	guy4.angularVelocity = 0; // Ensure no angular velocity
	guy4.scale = 0.5;
	guy4.autodraw = false;
 
			 
	// Create the "belt" sprite
	belt = new Sprite(width * 0.1, height * 0.9, 30, 30);
	belt.addImage(pic5);
	belt.autodraw = false;
	belt.visible = false; 
	belt.collider = 'none';
	belt.scale = 0.5;
 
	//create the "car" sprite
	car = new Sprite(width * 0.5, height * 0.3, 30, 30);
	car.addImage(pic8);
	car.autodraw = false;
	car.visible = false; 
	car.collider = 'none';
	car.scale = 0.2;
 
	// Create the "house" sprite
	house = new Sprite(width * 0.2, height * 0.5, 30, 30);
	house.addImage(pic10);
	house.autodraw = false;
	house.visible = false; 
	house.collider = 'none';

	  // Handle screen shake effect if necessary
	  if (shakeDuration > 0) {
		camera.x += random(-shakeAmount, shakeAmount); // Random horizontal shake
		camera.y += random(-shakeAmount, shakeAmount); // Random vertical shake
		shakeDuration -= shakeSpeed; // Decrease shake duration over time
	  }
	
	  // Reset camera to center when the shake is finished
	  if (shakeDuration <= 0) {
		shakeDuration = 0;
		camera.x = width / 2;
		camera.y = height / 2;
	  }
	
 
}


function guy2Movement() {
	// Reset angular velocity and rotation
	guy2.rotation = 0;
	guy2.angularVelocity = 0;
   // Move the ball left and right
   if (keyIsDown(LEFT_ARROW)) {
	   guy2.x -= 5; // Move left
   }
   if (keyIsDown(RIGHT_ARROW)) {
	   guy2.x += 5; // Move right
   }
   // Jump if the ball is on the floor
   if (keyIsDown(UP_ARROW)) { // Change this condition as needed to check if on the floor
	   guy2.vel.y = -15; // Jump velocity
   }

   // Apply gravity
   guy2.vel.y += 0.5; // Gravity effect
   //ball.y += ball.vel.y; // Update ball's vertical position
}

function guy3Movement() {
	// Reset angular velocity and rotation
	guy3.rotation = 0;
	guy3.angularVelocity = 0;
   // Move the ball left and right
   if (keyIsDown(LEFT_ARROW)) {
	   guy3.x -= 5; // Move left
   }
   if (keyIsDown(RIGHT_ARROW)) {
	   guy3.x += 5; // Move right
   }
   // Jump if the ball is on the floor
   if (keyIsDown(UP_ARROW)) { // Change this condition as needed to check if on the floor
	   guy3.vel.y = -15; // Jump velocity
   }

   // Apply gravity
   guy3.vel.y += 0.5; // Gravity effect
   //ball.y += ball.vel.y; // Update ball's vertical position
}





// Function to check for dot collection
function collectDots() {
	// Create a copy of the dots array to avoid modifying it while iterating
	let collectedDots = [];
	for (let dot of dots) {
		if (guy1.collides(dot)) {
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
	guy1.remove();
	dots.remove();
	flag.remove();
	secondDots.remove();
	thirdDots.remove();
	fourthDots.remove();
	for (let floor of floors) {
		floor.remove();
	}
}



function resetBall(x = width / 2, y = height /2) {
    console.log("Resetting ball to:", x, y);
   guy1.x = x; // Use provided x or default to 50
   guy1.y = y; // Use provided y or default to height * 0.8
	guy1.visible = true; // Make the ball visible
   guy1.velocity.x = 0; // Reset horizontal velocity
    guy1.velocity.y = 0; // Reset vertical velocity
    guy1.rotation = 0; // Reset rotation
    guy1.angularVelocity = 0; // Reset angular velocity
}
function resetguy2() {
    console.log("Resetting ball to:", guy2.x, guy2.y);
	guy2.x = 40; // Starting position
	guy2.y = height * 0.75;
	guy2.visible = true; // Make the ball visible
   guy2.velocity.x = 0; // Reset horizontal velocity
    guy2.velocity.y = 0; // Reset vertical velocity
    guy2.rotation = 0; // Reset rotation
    guy2.angularVelocity = 0; // Reset angular velocity
	guy2Movement();
}

function winLevel2() {
	state = 7;
	guy2.visible = false;
	heartobstacles.forEach(heartobstacle => heartobstacle.remove());
	flaglvl2.remove();
	floorlvl2.remove();
	heartobstacles.remove();
}

//function resetState3() {
	//resetForState3();
//}

function resetLevel3() {
    // Reset the level if the ball touches the family sprite
	// Reset ball properties
	guy3.visible = true;
	guy3.x = 400; // Reset to initial position
	guy3.y = 550; // Place it on the ground level or any desired starting y-coordinate
	guy3.vel.x = 0;
	guy3.vel.y = 0;
    //family.x = width * 0.3; // Reset family position
    //family.vel.x = familySpeed; // Reset family speed
   
	// Reset survival timer
   
}

function handleCollision() {
    // Reset ball and family positions on collision
    resetLevel3();
	survivalTime = 0;

    // Keep survivalTimer intact so it doesn't reset
}

function winLevel3() {
	state = 10;

	//remove sprites
	guy3.remove();
	floorlvl3.remove();
	family.remove();
}

function resetForLvl4() {
	guy4.x = width / 2;
	guy4.y = height / 2;

	shakeScreen(); 
}

// Function to initiate the screen shake
function shakeScreen() {
	shakeAmount();
	shakeDuration();
	shakeSpeed();
  }
console.log