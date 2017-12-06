import React, { Component } from "react";

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        
    }
    render() {
        return(
          <div>
            <a href="/logout">Log Out</a>
          </div>
        );
    }
}


export default Dashboard;
