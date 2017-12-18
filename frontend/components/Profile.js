import React, { Component } from "react";
import { Redirect } from "react-router";
import CreateGame from './CreateGame';
import axios from 'axios';
<<<<<<< HEAD
import {GithubLoginButton} from 'react-social-login-buttons';
import '../assets/stylesheets/Profile.css';
const BASE_URL = 'http://8096a45d.ngrok.io';
=======
const BASE_URL = 'https://horizonsplayground.herokuapp.com';
>>>>>>> 168e9aba8606050a3efdef268f25a5d86573649c
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
<<<<<<< HEAD
        return(
            <div id="profileInfo" className="section">
                {/* <img src={this.state.user.photo} alt={this.state.user.username + "'s profile"} height="200" width="200"/> */}
                <div className="avatar">
                  <div className="avatarImage">
                    <img src="https://i.imgur.com/x6PRlCE.png" alt="Pikachu avatar" />
                    {/* <Avatar src="https://i.imgur.com/x6PRlCE.png" size={150}/> */}
                  </div>
                  <div className="userName">
                    {/* <p>{this.state.user.displayName}</p>                   */}
                    Pikachu
                  </div>
                </div>
=======
        return (this.state.redirect) ? <Redirect to="/" /> : (
            <div>
                <img src={this.state.user.photo} alt={this.state.user.username + "'s profile"} height="200" width="200"/>
>>>>>>> 168e9aba8606050a3efdef268f25a5d86573649c
                <p>{this.state.user.username}</p>
                <p>{this.state.user.email}</p>
<<<<<<< HEAD
                <a href={this.state.user.profileUrl}><GithubLoginButton text="Get back to work"/></a>
                <button id="logoutButton" onClick={() => this.logout()}>Log out</button>
=======
                <a href={this.state.user.profileUrl}>Get back to work :)</a>
                <a href="/ready/">Click to kill time!</a>
                <button onClick={() => this.logout()}>Log out</button>
>>>>>>> 168e9aba8606050a3efdef268f25a5d86573649c
                <CreateGame userInfo={this.state.user}/>
            </div>
        );
    }
}


export default Profile;
