import React, {Component} from "react";
import { Redirect } from 'react-router';
import axios from 'axios';
import { GithubLoginButton } from 'react-social-login-buttons';
import '../assets/stylesheets/LoginForm.css';
import { BASE_URL } from './general';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }
    componentDidMount() {
        axios.get(BASE_URL + '/loggedIn')
        .then(result => {
            if(result.status === 200) {
                console.log('successfully authorized.');
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

    render() {
        return (this.state.redirect) ? <Redirect to="/dashboard" /> : (
        // return (
          <div>
            <div id="loginForm">
              <div id="loginImage">
                <img src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/2229/s300/logo-lg.png" alt="Horizons Logo" height="150px" width="150px"/>
              </div>
              <div id="welomeText">
                <p>Welcome to the Horizons Arcade!</p>
              </div>
              <div id="githubSignUp">
                <a href="/auth/github" style={{textDecoration: "none"}}>
                  <GithubLoginButton />
                </a>
              </div>
            </div>
          </div>
        );
    }
}


export default LoginForm;
