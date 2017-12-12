import React, { Component } from "react";
import { Redirect } from "react-router";
import Modal from "react-modal";
import axios from 'axios';
const BASE_URL = 'https://horizonsplayground.herokuapp.com';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
class CreateGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            overlayClickClose: true,
            game: "",
            redirect: false
        };
        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }
    componentDidMount() {

    }
    openModal() {
        this.setState({
            modalOpen: true
        });
    }
    modalClose() {
        this.setState({
            modalOpen: false
        });
    }
    slapjack() {
        axios.get(BASE_URL + '/create/slapjack')
        .then(() => {
            this.setState({
                game: "/game/slapjack"
            });
        })
        .then(() => {
            this.setState({
                redirect: true
            });
        })
        .catch(e => console.log("create Game fail", e));
    }
    render() {
        return (this.state.redirect) ? <Redirect to={this.state.game} /> : (
            <div>
                <button id="createGameButton" onClick={() => this.openModal()}>Create Game Room</button>
                <Modal
                  isOpen={this.state.modalOpen}
                  onRequestClose={this.modalClose}
                  ariaHideApp={false}
                  shouldCloseOnOverlayClick={this.state.overlayClickClose}
                  contentLabel="Modal"
                >
                  <h1>Choose a game</h1>
                  {/* <button onClick={() => this.slapjack()}>SlapJack</button> */}
                  <a href={BASE_URL + "/create/slapjack"}>slapjack</a>
                  <button onClick={this.modalClose}>close</button>
                </Modal>
            </div>
        );
    }
}


export default CreateGame;
