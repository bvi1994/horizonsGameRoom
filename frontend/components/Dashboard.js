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
            chatOpen: false,
            joined: false,
            socket: SOCKET
        };
        this.openSecondary = true;
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
    toggleDrawer() {
        this.setState({
            chatOpen: !this.state.chatOpen
        });
    }
    joinRoom() {
        if(!this.state.joined) {
            this.setState({
                joined: true
            }, () =>
                this.state.socket.emit('room', "Main Chat Room")
            );
        }
        this.toggleDrawer();
    }
    render() {
        return (
        <div style={{height: "100%"}}>
            <div id="mainDashboard" style={{minHeight: "100%"}}>
                <Profile user={this.state.user} addGame={this.addGameSession} joinRoom={() => this.joinRoom()}/>
                <CurrentGameSession session={this.state.gameSession}/>
                <Drawer width={450} openSecondary={this.openSecondary} open={this.state.chatOpen}>
                    <Chatbox user={this.state.user} socket={this.state.socket} />
                </Drawer>
            </div>
            <footer className="footer">
                <div id="copyright" className="col-md-12">
                        <p>Copyright © 2016 <a href="https://www.joinhorizons.com/">Horizons Education, LLC.</a></p>
                </div>
            </footer>
          </div>
        );
    }
}


export default Dashboard;
