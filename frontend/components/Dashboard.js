import React, { Component } from "react";
import { Redirect } from "react-router";
import Profile from './Profile';
import axios from 'axios';
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
    render() {
        return (this.state.redirect) ? <Redirect to="/" /> : (
          <div>
              <Profile />
          </div>
        );
    }
}


export default Dashboard;
