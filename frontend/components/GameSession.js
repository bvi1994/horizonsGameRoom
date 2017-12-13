import React, { Component, PropTypes } from "react";
import '../assets/stylesheets/GameSession.css';
import JoinButton from './JoinButton.js';
import WatchButton from './WatchButton.js';
import Avatar from 'material-ui/Avatar';

class GameSession extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="roomBlock">
                {/* <img className="" alt="Pikachu gif" src="https://media.giphy.com/media/OgsZnIsoPkCfS/giphy.gif"/> */}
                <div className="roomName">
                  <h3>Game Room Name</h3>
                </div>
                {/* <h3>{this.state.GameRoomName}</h3> */}
                <div className="gameInfo">
                  <div id="playerList">
                    <div className="player">Pikachu</div>
                    <div className="player">Pichu</div>
                  </div>
                  <div className="playerInfo">
                    <div id="playerListAvatar">
                      <Avatar src="https://i.imgur.com/x6PRlCE.png" size={25} />
                    </div>
                  </div>
                </div>
                <div id="menuOptions">
                  <div id="joinButton">
                    <JoinButton />
                  </div>
                  <div id="watchButton">
                    <WatchButton />
                  </div>
                </div>
            </div>
        );
    }
}

export default GameSession;
