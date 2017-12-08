import React, { Component } from "react";
import Modal from "react-modal";
import axios from 'axios';
const BASE_URL = 'http://8096a45d.ngrok.io';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
class CreateGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            overlayClickClose: true
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
    render() {
        return (
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

                  <button onClick={this.modalClose}>close</button>
                </Modal>
            </div>
        );
    }
}


export default CreateGame;
