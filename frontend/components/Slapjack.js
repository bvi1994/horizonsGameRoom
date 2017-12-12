import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from 'axios';
const BASE_URL = 'https://horizonsplayground.herokuapp.com';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
class Slapjack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }
    render() {
        return (this.state.redirect) ? <Redirect to="/" /> : <div className="world">Hello Slapjack!</div>;
    }
}


export default Slapjack;
