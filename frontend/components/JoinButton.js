import React, { Component } from "react";
import '../assets/stylesheets/JoinButton.css';

class JoinButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <a href="#"><button id="joinButton">Join Game</button></a>
            </div>
        );
    }
}

export default JoinButton;
