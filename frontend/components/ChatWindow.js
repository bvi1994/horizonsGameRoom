import React, { Component, PropTypes } from "react";
import '../assets/stylesheets/Chatbox.css';
// import io from 'socket.io-client';

class ChatWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: []
        };
    }
    componentDidMount() {
        this.props.socket.on('message', message => {
            this.setState({messages: [...this.state.messages, message]});
        });
    }
    componentWillReceiveProps(nextProps) {
        const messageHistory = this.props.room === nextProps.room ? this.state.messages : [];
        this.setState({messages: messageHistory});
    }
    handleSubmit(event) {
        event.preventDefault();
        const newMessage = {username: this.props.username, content: this.state.message};
        this.setState({messages: [...this.state.messages, newMessage], message: ''});
        this.props.socket.emit('message', newMessage.content);
    }
    handleChange(e) {
        this.setState({message: e.target.value});
    }
    render() {
        console.log("Render: ", this.props.username);
        return (
            <div>
                <div className="room">
                    This is a room
                    {this.state.messages.map((msg) => ( <p> {msg.username}: {msg.content}</p>))}
                    <form onSubmit = {(e) => this.handleSubmit(e)}>
                      <input onChange = {(e) => this.handleChange(e)} value = {this.state.message} />
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
