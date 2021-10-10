const { count } = require("console");
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

//global variable declarations
let userCommand;
let inventory = ["you currently have nothing in your inventory"];
let elevatorOpen = false;

async function restartGame() {
  let playAgain = await ask(
    "\nWould you like to play again?\nPress Y to restart, or any other key to exit the game >_"
  );
  if (playAgain.toLowerCase() === "y") {
    spaceEscape();
  } else {
    console.log("\nThank you for playing!\n");
    process.exit();
  }
}

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
    stationaryItem,
    roomInventory
  ) {
    this.scene = scene;
    this.location = location;
    this.desc = description;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.moveableItem = moveableItem || "";
    this.stationaryItem = stationaryItem || "";
    this.roomInventory = roomInventory || "";
  }

  async roomLooper() {
    console.log(this.desc);
    console.log(`[ You are currently in ${this.location} ]`);
    console.log("\nWhat would you like to do?\n");
    console.log(`1) ${this.option1}`);
    console.log(`2) ${this.option2}`);
    console.log(`3) ${this.option3}`);

    if (!this.roomInventory === undefined) {
      console.log(`4) Pick up ${this.roomInventory}`);
    }
  }

  //***need to finish functionality of this function. currently does not drop or push item
  async drop() {
    if (inventory.includes("you currently have nothing in your inventory")) {
      return console.log("You have nothing to drop");
    } else {
      let count = 1;
      inventory.map(function (item) {
        console.log(`${count}) ${item}`);
        count++;
      });
      let dropItem = await ask("What would your like to drop?");
    }
  }
}

let sceneOne = new Scene(
  "sceneOne",
  "The Bridge",
  `
The bridge of the Iron Comet is in disarray.
Exposed wires spark and consoles smoke.You look 
around and see the body of the pilot next to a 
control panel, a key card around his neck. 
The alarm continues to blare it's ominous message...
`,
  "Take the key card",
  "Wait for help",
  "Take the body for burial",
  "key card"
);

let sceneTwo = new Scene(
  "sceneTwo",
  "The Bridge Exit",
  `
You put the key card around your neck and head to the 
closed door ahead. There is a small plaque next to the keypad. 
It reads as follows... 
"A grandfather, two fathers and two sons went to the movie theater together
and everyone bought one movie ticket each. How many tickets did they buy in total?"
Push your answer into the keypad to continue. Think well and choose wisely...
`,
  "Push #3 into the keypad",
  "Push #4 into the keypad",
  "Push #5 into the keypad"
);

let sceneThree = new Scene(
  "sceneThree",
  "Main Corridor",
  `
The main corridor appears to be vacant. Maybe everyone else that is alive has
already escaped. You look aroud at your options. To the North lies an elevator
that leads to the Engine Room, to the East a supply room, and to the West a 
Mess Hall. You know the escape pods are close to the Engine room, but maybe you 
should try to gather some supplies first. Where would you like to go?...
  `,
  "Go to the Elevator",
  "Go to the Mess Hall",
  "Go to the Supply Room"
);

let sceneFour = new Scene(
  "sceneFour",
  "Mess Hall",
  `
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Mess Hall is well, a mess. Cups and trays are strewn about and food litters
the floor. You take a look around and wonder if there is anything useful around
here. You are very hungry and are feeling quite weak. You see a pretty nice sandwich
across the way and a lowly glow stick randomly on the ground. You grapple with the 
decision to eat for strength or to heed the urgency of finding the escape pod.
  `,
  "Grab some food and eat to regain strength",
  "Take the glow stick and continue towards the escape pod",
  "Leave the Mess Hall and return to the Main Corridor",
  "glow stick"
);

spaceEscape();

async function spaceEscape() {
  //variable declarations for spaceEscape

  let inBridge = true;

  let sceneOneLocked = true;
  let sceneTwoLocked = true;
  let sceneThreeLocked = true;
  let sceneFourLocked = true;

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

3) To drop an item from your inventory, type "drop"

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

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  `;

  console.log(intro);

  sceneOne.roomLooper();
  userCommand = await ask("\nChoose an option >_");

  while (sceneOneLocked) {
    if (userCommand === "1") {
      inventory.pop();
      inventory.push(sceneOne.moveableItem);
      console.log(`
"You picked up the ${sceneOne.moveableItem}"

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`);
      sceneOneLocked = false;
      break;
    } else if (userCommand === "2") {
      sceneOneLocked = false;
      console.log(
        `
You wait for help but nobody comes to your rescue.
The ships engines fail and you drift aimlessly through space.
That is, until you hit and astroid and shatter into oblivion with
the ship. At least you died quickly.... GAME OVER!`
      );
      restartGame();
    } else if (userCommand === "3") {
      console.log(
        "As sad as it is to leave a comrade behind,\nhe is too heavy to carry out the door."
      );
    } else if (userCommand.toLowerCase() === "i") {
      console.log(`
Your current inventory is: ${inventory}
`);
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
the main corridor. As the door closes behind you the key pad smokes
and the door grinds to a halt forbidding return entry. 
The alarm continues to sound...

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  `);
      sceneTwoLocked = false;
      mainCorridorLoop();
    } else if (userCommand === "2" || userCommand === "3") {
      console.log(`
The indicator light flashes red and the keypad smokes starting a small fire.
You mash at the the numbers furiously but to no avail. It is broken beyond repair.
You perish in the blaze of fire that ensues... GAME OVER!
`);
      restartGame();
    } else if (userCommand === "drop") {
      sceneOne.drop();
    } else if (userCommand.toLowerCase() === "i") {
      console.log(`
Your current inventory is: ${inventory}
`);
    } else {
      console.log(
        "That is not a valid command. Please choose one of the numbered options"
      );
    }
    userCommand = await ask("\nChoose an option >_");
  }

  //loop to keep player in the main corridor and adjoining rooms until they go down the elevator
  async function mainCorridorLoop() {
    sceneThree.roomLooper();
    userCommand = await ask("\nChoose an option >_");
    if (userCommand === "1") {
      elevatorLoop();
    } else if (userCommand === "2") {
      messHallLoop();
    }
  }

  //function determining whether player has credentials to enter elevator or not
  async function elevatorLoop() {
    sceneThreeLocked = true;
    while (sceneThreeLocked) {
      if (inventory.includes("crowbar") && userCommand === "1") {
        console.log(`
You use what little strength you have to pry open the stuck door with the 
crowbar. You enter the elevator and push the button to send you down the 
shaft towards the Engine Room. The door remains ajar as you hug the back 
wall and decend the levels of your ship. The damaged cube grinds to a halt
slightly missing it's mark but leaving enough room for you to crawl out into
the Basement Corridor.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`);
        sceneThreeLocked = false;
        break;
      } else if (userCommand === "1")
        console.log(`
You make your way to the elevator but the door is jammed. There is a two inch
gap, but your attempts to pry it open with your fingers are in vain. You need 
some leverage... You head back down the Main Corridor towards the other rooms.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`);
      sceneThreeLocked = false;
      mainCorridorLoop();
    }
  }

  //function giving user the opportunity to eat or to pick up an item
  async function messHallLoop() {
    sceneFourLocked = true;
    sceneFour.roomLooper();
    userCommand = await ask("\nChoose an option >_");
    while (sceneFourLocked) {
      if (userCommand === "1") {
        console.log(`
You grab the sandwich and it's still in pretty good shape! You ignore the alarm's warnings and 
continue to eat. Your ravenous appetite is not satisfied and you continue to look for more 
satisfying sources of food. You loose track of time, the engines of the Iron Comet fail completely
and you plunge into a large piece of space debree. The wall of the Mess Hall is breeched and you are 
sucked into the vaccum of space! GAME OVER!!!
      `);
        restartGame();
        break;
      } else if (userCommand === "2") {
        console.log(`
Unsure if all this was worth your time, you take the glow stick and head back into the Main Corridor.
But not before grabbing that sandwich.
      `);
        inventory.push(this.moveableItem);
        sceneFourLocked = false;
        mainCorridorLoop();
      } else {
        console.log(
          "That is not a valid command. Please choose one of the numbered options"
        );
      }
      userCommand = await ask("\nChoose an option >_");
    }
  }
}
//     } else if (userCommand === "2") {
//       sceneFour.roomLooper();
//     } else if (userCommand === "3" && inventory.includes("glow stick")) {
//       sceneFive.roomLooper();
//     } else if (userCommand === "3") {
//       console.log(`
// You open the door the the Supply Room but it is pitch black. You reach over and
// flick the light switch on. Nothing happens... There is no way you can look for
// supplies her without a light source. You head back to the Main Corridor.
//       `);
//     }

//allows user to exit game at any
// if (userCommand === "exit") {
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
// if (userCommand.toLowerCase === "exit") {
//   quitGame();
// }
// async function quitGame() {
//   let exitGame = await ask(
//     "Are you sure you want to quit the game?\nType exit again to confirm >_"
//   );
//   if (exitGame === "exit") {
//     console.log("Thank you for playing!");
//     process.exit();
//   } else {
//     return;
//   }
// }
