import React, {Component} from "react";
import { Redirect } from 'react-router';
import axios from 'axios';
import '../assets/stylesheets/LoginForm.css';


const BASE_URL = 'http://8096a45d.ngrok.io';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false
        };
    }
    componentWillMount() {
        axios.get(BASE_URL + '/loggedIn')
        .then(result => {
            if(result.status === 200) {
                console.log('successfully authorized.', result);
                this.setState({
                    redirect: true
                });
            } else {
                console.log("unsuccessful auth");
            }
        })
        .catch(e => {
            console.log('error auth', e);
        });
    }
    onUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }
    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }
    login() {
        axios.post(BASE_URL + '/login', {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName
        }, {
            withCredentials: true
        })
        .then(() => {
            this.setState({redirect: true});
            console.log("post request went through.");
        })
        .catch((err) => {console.log('Register Post request failed', err);});
    }
    render() {
        return (this.state.redirect) ? <Redirect to="/dashboard" /> : (
          <div>
            <div id="loginForm">
                <div id="loginImage">
                  Welcome to the Horizons Arcade!
                </div>
              <div id="userNameField">
                Username: <br />
                <input type="text" onChange={e => this.onUsernameChange(e)} name="firstName" placeholder="Username"/>
              </div>
              <div id="passwordField">
                Password: <br />
                <input type="password" onChange={e => this.onPasswordChange(e)} name="password" placeholder="Password" />
              </div>
              <div id="loginButton">
                <button onClick={() => this.login()}>
                  Login
                </button>
              </div>
              <div id="githubSignUp">
                <a href="/auth/github">Login with Github</a>
              </div>
            </div>
          </div>
        );
    }
}


export default LoginForm;
