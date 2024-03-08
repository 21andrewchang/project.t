const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

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

const p1 = new Player({ position: { x: 100, y: 100 } });
console.log(p1);

function clearScreen() {
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
}
function animate() {
  window.requestAnimationFrame(animate);
  clearScreen();
  p1.update();
  if (keys.w.pressed) {
    p1.position.y -= 5;
  } else if (keys.a.pressed) {
    p1.position.x -= 5;
  } else if (keys.s.pressed) {
    p1.position.y += 5;
  } else if (keys.d.pressed) {
    p1.position.x += 5;
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
