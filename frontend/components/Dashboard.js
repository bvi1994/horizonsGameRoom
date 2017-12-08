import React, { Component } from "react";
import axios from 'axios';
import '../assets/stylesheets/Dashboard.css';
import Profile from './Profile.js';
import Chatbox from './ChatBox.js';
import CurrentGameSession from './CurrentGameSession.js';
const BASE_URL = 'http://8096a45d.ngrok.io';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }
    componentDidMount() {
    }
    logout() {
        axios.get(BASE_URL + '/logout')
        .then(() => {
            this.setState({
                redirect: true
            });
        })
        .catch(e => {
            console.log('Logout Error', e);
        });
    }
    render() {
        return(
          <div style={{height: "100%"}}>
            <button onClick={() => this.logout()}>Log out</button>
            <div id="mainDashboard" style={{minHeight: "100%"}}>
                <Profile />
                <CurrentGameSession />
                <Chatbox />
            </div>
          </div>
        );
    }
}


export default Dashboard;
