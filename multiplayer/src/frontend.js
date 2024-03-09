//frontend shit
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const devicePixelRatio = window.devicePixelRatio || 1;

canvas.width = innerWidth * devicePixelRatio;
canvas.height = innerHeight * devicePixelRatio;

const frontendPlayers = {};

const socket = io(); //creates connection to backend

window.addEventListener("keydown", (e) => {
  console.log("socket id:", socket.id);
  if (!frontendPlayers[socket.id]) return;
  switch (e.key) {
    case "w":
      frontendPlayers[socket.id].position.y -= 10;
      break;
    case "s":
      frontendPlayers[socket.id].position.y += 10;
      break;
  }
});

//updatePlayers event listener
socket.on("updatePlayers", (backendPlayers) => {
  for (const id in backendPlayers) {
    const backendPlayer = backendPlayers[id];

    if (!frontendPlayers[id]) {
      frontendPlayers[id] = new Player({
        position: { x: backendPlayer.x, y: backendPlayer.y },
        color: backendPlayer.color,
      });
    }
  }
  for (const id in frontendPlayers) {
    if (!backendPlayers[id]) {
      delete frontendPlayers[id];
    }
  }
});

c.fillRect(0, 0, canvas.width, canvas.height);

function clearScreen() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  window.requestAnimationFrame(animate);
  clearScreen();
  for (const id in frontendPlayers) {
    const player = frontendPlayers[id];
    player.draw();
  }
}

animate();
