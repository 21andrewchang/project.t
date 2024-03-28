//frontend shit
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const devicePixelRatio = window.devicePixelRatio || 1;

canvas.width = innerWidth * devicePixelRatio;
canvas.height = innerHeight * devicePixelRatio;

const frontendPlayers = {};

const socket = io(); //creates connection to backend

socket.on("connect", () => {
  window.addEventListener("keydown", (e) => {
    if (!frontendPlayers[socket.id]) return;
    if (typing) {
      switch (e.key) {
        case "Enter":
          console.log("message: ", textbox.value || "");
          socket.emit("message", textbox.value || "");
          break;
      }
    } else {
      switch (e.key) {
        case "w":
          socket.emit("keydown", "w");
          break;
        case "a":
          socket.emit("keydown", "a");
          break;
        case "s":
          socket.emit("keydown", "s");
          break;
        case "d":
          socket.emit("keydown", "d");
          break;
      }
    }
  });
});

let randomWords = ["hello", "words", "goodbye", "fish"];
//updatePlayers event listener
socket.on("updatePlayers", (backendPlayers) => {
  for (const id in backendPlayers) {
    const backendPlayer = backendPlayers[id];

    if (!frontendPlayers[id]) {
      frontendPlayers[id] = new Player({
        words: randomWords,
      });
    } else {
      frontendPlayers[id].words = backendPlayer.words;
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
