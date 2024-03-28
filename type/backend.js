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
let randomWords = ["hello", "words", "goodbye", "fish"];
io.on("connection", (socket) => {
  console.log("a user has connected");
  backendPlayers[socket.id] = {
    words: randomWords,
  };
  //socket.emit() for sending data just to this connection
  io.emit("updatePlayers", backendPlayers); //send data to all connections

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
