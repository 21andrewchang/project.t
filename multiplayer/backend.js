//backend shit
const express = require("express");
const app = express();

//socket.io setup
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 });

const port = 3000;

app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//store all player states
//use map for fast deletion bc array needs to search in O(n)
//each player should have a UNIQUE id
const backendPlayers = {};

io.on("connection", (socket) => {
  console.log("a user has connected");
  backendPlayers[socket.id] = {
    x: 500 * Math.random(),
    y: 500 * Math.random(),
    color: `hsl(${360 * Math.random()}, 100%, 50%)`,
  };
  //socket.emit() for sending data just to this connection
  io.emit("updatePlayers", backendPlayers); //send data to all connections

  socket.on("message", (message) => {
    backendPlayers[socket.id].message = message;
  });

  socket.on("keydown", (keyPressed) => {
    console.log("backend socket", socket.id);
    console.log("backendPlayer", backendPlayers[socket.id]);
    switch (keyPressed) {
      case "w":
        backendPlayers[socket.id].y -= 10;
        break;
      case "a":
        backendPlayers[socket.id].x -= 10;
        break;
      case "s":
        backendPlayers[socket.id].y += 10;
        break;
      case "d":
        backendPlayers[socket.id].x += 10;
        break;
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
    delete backendPlayers[socket.id];
    io.emit("updatePlayers", backendPlayers);
  });
});

// don't want to update backend everytime a player presses a key
// this will fuck things up
// instead, only update in a certain interval using ticker
// every 15ms, send an update to all players connected w/ updated positions
setInterval(() => {
  io.emit("updatePlayers", backendPlayers);
}, 15);

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
