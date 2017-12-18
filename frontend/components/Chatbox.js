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
            username: this.props.user.username,
            user: ""
        };
    }
    componentDidMount() {
        this.state.socket.emit('username', this.state.username);
        this.state.socket.emit('room', this.state.roomName);
        this.state.socket.on('errorMessage', message => {
            console.log("Unable to connect. Error: ", message);
        });
    }
    componentWillReceiveProps(props) {
        this.setState({
            username: props.user.username,
            user: props.user
        });
    }
    render() {
        return(
          <div id="chatBox" className="section">
              Horizons Playground Chat Room 🌎

              <ChatWindow user={this.state.user} socket={this.state.socket} />
          </div>
        );
    }
}

export default Chatbox;
