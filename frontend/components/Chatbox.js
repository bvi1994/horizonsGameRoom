import React, { Component } from "react";
import '../assets/stylesheets/Chatbox.css';
import ChatWindow from './ChatWindow.js';
import { SOCKET } from './general';

class Chatbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: "Main Chat Room",
            username: props.user.username,
            user: ""
        };
    }
    componentDidMount() {
        SOCKET.on('errorMessage', message => {
            console.log("Unable to connect. Error: ", message);
        });
    }
    componentWillReceiveProps(props) {
        SOCKET.emit('username', props.user.username);
        this.setState({
            username: props.user.username,
            user: props.user
        });
    }
    joinRoom() {
        SOCKET.emit('room', "Main Chat Room");
    }
    render() {
        return(
          <div id="chatBox" className="section">
              Horizons Playground Chat Room 🌎
              <button onClick={() => this.joinRoom()}>Join Chat Room</button>
              <ChatWindow user={this.state.user} socket={SOCKET} />
          </div>
        );
    }
}

export default Chatbox;
