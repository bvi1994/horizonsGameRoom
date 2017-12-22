import React, { Component } from "react";
import '../assets/stylesheets/CurrentGameSession.css';
import GameSession from './GameSession.js';

class CurrentGameSession extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: this.props.session
        };
    }
    render() {
        return(
            <div id="gamesInSession" className="section">
                <h1>Trending Game Rooms :)</h1>
                <div className="columnofGames">
                  <div className="rowofGames">
                      <GameSession game={"SlapJack"}/>
                      <GameSession game={"Triangle"}/>
                      <GameSession game={"Hide & Seek"}/>
                    {/* {
                        this.state.sessions.map(s => {
                            <GameSession link={s}/>
                        })
                    } */}
                  </div>
                </div>
            </div>
        );
    }
}

export default CurrentGameSession;
