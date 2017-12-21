import React, { Component } from "react";
import Modal from "react-modal";
import '../assets/stylesheets/CreateGame.css';
import { BASE_URL } from './general';

class CreateGame extends Component {
    constructor(props) {
        super(props);
        this.session = BASE_URL + "/game/plusMinus/" + this.props.userInfo.username;
        this.state = {
            modalOpen: false,
            overlayClickClose: true,
            redirect: false
        };
        this.openModal = this.openModal.bind(this);
        this.modalClose = this.modalClose.bind(this);
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
    render() {
        return (
            <div>
                <button id="createGameButton" onClick={() => this.openModal()}>Create Game</button>
                <Modal
                  isOpen={this.state.modalOpen}
                  onRequestClose={this.modalClose}
                  ariaHideApp={false}
                  shouldCloseOnOverlayClick={this.state.overlayClickClose}
                  contentLabel="Modal"
                >
                  <h1>Choose a game</h1>
                  <a href={BASE_URL + "/game/slapjack/" + this.props.userInfo.username}>Slapjack</a>
                  <br/>
                  <a href={BASE_URL + "/game/plusMinus/" + this.props.userInfo.username} onClick={this.props.addGame(this.session)}>PlusMinus</a>
                  <br/>
                  <a href={BASE_URL + "/game/triangle" + this.props.userInfo.username} onClick={() => this.props.addGame(BASE_URL + "/game/triangle/" + this.props.userInfo.username)}>Triangle</a>
                  <br/>
                  <button onClick={this.modalClose}>close</button>
                </Modal>
            </div>
        );
    }
}


export default CreateGame;
