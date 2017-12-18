import React, { Component } from "react";
import '../assets/stylesheets/Chatbox.css';
import io from 'socket.io-client';
import ChatWindow from './ChatWindow.js';
const BASE_URL = 'https://horizonsplayground.herokuapp.com';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
const socket = io(BASE_URL);

class Chatbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: socket,
            roomName: "Main Chat Room",
            username: props.user.username,
            user: ""
        };
    }
    componentDidMount() {
        socket.on('errorMessage', message => {
            console.log("Unable to connect. Error: ", message);
        });
    }
    componentWillReceiveProps(props) {
        socket.emit('username', props.user.username);
        this.setState({
            username: props.user.username,
            user: props.user
        });
    }
    joinRoom() {
        socket.emit('room', "Main Chat Room");
    }
    render() {
        return(
          <div id="chatBox" className="section">
              Horizons Playground Chat Room 🌎
              <button onClick={() => this.joinRoom()}>Join Chat Room</button>
              <ChatWindow user={this.state.user} socket={this.state.socket} />
          </div>
        );
    }
}

export default Chatbox;
