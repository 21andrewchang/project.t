const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const players = {};

const socket = io(); //creates connection to backend

//updatePlayers event listener
socket.on("updatePlayers", (backendPlayers) => {
  for (const id in backendPlayers) {
    const backendPlayer = backendPlayers[id];

    if (!players[id]) {
      players[id] = new Player({
        position: { x: backendPlayer.x, y: backendPlayer.y },
      });
    }
  }
  for (const id in players) {
    if (!backendPlayers[id]) {
      delete players[id];
    }
  }
  console.log(players);
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

c.fillRect(0, 0, canvas.width, canvas.height);

function clearScreen() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
}
function animate() {
  window.requestAnimationFrame(animate);
  clearScreen();
  for (const id in players) {
    const player = players[id];
    player.draw();
  }
}

animate();

window.addEventListener("keydown", (event) => {
  lastKey = event.key;
  switch (event.key) {
    case "w":
      keys.w.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});
