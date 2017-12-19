import React, { Component } from "react";
import { Redirect } from "react-router";
const BASE_URL = 'https://horizonsplayground.herokuapp.com';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
class Ready extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            route: '/'
        };
    }
    selectPlane() {
        this.setState({
            route: '/plane',
            redirect: true
        });
    }
    selectSlow() {
        this.setState({
            route: '/slowMo',
            redirect: true
        });
    }
    render() {
        return this.state.redirect ? <Redirect to={this.state.route} /> : (
            <div>
              <h1>Choose a page</h1>
              <button onClick={() => this.selectPlane()}>Air Plane Ride</button>
              <br/>
              <button onClick={() => this.selectSlow()}>Slow Motion</button>
              <br/>
            </div>
        );
    }
}


export default Ready;
