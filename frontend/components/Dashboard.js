import React, { Component } from "react";
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
          <button onClick={() => this.logout()}>Log out</button>
        );
    }
}


export default Dashboard;
