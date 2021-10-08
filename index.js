const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

async function restartGame() {
  let playAgain = await ask(
    "\nWould you like to play again?\nPress Y to restart, or any other key to exit the game"
  );
  if (playAgain.toLowerCase() === "y") {
    spaceEscape();
  } else {
    console.log("\nThank you for playing!\n");
    process.exit();
  }
}
//global variable declarations

//class constructor for each scene
class Scene {
  constructor(
    scene,
    location,
    description,
    option1,
    option2,
    option3,
    moveableItem,
    stationaryItem
  ) {
    this.scene = scene;
    this.location = location;
    this.desc = description;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.moveableItem = moveableItem || "";
    this.stationaryItem = stationaryItem || "";
  }

  async roomLooper() {
    console.log(this.desc);
    console.log(`[ You are currently in ${this.location} ]`);
    console.log("\nWhat would you like to do?\n");
    console.log(`1) ${this.option1}`);
    console.log(`2) ${this.option2}`);
    console.log(`3) ${this.option3}`);
  }
}

let sceneOne = new Scene(
  "sceneOne",
  "The Bridge",
  "\nThe bridge of the Iron Comet is in disarray.\nExposed wires spark and consoles smoke.\nYou look around and see the body of the pilot next to a desk,\na key card around his neck.\nThe alarm continues to blare it's ominous message...\n",
  "Take the key card",
  "Wait for help",
  "Take the body for burial",
  "key card"
);

let sceneTwo = new Scene(
  "sceneTwo",
  "The Bridge",
  '\nYou put the key card around your neck\nand head to the closed door ahead. There is a small plaque\nnext to the keypad. It reads as follows...\n\n"A grandfather, two fathers and two sons went to the movie theater together\nand everyone bought one movie ticket each. How many tickets did they buy\nin total?"\nPush your answer into the keypad to continue. Choose wisely...\n',
  "Push 3 into the keypad",
  "Push 4 into the keypad",
  "Push 5 into the keypad"
);

spaceEscape();

async function spaceEscape() {
  //variable declarations for spaceEscape
  let userCommand;
  let inBridge = true;
  let inventory = ["you currently have nothing in your inventory"];
  let sceneOneLocked = true;
  let sceneTwoLocked = true;

  const welcomeMessage = `
Welcome to Space Escape. The text based adventure 
game which only ends two ways... You escaping your 
beloved but damaged ship, or succumbing to an untimely 
death in the cold void of space... Good luck! 

  `;

  console.log(welcomeMessage);
  let answer = await ask("Press any key to continue >_");

  const rules = `
Before we begin please take note of the following:

1) If at any point in the game you would like to quit, type "exit"

2) If at any point you would like to view your current inventory, type "i"

Thanks for reading! Happy adventuring! 
  `;

  console.log(rules);

  answer = await ask("Press any key to continue >_");

  const intro = `
You awake in a daze, head pounding and body aching. Through 
blurry eyes you can see you are on the Bridge of your trusty 
starship the "Iron Comet". Red lights flash and sirens blare 
as a mechanical voice repeats itself: "Warning, engine failure 
detected. Navagation offline. Please make your way to the 
escape pod." You have no recollection of how this happened.
What the heck is going on around here?...
  `;

  console.log(intro);

  sceneOne.roomLooper();
  userCommand = await ask("\nChoose an option >_");

  while (sceneOneLocked) {
    if (userCommand === "1") {
      console.log(sceneOne.moveableItem);
      inventory.pop();
      inventory.push(sceneOne.moveableItem);
      console.log(`
You picked up the ${sceneOne.moveableItem}`);
      sceneOneLocked = false;
      break;
    } else if (userCommand === "2") {
      sceneOneLocked = false;
      console.log(
        "\nYou wait for help but nobody seems to come.\nThe ships engines fail and you drift aimlessly through space.\nThat is, until you hit and astroid and shatter into oblivion with\nthe ship. At least you died quickly.... GAME OVER!"
      );
      restartGame();
    } else if (userCommand === "3") {
      console.log(
        "As sad as it is to leave a comrade behind,\nhe is too heavy to carry out the door."
      );
    } else {
      console.log(
        "That is not a valid command. Please choose one of the numbered options"
      );
    }
    userCommand = await ask("\nChoose an option >_");
  }

  //beginning of scene two
  sceneTwo.roomLooper();
  userCommand = await ask("\nChoose an option >_");

  while (sceneTwoLocked) {
    if (userCommand === "1") {
      console.log(`
The indicator light on the door flashes green and slides open.
You eagerly leave this eerie scene behind and make your way into 
the main corridor. The alarm continues to sound...
  `);
      sceneTwoLocked = false;
      break;
    } else if (userCommand === "2" || userCommand === "3") {
      console.log(`
The indicator light flashes red and the keypad smokes starting a small fire.
You mash at the the numbers furiously but to no avail. It is broken beyond repair.
You perish in the blaze of fire that ensues... GAME OVER!
`);
      process.exit();
    } else {
      console.log(
        "That is not a valid command. Please choose one of the numbered options"
      );
    }
    userCommand = await ask("\nChoose an option >_");
  }
  console.log("moving forward...");
}

//allows user to exit game at any
// if (userCommand[0] === "exit") {
//   let exitGame = await ask(
//     "Are you sure you want to quit the game?\nType exit again to confirm >_"
//   );
//   if (exitGame === "exit") {
//     console.log("Thank you for playing!");
//     process.exit();
//   }
// }

// if (userCommand[0] === "look") {
//   console.log(bridge.description);
//
