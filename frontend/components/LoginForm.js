import React, {Component} from "react";

class LoginForm extends Component {
    constructor(props) {
        super(props);
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
                <input type="text" name="firstName" placeholder="Username"/>
              </div>
              <div id="passwordField">
                Password: <br />
                <input type="password" name="userName" placeholder="Password" />
              </div>
              <div id="loginButton">
                <button>
                  Login
                </button>
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
