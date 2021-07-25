const app = require("express")();
const server = require("http").createServer(app);
const options = { cors: { origin: "*" } };
const io = require("socket.io")(server, options);
const { getCurrentUser, removeUser, joinUser } = require("./users");

const PORT = process.env.PORT || 8000;

//initializing the socket io connection
io.on("connection", (socket) => {
  //for a new user joining the room
  socket.on("joinRoom", ({ userName, roomName }) => {
    //* create user
    const user = joinUser(socket.id, userName, roomName);
    console.log("Socket ID >> ", socket.id);
    socket.join(user.roomName);

    //display a welcome message to the user who have joined a room
    socket.emit("message", {
      userId: user.id,
      userName: user.userName,
      text: `Welcome ${user.userName}`,
    });

    //displays a joined room message to all other room users except that particular user
    socket.broadcast.to(user.roomName).emit("message", {
      userId: user.id,
      userName: user.userName,
      text: `${user.userName} has joined the chat`,
    });
  });

  //user sending message
  socket.on("chat", (text) => {
    //gets the room user and the message sent
    const user = getCurrentUser(socket.id);

    user &&
      io.to(user.roomName).emit("message", {
        userId: user.id,
        userName: user.userName,
        text: text,
      });
  });

  //when the user exits the room
  socket.on("disconnect", () => {
    //the user is deleted from array of users and a left room message displayed
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.roomName).emit("message", {
        userId: user.id,
        userName: user.userName,
        text: `${user.userName} has left the room`,
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Chatcord server is running on PORT: ${PORT}`);
});
