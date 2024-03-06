const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.9;

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.canJump = true;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
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
});

console.log(player);

function clearScreen() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

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
};

let lastKey;

function animate() {
  window.requestAnimationFrame(animate);
  clearScreen();
  player.update();
  enemy.update();
  if (keys.f.pressed && lastKey == "f") {
    player.velocity.x = 10;
  } else if (keys.s.pressed && lastKey == "s") {
    player.velocity.x = -10;
  } else {
    player.velocity.x = 0;
  }
}

animate();

// movement
window.addEventListener("keydown", (event) => {
  lastKey = event.key;
  switch (event.key) {
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
    case "f":
      keys.f.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
  }
});
