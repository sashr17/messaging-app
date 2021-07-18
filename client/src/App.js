import Chat from "./components/Chat/Chat";
import Process from "./components/Process/Process";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import io from "socket.io-client";

const socket = io.connect("/");

function Appmain(props) {
  return (
    <>
      <div className="right">
        <Chat
          username={props.match.params.username}
          roomname={props.match.params.roomname}
          socket={socket}
        />
      </div>
      <div className="left">
        <Process />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home socket={socket} />
          </Route>
          <Route path="/chat/:roomname/:username" component={Appmain} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
