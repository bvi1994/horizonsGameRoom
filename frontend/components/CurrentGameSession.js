import React, { Component } from "react";
import '../assets/stylesheets/CurrentGameSession.css';
import GameSession from './GameSession.js';

class CurrentGameSession extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div id="gamesInSession" className="section">
                Current Games in Session
                <div className="columnofGames">
                  <div className="rowofGames">
                    {
                        this.props.session.map(s => {
                            <GameSession link={s}/>
                        })
                    }
                  </div>
                </div>
            </div>
        );
    }
}

export default CurrentGameSession;
