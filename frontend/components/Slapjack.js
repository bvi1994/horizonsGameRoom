import React, { Component } from "react";
import { Redirect } from "react-router";

class Slapjack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }
    render() {
        return (this.state.redirect) ? <Redirect to="/" /> : <div>Hello Slapjack!</div>;
    }
}


export default Slapjack;
