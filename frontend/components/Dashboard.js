import React, { Component } from "react";
import Profile from './Profile';
import axios from 'axios';
import Chatbox from './Chatbox.js';
import CurrentGameSession from './CurrentGameSession.js';
import Drawer from 'material-ui/Drawer';
import { BASE_URL, SOCKET } from './general';
import '../assets/stylesheets/Dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            gameSession: [],
            chatOpen: false
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
    toggleDrawer(open) {
        this.setState({
            chatOpen: open
        });
    }
    joinRoom() {
        SOCKET.emit('room', "Main Chat Room");
        this.toggleDrawer(true);
    }
    render() {
        return (
        <div style={{height: "100%"}}>
            <div id="mainDashboard" style={{minHeight: "100%"}}>
                <Profile user={this.state.user} addGame={this.addGameSession} joinRoom={() => this.joinRoom()}/>
                <CurrentGameSession session={this.state.gameSession}/>
                <Drawer anchor="left" open={this.state.chatOpen} onClose={this.toggleDrawer(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        <Chatbox user={this.state.user} socket={SOCKET} />
                    </div>
                </Drawer>
            </div>
          </div>
        );
    }
}


export default Dashboard;
