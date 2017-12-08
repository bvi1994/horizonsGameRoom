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
          <div>
            <div id="loginForm">
              <div id="loginImage">
                Welcome to the Horizons Arcade!
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
