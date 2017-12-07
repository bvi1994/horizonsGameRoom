import React, {Component} from "react";
import '../assets/stylesheets/Dashboard.css';

class Dashboard extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <div id="headerBar">
                    <button id="homeButton">
                      Playroom
                    </button>
                    <button id="gameListButton">
                      Games
                    </button>
                    <button id="chatRoomButton">
                      Chat
                    </button>
                    <button id="logoutButton">
                      Logout
                    </button>
                </div>
            </div>
        );
    }
}

export default Dashboard;
