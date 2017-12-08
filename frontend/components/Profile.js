import React, { Component } from "react";
import CreateGame from './CreateGame';
import axios from 'axios';
const BASE_URL = 'http://8096a45d.ngrok.io';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }
    componentWillMount() {
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
            <div>
                <img src={this.state.user.photo} alt={this.state.user.username + "'s profile"} height="200" width="200"/>
                <p>{this.state.user.username}</p>
                <p>{this.state.user.displayName}</p>
                <p>{this.state.user.email}</p>
                <a href={this.state.user.profileUrl}>Get back to work :)</a>
                <button onClick={() => this.logout()}>Log out</button>
                <CreateGame userInfo={this.state.user}/>
            </div>
        );
    }
}


export default Profile;
