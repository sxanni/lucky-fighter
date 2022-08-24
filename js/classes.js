//---------------------create player and enemy--------------------------//

//create sprite class for sprites, whenver theres a sprite object created from sprite class it will execute the constructor
//a main property in gane dev is position, each spritewill have its own indeopendent position so we

class Bkgrnd {
  constructor({ position, width, height, imageSrc, scale = 1, frameMax = 1 }) {
    //pass argumentts into constructor
    //pass an argument for 'position' to the sprite class, put it in curly brackets to make it pass as one object to avoid load order error
    this.position = position; //whenever you creat a property within a class in a constructor it should be prefaced by this.
    this.width = width;
    this.height = height;
    this.image = new Image(); //create new html image whenever sprite is created
    this.image.src = imageSrc;
    this.scale = scale; //scale is gonna be 1 by default and will be varibale within the each new class by setting a value for it
    this.frameMax = frameMax;
    this.frameCurrent = 0;
    this.frameElapsed = 0; //this shows how many frames have we elapsed over through out our aniation( increases as game runs)
    this.frameHold = 10; //this is how many frames we should got through before changing frames current
  }

  draw() {
    c.drawImage(
      this.image, //draw image in canvas
      this.frameCurrent * (this.image.width / this.frameMax),
      0, //x-coordinate of image
      // 0,//y-coordinate/\
      this.image.width / this.frameMax, //initiate crop width to one frame
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.frameMax) * this.scale,
      this.image.height * this.scale
    ); //multiply height by scale
  }

  update() {
    // this.frameElapsed++

    // if (this.frameElapsed % this.frameHold === 0) {

    this.draw(); //calling the draw() method
    //   if(this.frameCurrent < this.frameMax - 1) {
    //     this.frameCurrent++
    //   } else {
    //     this.frameCurrent = 0
    //   }

    // }
  }
}
class Sprite {
  constructor({ position, width, height, imageSrc, scale = 1, frameMax = 0 }) {
    //pass argumentts into constructor
    //pass an argument for 'position' to the sprite class, put it in curly brackets to make it pass as one object to avoid load order error
    this.position = position; //whenever you creat a property within a class in a constructor it should be prefaced by this.
    this.width = width;
    this.height = height;
    this.image = new Image(); //create new html image whenever sprite is created
    this.image.src = imageSrc;
    this.scale = scale; //scale is gonna be 1 by default and will be varibale within the each new class by setting a value for it
    this.frameMax = frameMax;
    this.frameCurrent = 0;
    this.frameElapsed = 0; //this shows how many frames have we elapsed over through out our aniation( increases as game runs)
    this.frameHold = 5; //this is how many frames we should got through before changing frames current
  }

  draw() {
    c.drawImage(
      this.image, //draw image in canvas
      this.frameCurrent * (this.image.width / this.frameMax),
      0, //x-coordinate of image
      // 0,//y-coordinate/\
      this.image.width / this.frameMax, //initiate crop width to one frame
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.frameMax) * this.scale,
      this.image.height * this.scale
    ); //multiply height by scale
  }

  update() {
    this.draw(); //calling the draw() method
    this.frameElapsed++; //incrementall yincrese frames elapsed over time

    if (this.frameElapsed % this.frameHold === 0) {
      if (this.frameCurrent < this.frameMax - 1) { //if current is less than max we keep going to next frame
        this.frameCurrent++;
      } else {
        this.frameCurrent = 0; // once current = max, this sets back to 1st frame to loop animation
      }
    }
  }
}

class Fighter {
  constructor({ position, velocity, color = "red", offset }) {
    //pass argumentts into constructor
    //pass an argument for 'position' to the sprite class, put it in curly brackets to make it pass as one object to avoid load order error
    this.position = position; //whenever you creat a property within a class in a constructor it should be prefaced by this.
    this.velocity = velocity; //added this arg to simulate gravity
    this.width = 50;
    this.height = 150;
    this.lastKey;
    (this.attackBox = {
      //arg represents attack box property
      // position: this.position , //position is same as sprite position as attacl comes from player body
      position: {
        x: this.position.x, //attack box position updates manually based on position of the parent
        y: this.position.y,
      },
      offset,
      width: 100, //default width and height of attack box
      height: 50,
    }),
      (this.color = color); //color property for sprite class so we can differentiate between player and enemy
    this.isAttacking; //property to show when player is attacking- arm this by adding an attack method right afyter update method
    this.health = 100;
  }

  draw() {
    //define what your player looks like
    c.fillStyle = this.color; //color
    c.fillRect(
      this.position.x,
      this.position.y,
      this.width /*px wide */,
      this.height /*px tall */
    );

    //attack box
    if (this.isAttacking) {
      //if statement to only draw attackbox when this.isattacking property is true
      c.fillStyle = "white";
      c.fillRect(
        this.attackBox.position.x, // this argument is - position of attck box on x axis
        this.attackBox.position.y, //position of attackbox on y axis
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.draw(); //calling the draw() method
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x; //define how sprite move on x axis
    this.position.y += this.velocity.y; // ooo
    // this.velocity.y += 10// overtime position.y is going to have 10 pixels added to it for each frame that is looped over at a rate of 10pixels/second or per loop
    //if stratement to stop sprite falling off the page if its bottom touchesthe lower edge of the page, by seeting velocity to 0

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 20) {
      //added -20 to make fighter stand on ground instead of canvas edge
      // if the lowest point of the rectangle is equals to the canvas edge/height
      this.velocity.y = 0; // rdeuce velocity to 0
    } else this.velocity.y += gravity; //if above isnt true, gravity is applied until bottom edge touches canvas (add acceleration by incrementing gravity value to fall speed and closes gap btwn sprite and canvas floor)
  }

  attack() {
    this.isAttacking = true; //when we call attack method this is = 2 true

    setTimeout(() => {
      //use settimeout to time limit attack when this method is triggerd
      this.isAttacking = false; //set this.isAttacking back to false after 100 milliseconds
    }, 100);
  }
}
