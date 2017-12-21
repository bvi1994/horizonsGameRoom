import React, { Component, PropTypes } from "react";
import Avatar from 'material-ui/Avatar';
import axios from "axios";
import '../assets/stylesheets/ChatWindow.css';
import { BASE_URL } from './general';
import '../assets/stylesheets/Chatbox.css';
import '../assets/stylesheets/ChatWindow.css';

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: [],
            autoFocus: true
        };
    }
    componentDidMount() {
        this.props.socket.on('message', message => {
            this.setState({messages: [...this.state.messages, message]});
        });
        axios.get(BASE_URL + '/messages')
        .then(res => {
            this.setState({
                messages: [...this.state.messages, ...res.data]
            });
        })
        .catch(e => {
            console.log(e);
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const newMessage = {
            username: this.props.user.username,
            photo: this.props.user.photo,
            content: this.state.message
        };
        this.setState({messages: [...this.state.messages, newMessage], message: ''});
        this.props.socket.emit('message', newMessage);
        axios.post(BASE_URL + '/messages', {
            username: this.props.user.username,
            photo: this.props.user.photo,
            content: newMessage.content
        })
        .then((res) => {
            console.log('message created', res);
        })
        .catch(e => {
            console.log(e);
        });
    }
    handleChange(e) {
        this.setState({message: e.target.value});
    }
    render() {
        return (
          <div style={{height: "90%"}}>
              <div className="chat-history" style={{height: "80%"}}>
                  <ul>
                    {this.state.messages.map((msg) => {
                        const myMsg = msg.message.username === this.state.user.username ? "message my-message" : "message other-message";
                        return (
                            <li>
                                <div className="message-data">
                                    <span className="message-data-name"><Avatar src={msg.message.photo} />{msg.message.username}</span>
                                </div>
                                <div className={myMsg}>{msg.message.content}</div>
                            </li>
                        );
                    })
                    }
                  </ul>
              </div>
              <div className="textBox">
                <form onSubmit = {(e) => this.handleSubmit(e)}>
                  <input autoFocus={this.state.autoFocus} onChange = {(e) => this.handleChange(e) } value={this.state.message}/>
                </form>
              </div>
          </div>
        );
    }
}

ChatWindow.propTypes = {
    socket: PropTypes.object,
    name: PropTypes.string,
    room: PropTypes.string,
    username: PropTypes.string,
};

export default ChatWindow;
