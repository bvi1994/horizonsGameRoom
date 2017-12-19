import React, { Component } from "react";
import { Redirect } from "react-router";
import CreateGame from './CreateGame';
import axios from 'axios';
import { GithubLoginButton } from 'react-social-login-buttons';
import '../assets/stylesheets/Profile.css';
const BASE_URL = 'https://horizonsplayground.herokuapp.com';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            redirect: false
        };
    }
    componentWillReceiveProps(props) {
        this.setState({
            user: props.user
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
        return (this.state.redirect) ? <Redirect to="/" /> : (
            <div id="profileInfo">
                <div className="avatar">
                  <div className="avatarImage">
                      <img src={this.state.user.photo} alt={this.state.user.username + "'s profile"} height="200" width="200"/>
                  </div>
                </div>
                <div className="userName">
                    <p>{this.state.user.username}</p>
                </div>
                <p>{this.state.user.email}</p>
                <a href={this.state.user.profileUrl}>Get back to work :)</a>
                <a href="/ready/">Click to kill time!</a>
                <button onClick={() => this.logout()}>Log out</button>
                <CreateGame userInfo={this.state.user}/>
            </div>
        );
    }
}


export default Profile;
