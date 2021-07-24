const express = require("express");
const app = express();
const socket = require("socket.io");
const color = require("colors");
const cors = require("cors");
const { getCurrentUser, removeUser, joinUser } = require("./users");

app.use(express());

const port = 8000;

app.use(cors());

var server = app.listen(
  port,
  console.log(`Server is running on the port no: ${port} `.green)
);

const io = socket(server);

//initializing the socket io connection
io.on("connection", (socket) => {
  //for a new user joining the room
  socket.on("joinRoom", ({ userName, roomName }) => {
    //* create user
    const p_user = joinUser(socket.id, userName, roomName);
    console.log(socket.id, "=id");
    socket.join(p_user.roomName);

    //display a welcome message to the user who have joined a room
    socket.emit("message", {
      userId: p_user.id,
      userName: p_user.userName,
      text: `Welcome ${p_user.userName}`,
    });

    //displays a joined room message to all other room users except that particular user
    socket.broadcast.to(p_user.roomName).emit("message", {
      userId: p_user.id,
      userName: p_user.userName,
      text: `${p_user.userName} has joined the chat`,
    });
  });

  //user sending message
  socket.on("chat", (text) => {
    //gets the room user and the message sent
    const p_user = getCurrentUser(socket.id);

    io.to(p_user.roomName).emit("message", {
      userId: p_user.id,
      userName: p_user.userName,
      text: text,
    });
  });

  //when the user exits the room
  socket.on("disconnect", () => {
    //the user is deleted from array of users and a left room message displayed
    const p_user = removeUser(socket.id);

    if (p_user) {
      io.to(p_user.roomName).emit("message", {
        userId: p_user.id,
        userName: p_user.userName,
        text: `${p_user.userName} has left the room`,
      });
    }
  });
});
