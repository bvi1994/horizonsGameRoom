import React, { Component } from "react";
import '../assets/stylesheets/Chatbox.css';
import io from 'socket.io-client';
import ChatWindow from './ChatWindow.js';

// const socket = io('http://localhost:3000');

class Chatbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: io('http://localhost:3000'),
            roomName: "Main Chat Room",
            username: ""
        };
    }

    componentDidMount() {
        // console.log("Did mount has happened");
        this.state.socket.on('connect', () => {
            console.log('Connected to main chat!');
            // const username =
            const testUsername = "Pikachu";
            console.log("Username has been changed");
            // this.setState({username: username});
            this.setState({username: testUsername});
            this.state.socket.emit('username', testUsername);
            this.state.socket.emit('room', this.state.roomName);
        });
        this.state.socket.on('errorMessage', message => {
            console.log("Unable to connect. Error: ", message);
        });
    }
    join(room) {
        console.log("Join room: ", this.state.roomName);
        this.setState({roomName: room}).bind();
        this.state.socket.emit('room', this.state.roomName);
    }
    render() {
        return(
          <div id="chatBox" className="section">
              This is a test - Chat Box
              <div id="chatWindow" className="section">
                This is a test of chatWindow
              </div>
              {/* <div id="messageForm" className="section">
                <input id="messageBox" type="text" name="message" />
                <button>Send</button>
              </div> */}
              <ChatWindow username={this.state.username} room={this.state.roomName} socket={this.state.socket} />
          </div>
        );
    }
}

export default Chatbox;
