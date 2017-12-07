import React, { Component } from "react";
import '../assets/stylesheets/CurrentGameSession.css';

class CurrentGameSession extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div id="gamesInSession" className="section">
                This is a test - Game Session
            </div>
        );
    }
}

export default CurrentGameSession;
