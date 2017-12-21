import React, { Component } from "react";
import '../assets/stylesheets/Chatbox.css';
import ChatWindow from './ChatWindow.js';

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
        this.props.socket.on('errorMessage', message => {
            console.log("Unable to connect. Error: ", message);
        });
    }
    componentWillReceiveProps(props) {
        this.props.socket.emit('username', props.user.username);
        this.setState({
            username: props.user.username,
            user: props.user
        });
    }
    render() {
        return(
          <div id="chatBox" className="section">
              Horizons Playground Chat Room 🌎
              <ChatWindow user={this.state.user} socket={this.props.socket} />
          </div>
        );
    }
}

export default Chatbox;
