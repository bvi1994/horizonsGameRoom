import React, {Component} from "react";
import axios from 'axios';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
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
        axios.post('http://localhost:3000/register', {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName
        }, {
            withCredentials: true
        })
      .then(() => this.setState({redirect: true}))
      .catch((err) => {console.log('Register Post request failed', err);});
    }
    render() {
        return(
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
                <button onClick={() => this.login()}><a href="/auth/test">
                  Login
                </a></button>
              </div>
              <div id="githubSignUp">
                <button>
                  Sign up with Github
                </button>
              </div>
            </div>
          </div>
        );
    }
}


export default LoginForm;
