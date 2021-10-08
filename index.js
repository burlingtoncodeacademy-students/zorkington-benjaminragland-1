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

let userCommand;
let inBridge = true;
let inventory = ["you currently have nothing in your inventory"];
let sceneOneLocked = true;

class Scene {
  constructor(
    scene,
    location,
    description,
    option1,
    option2,
    moveableItem,
    stationaryItem
  ) {
    this.scene = scene;
    this.location = location;
    this.desc = description;
    this.option1 = option1;
    this.option2 = option2;
    this.moveableItem = moveableItem || "";
    this.stationaryItem = stationaryItem || "";
  }

  async roomLooper() {
    console.log(this.desc);
    console.log(`[ You are currently in ${this.location} ]`);
    console.log("\nWhat would you like to do?\n");
    console.log(`1) ${this.option1}`);
    console.log(`2) ${this.option2}`);
  }
}

let sceneOne = new Scene(
  "sceneOne",
  "The Bridge",
  "\nThe bridge of the Iron Comet is in disarray.\nExposed wires spark and consoles smoke.\nYou look around and see the body of the pilot next to a desk,\na key card around his neck.\nThe alarm continues to blare it's ominous message...\n",
  "Take the key card",
  "Wait for help",
  "key card"
);

let sceneTwo = new Scene("sceneTwo", "The Bridge");

start();

async function start() {
  //function to split userCommand string into an array

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

  while (sceneOneLocked === true) {
    if (userCommand === "1") {
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
      process.exit();
    } else {
      console.log("That is not a valid command. Please choose 1 or 2.");
      userCommand = await ask("\nChoose an option >_");
    }
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
// }
