import React, { Component } from "react";
import Profile from './Profile';
import axios from 'axios';
import '../assets/stylesheets/Dashboard.css';
import Chatbox from './Chatbox.js';
import CurrentGameSession from './CurrentGameSession.js';
import { BASE_URL } from './general';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            user: {},
            gameSession: []
        };
    }
    componentDidMount() {
        axios.get(BASE_URL + '/profile')
        .then(userInfo => {
            this.setState({
                user: userInfo.data
            });
        })
        .catch(e => {
            console.log("componentWillMount Error", e);
        });
    }
    addGameSession(session) {
        console.log('session created', session);
        this.setState({
            gameSession: [...this.state.gameSession, session]
        });
    }
    render() {
        // return (this.state.redirect) ? <Redirect to="/" /> : (
        return (
        <div style={{height: "100%"}}>
            <div id="mainDashboard" style={{minHeight: "100%"}}>
                <Profile user={this.state.user} addGame={this.addGameSession}/>
                <CurrentGameSession session={this.state.gameSession}/>
                <Chatbox user={this.state.user}/>
            </div>
          </div>
        );
    }
}


export default Dashboard;
