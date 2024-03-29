const canvas = document.querySelector("canvas"); //conect canvas to constant
const c = canvas.getContext("2d"); //grabbing 2d context with (const"c") as its a 2d game

//canvas size
canvas.width = 1024;
canvas.height = 576;

//create canvas contact so we can draw on canvas using canvas api
c.fillRect(0, 0, canvas.width, canvas.height); //<---set x and y positions to = 0

//---------------------create player and enemy--------------------------//

//create sprite class for sprites,(its within classes.js) whenver theres a sprite object created from sprite class it will execute the constructor
//a main property in gane dev is position, each spritewill have its own indeopendent position so we

const gravity = 0.4;

const background = new Bkgrnd({
  //create new sprite object called background that takes in position and image source
  position: {
    //specify its position
    x: 0,
    y: 0,
  },
  width: 1024, //specify its width and  height
  height: 576,
  scale: 2.7,
  // frameMax:1,
  // frameCurrent:1,
  imageSrc: "./assets/glacialMount.png",
});
const king = new Sprite({
  //create new sprite object called background that takes in position and image source
  position: {
    //specify its position
    x: 355,
    y: 100,
  },
  width: 504, //specify its width and  height
  height: 128,
  scale: 2.4,
  frameMax: 18,
  imageSrc: "./assets/kingIdle.png",
});

const player = new Fighter({
  position: {
    //create new object from sprite class
    x: 0, //x coordinate on canvas
    y: 0, //y coordinate on canvas
  },
  // width: 304, //specify its width and  height
  // height: 128,
  velocity: {
    //create new object from sprite class
    x: 0, //x coordinate on canvas
    y: 5, //y coordinate on canvas
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/red/idle.png", //accidentally commenting thia out led to anoying error("Uncaught DOMException: Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The HTMLImageElement provided is in the 'broken' state.
  // at Fighter.draw ")
  frameMax: 18,
  scale: 3.1,
  frameCurrent: 0,
  // frameHold:3,
  offset: {
    x: 50,
    y: 20
  },
  sprites: {
    idle: {
      imageSrc: "./assets/red/idle.png",
      frameMax: 18,
    },
    run: {
      frameMax: 24,
      imageSrc: "./assets/red/run.png",
    },
    jump: {
      imageSrc: "./assets/red/jump.png",
      frameMax: 19,
    },
    hurt: {
      imageSrc: "./assets/red/hurt.png",
      frameMax: 7,
    },
    fall: {
      imageSrc: "./assets/red/hurt.png",
      frameMax: 7,
    },
    attack: {
      imageSrc: "./assets/red/Light-atk.png",
      frameMax: 26,
    },
  },
  // color: "blue",
});

player.draw(); //display / draw player on canvas

const enemy = new Fighter({
  //create new object from sprite class
  position: {
    //create new object from sprite class
    x: 800, //x coordinate on canvas
    y: 200, //y coordinate on canvas
  },
  // width:10,
  velocity: {
    //create new object from sprite class
    x: 0, //x coordinate on canvas
    y: 0, //y coordinate on canvas
  },
  offset: {
    x: 0,
    y: 20,
  },
  imageSrc: "./assets/kenji/Idle.png",
  frameMax: 4,
  scale: 2.5,
  offset: {
    x:215,
    y:157
  },
  sprites: {
    idle: {
      imageSrc: "./assets/kenji/Idle.png",
      frameMax: 4,
    },
    run: {
      imageSrc: "./assets/kenji/Run.png",
      frameMax: 8,
    },
    jump: {
      imageSrc: "./assets/kenji/Jump.png",
      frameMax: 2,
    },
    fall: {
      imageSrc: "./assets/kenji/Fall.png",
      frameMax: 2,
    },
    attack: {
      imageSrc: "./assets/kenji/Attack1.png",
      frameMax: 4,
    },
  },
  // color: "red",
});

enemy.draw(); //display / draw enemy on canvas

console.log(player); //console log out to browser console

const keys = {
  //add all keys used in control to keys list
  ArrowLeft: {
    pressed: false, //pressed property
  },
  ArrowRight: {
    pressed: false, //pressed property
  },
  ArrowUp: {
    pressed: false, //pressed property
  },
  a: {
    pressed: false, //pressed property
  },
  d: {
    pressed: false, //pressed property
  },
  w: {
    pressed: false, //pressed property to monitor when button is pressed is false by default
  },
};

let lastKey; // const used to grab the last key that waas pressed, fixing left and rigt button press bug

decreaseTimer();

//create animation loop to simulate gravity constant
function animate() {
  window.requestAnimationFrame(animate); //this call represents whatever function we want to loop
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  // c.clearlRect(0, 0, canvas.width, canvas.height)// clears/refreshes canvas to refresh the drawing and avoid object leaving residual/paint like effect(also clears background)
  background.update();
  king.update();
  player.update();
  enemy.update();
  // console.log('number of loops');<-- to see how many times its looping in chrome dev console

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //if last key is left aro, and left key is pressed, player moves left
  
  //player movement
  if (keys.ArrowLeft.pressed && player.lastKey === "ArrowLeft") {
    player.velocity.x = -2;
    player.switchSprite('run'); //set default movement sprite to run
    // player.frameMax = player.sprite.run.frameMax

  } else if (keys.ArrowRight.pressed && player.lastKey === "ArrowRight") {
    player.velocity.x = 2;
    player.switchSprite('run'); //set default movement sprite to run
    
    // player.frameMax = player.sprite.run.frameMax
  }else {
  player.switchSprite('idle') //set default movement sprite to idle

  }
   //jumping
  if(player.velocity.y < 0) {
    player.switchSprite('jump'); //set default movement sprite to jump
    // player.frameMax = player.sprite.jump.frameMax
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall');
    console.log('faling')
  }
  

  //enemy movement
  if (keys.a.pressed && enemy.lastKey === "a") {
    enemy.velocity.x = -2;
    enemy.switchSprite('run');
  } else if (keys.d.pressed && enemy.lastKey === "d") {
    enemy.velocity.x = 2;
    enemy.switchSprite('run');
  } else {
    enemy.switchSprite('idle')
  }

    //jumping
    if(enemy.velocity.y < 0) {
      enemy.switchSprite('jump'); //set default movement sprite to jump
      // player.frameMax = player.sprite.jump.frameMax
    } else if (enemy.velocity.y > 0) {
      enemy.switchSprite('fall');
      console.log('faling')
    }

  //detect for collision below
  if (
    rectangularCollision({
      //call rectangular collision
      rectangle1: player,
      rectangle2: enemy,
    }) && //handle colision on top and bottom of hit/attackBox
    player.isAttacking //handles the action of attacking so the above only count wwhnen player is attacking
  ) {
    player.isAttacking = false;
    enemy.health -= 20; //minus 20 from health when player hits enemy
    console.log("player attack successful");
    document.querySelector("#enemyHealth").style.width = enemy.health + "%"; // select width of bar and take away the % value of enemy.health
  }
  if (
    rectangularCollision({
      //call rectangular collision
      rectangle1: enemy,
      rectangle2: player,
    }) && //handle colision on top and bottom of hit/attackBox
    enemy.isAttacking //handles the action of attacking so the above only count wwhnen player is attacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20; //minus 20 from health when player hits enemy

    console.log("enemy attack succesful");
    document.querySelector("#playerHealth").style.width = player.health + "%"; // select width of bar and take away the % value of player.health when enemy attacks
  }

  //endgame based pn health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
} //the above is an infinite animation loop

//making it a loop ensures its always acting on sprites
animate(); //call above fuction to start animating

//add event to window object, for keydown/press event
window.addEventListener("keydown", (event) => {
  //arrow function as second argument
  switch (
    event.key //switch function to map keydown event to player movement on x axis of canvas
  ) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true; //puts value into variable last key. This makes sure the value of last key is always whichever key was pressed
      player.lastKey = "ArrowLeft"; //last key value is current btn press down: ArrowLeft
      // player.velocity.x = -1 //player velocity is -1 so it moves left
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true; //puts value into variable last key. This makes sure the value of last key is always whichever key was pressed
      player.lastKey = "ArrowRight";
      // player.velocity.x = 1 //player velocity is 1 so it moves right
      break;
    case "ArrowUp":

      player.velocity.y = -10; //player velocity is -12 so it jumps to -12, before gravity acts to pull it back down
      break;
    case " ":
      player.attack();
      break;
    case "a":
      keys.a.pressed = true; //puts value into variable last key. This makes sure the value of last key is always whichever key was pressed
      enemy.lastKey = "a";
      break;

    case "d":
      keys.d.pressed = true; //puts value into variable last key. This makes sure the value of last key is always whichever key was pressed
      enemy.lastKey = "d";
      break;

    case "w":
      // keys.w.pressed = true //puts value into variable last key. This makes sure the value of last key is always whichever key was pressed
      enemy.velocity.y = -10;
      break;
    case "f":
      enemy.attack();
      break;
  }

  console.log(event.key);
});

//add event for when we release the key/ keyup event
window.addEventListener("keyup", (event) => {
  // player.image = player.sprites.jump.image;
  
  //arrow function as second argument
  switch (
    event.key //switch function to map keydown event to player movement on x axis of canvas
  ) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      player.velocity.x = 0; //player velocity is zero, so it stops
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      player.velocity.x = 0; //player velocity is zero, so it stops
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;

    //enemy key up cases to stop movement on keyup/ key release below
    case "a":
      keys.a.pressed = false;
      enemy.velocity.x = 0; //player velocity is zero, so it stops
      break;
    case "d":
      keys.d.pressed = false;
      enemy.velocity.x = 0; //player velocity is zero, so it stops
      break;
    case "w":
      keys.w.pressed = false;
      break;
  }

  console.log(event.key);
});
