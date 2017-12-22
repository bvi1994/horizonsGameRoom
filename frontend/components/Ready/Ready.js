import React, { Component } from "react";
import { Redirect } from "react-router";
import '../../assets/stylesheets/Ready.css';

class Ready extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
              <h1>Choose a page</h1>
              <a href="/ready/plane/">
                  <button className="btn-3d yellow">Air Plane Ride</button>
              </a>
              <br/>
              <a href="/ready/slowMo/">
                  <button className="btn-3d purple">Slow Motion</button>
              </a>
              <br/>
            </div>
        );
    }
}


export default Ready;
