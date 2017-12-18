import React, { Component, PropTypes } from "react";
import { Message } from '../../sequelize/models';
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
        Message.findAll({
            attributes: { exclude: ['updatedAt', 'id'] }
        })
        .then(messages => {
            messages.map(message => {
                console.log(message);
            });
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
          <div style={{height: "90%"}}>
              <div className="room" style={{height: "75%"}}>
                  <div className="message">
                    {this.state.messages.map((msg) => ( <p> {msg.username}: {msg.content}</p>))}
                  </div>
              </div>
              <div className="textBox" style={{height: "20%"}}>
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
