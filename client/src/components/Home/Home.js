import { useState } from "react";
import { Link } from "react-router-dom";

import "./Home.scss";

const Home = ({ socket }) => {
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  const joinRoom = () => {
    if (userName !== "" && roomName !== "") {
      socket.emit("joinRoom", { userName, roomName });
      //if empty error message pops up and returns to the same page
    } else {
      // alert("userName and roomName are must !");
      console.error("userName and roomName are must !");
      window.location.reload();
    }
  };

  return (
    <div className="Home">
      <h1>Welcome to ChatApp</h1>
      <input
        placeholder="Input your user name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <input
        placeholder="Input the room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      ></input>
      <Link to={`/chat/${roomName}/${userName}`}>
        <button onClick={joinRoom}>Join</button>
      </Link>
    </div>
  );
};

export default Home;
