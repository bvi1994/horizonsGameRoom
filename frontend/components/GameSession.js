import React, { Component, PropTypes } from "react";
import '../assets/stylesheets/GameSession.css';
import JoinButton from './JoinButton.js';
import WatchButton from './WatchButton.js';
//Picture memory: https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj02_bI7ZbYAhXKslQKHdk2BvQQjRwIBw&url=https%3A%2F%2Fmentalmojo.me%2Fbecome-a-memory-grand-master%2F&psig=AOvVaw1jIVM_q8YIrD_xOaV15o48&ust=1513799704663720
//PlusMinus: https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjtiqGd7pbYAhVpw1QKHcLQA-wQjRwIBw&url=http%3A%2F%2Fwww.prweb.com%2Freleases%2F2014%2F06%2Fprweb11915644.htm&psig=AOvVaw3oohPrAUNB6BCTZTlDFVgB&ust=1513799855386860
//Triangle:
class GameSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: this.props.link
        };
    }

    render() {
        return(
            <div class="card">
                <div class="card-image"></div>
                <div class="card-info">
                  <div class="card-title">Hie</div>
                  <div class="card-detail">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis beatae nisi soluta ex animi aperiam iste voluptatem, voluptatibus impedit rem natus doloribus sed ullam provident sunt odit eaque excepturi modi.</div>
                </div>
                <div class="card-social">
                  <ul>
                    <li><i class="fa fa-comment-o" aria-hidden="true"></i></li>
                    <li><i class="fa fa-heart-o" aria-hidden="true"></i></li>
                    <li><i class="fa fa-share-alt" aria-hidden="true"></i></li>
                  </ul>
                </div>
            </div>
        );
    }
}

export default GameSession;

// {/* <div className="roomBlock">
//     {/* <img className="" alt="Pikachu gif" src="https://media.giphy.com/media/OgsZnIsoPkCfS/giphy.gif"/> */}
//     <div className="roomName">
//       <h3>Game Room Name</h3>
//     </div>
//     {/* <h3>{this.state.GameRoomName}</h3> */}
//     <div className="gameInfo">
//       <div id="playerList">
//         <div className="player">Pikachu</div>
//       </div>
//       <div className="playerInfo">
//         <div id="playerListAvatar">
//             {this.state.links}
//         </div>
//       </div>
//     </div>
//     <div id="menuOptions">
//       <div id="joinButton">
//         <JoinButton />
//       </div>
//       <div id="watchButton">
//         <WatchButton />
//       </div>
//     </div>
// </div> */}
