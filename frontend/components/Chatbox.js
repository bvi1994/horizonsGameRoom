import React, { Component } from "react";
import '../assets/stylesheets/Chatbox.css';

class Chatbox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
          <div id="chatBox" className="section">
              This is a test - Chat Box
              <div id="chatWindow" className="section">
                This is a test of chatWindow
              </div>
              <div id="messageForm" className="section">
                <input id="messageBox" type="text" name="message" />
                <button>Send</button>
              </div>
          </div>
        );
    }
}

export default Chatbox;
