const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.9;

const keys = {
  f: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  e: {
    pressed: false,
  },
  j: {
    pressed: false,
  },
};

let lastKey;
let lastKeys;

class Sprite {
  constructor({ position, velocity, color, facing }) {
    this.position = position;
    this.velocity = velocity;
    this.facing = facing;
    this.color = color;
    this.height = 150;
    this.width = 50;
    this.canJump = true;
    this.isAttacking = false;
    this.attackBox = {
      position: this.position,
      width: 100,
      height: 50,
    };
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    //draw attack
    if (this.isAttacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height,
      );
    }
  }
  attack() {
    this.isAttacking = true;
    //attack duration is 100ms
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      this.canJump = true;
    } else {
      this.velocity.y += gravity;
    }
    if (this.facing == "right") {
      this.attackBox.width = 100;
    } else {
      this.attackBox.width = -50;
    }
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  color: "white",
  facing: "right",
});

const enemy = new Sprite({
  position: {
    x: 400,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  color: "red",
  facing: "left",
});

console.log(player);

function clearScreen() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  window.requestAnimationFrame(animate);
  clearScreen();
  player.update();
  player.velocity.x = 0;
  enemy.update();
  if (keys.f.pressed && lastKey == "f") {
    player.velocity.x = 10;
    player.facing = "right";
  } else if (keys.s.pressed && lastKey == "s") {
    player.velocity.x = -10;
    player.facing = "left";
  }

  let p_attack = player.attackBox;
  //detect collision
  if (player.isAttacking) {
    if (player.position.x < enemy.position.x) {
      if (p_attack.position.x + p_attack.width >= enemy.position.x) {
        console.log("Hit enemy!");
        player.isAttacking = false;
      }
    } else {
    }
  }
}

animate();

// movement
window.addEventListener("keydown", (event) => {
  lastKey = event.key;
  switch (event.key) {
    case "j":
      player.attack();
      break;
    // move to right
    case "f":
      keys.f.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case "e":
      if (player.canJump) {
        player.velocity.y = -10;
        player.canJump = false;
      }
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    // move to right
    case "j":
      keys.j.pressed = false;
      break;
    case "f":
      keys.f.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
  }
});
