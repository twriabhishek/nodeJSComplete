const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 8023;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Set up the public directory to serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "clientInfo.html"));
});

app.get("/chatRoom", (req, res) => {
  const { username } = req.query;
  if (!username || username.trim() === "") {
    res.status(400).send("Username is required.");
    return;
  }
  res.sendFile(path.join(__dirname, "public", "chatroom.html"));
});

io.on("connection", (socket) => {

  socket.on("chat message", (message, username) => {
    io.emit("chat message", {
      message,
      isClient: socket.id,
      username: username,
    });
  });
});

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
