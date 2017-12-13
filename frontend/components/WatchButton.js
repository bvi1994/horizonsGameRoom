import React, { Component } from "react";
import '../assets/stylesheets/WatchButton.css';

class WatchButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <a href="#"><button id="watchButton">Watch</button></a>
            </div>
        );
    }
}

export default WatchButton;
