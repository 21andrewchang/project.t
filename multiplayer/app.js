const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const port = 3000;

app.use(express.static("src"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
