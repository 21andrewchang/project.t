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
const players = {};

io.on("connection", (socket) => {
  console.log("a user has connected");
  players[socket.id] = { x: 500 * Math.random(), y: 500 * Math.random() };
  //socket.emit() for sending data just to this connection
  io.emit("updatePlayers", players); //send data to all connections

  socket.on("disconnect", (reason) => {
    console.log(reason);
    delete players[socket.id];
    io.emit("updatePlayers", players);
  });
});

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
