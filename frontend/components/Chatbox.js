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
            username: ""
        };
    }
    componentWillMount() {
        // console.log("Did mount has happened");
        this.state.socket.on('connect', () => {
            this.state.socket.emit('username', this.props.username);
            this.state.socket.emit('room', this.state.roomName);
        });
        this.state.socket.on('errorMessage', message => {
            console.log("Unable to connect. Error: ", message);
        });
    }
    componentWillReceiveProps(props) {
        this.setState({
            username: props.username
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
              <ChatWindow username={this.state.username} room={this.state.roomName} socket={this.state.socket} />
          </div>
        );
    }
}

export default Chatbox;
