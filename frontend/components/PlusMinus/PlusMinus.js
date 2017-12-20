import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import '../../assets/stylesheets/PlusMinus.css';
import { SOCKET } from '../general';

class Level extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div>
              <button onClick={() => this.props.setLevel(0)}>EASY</button>
              <br/>
              <button onClick={() => this.props.setLevel(1)}>MEDIUM</button>
              <br/>
              <button onClick={() => this.props.setLevel(2)}>HARD</button>
          </div>
        );
    }
}

class Score extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div>
            <h1>Your score: {this.props.score}</h1>
            <a href="/">Go back to main page</a>
            <br/>
            {this.props.spectator ? <p>Thank you for watching ;)</p> : <a href="/game/plusMinus">Play again</a>}
          </div>
        );
    }
}

class PlusMinus extends Component {
    constructor(props) {
        super(props);
        this.operators = ["+", "-", "*"];
        this.nextComponent = [];
        this.socket = SOCKET
        this.state = {
            timeLimit: 30,
            questions: [],
            level: null, // 0: easy, 1: medium, 2: hard
            score: 0,
            value: '',
            gameOver: false,
            user: null
        };
    }
    componentDidMount() {
        this.socket.on('errorMessage', message => {
            console.log("Unable to connect. Error: ", message);
        });
        axios.get(BASE_URL + '/profile')
        .then(user => {
            if(!this.state.user) {
                this.setState({
                    user: user
                }, () => {
                    this.socket.emit('username', this.state.user.username);
                    this.socket.emit('createGame', {
                        username: this.state.user.username,
                        game: "PlusMinus",
                        state: this.state,
                    });
                });
            } else if(this.state.user.username !== user.username) {
                this.isSpectator = true;
                this.socket.emit('watch', this.state.user.username + "PlusMinus");
                this.socket.on('gameMove', move => {
                    this.setState(move);
                });
            }
        })
        .catch(e => {
            console.log(e);
        });
    }
    setLevel(val) {
        this.setState({
            level: val
        }, () => {
            this.makeQuestions();
            this.countDown();
        });
    }
    makeQuestions() {
        var questions = [];
        let randomize = 0;
        let first;
        let second;
        let operator;
        let answer;
        switch(this.state.level) {
            case 0:
                randomize = 10;
                break;
            case 1:
                randomize = 100;
                break;
            case 2:
                randomize = 200;
                break;
            default:
                randomize = 10;
                break;
        }
        for(let i = 0; i < 10; i++) {
            first = ~~(Math.random() * randomize);
            second = ~~(Math.random() * randomize);
            operator = this.state.level === 2 ? ~~(Math.random() * 3) : ~~(Math.random() * 2);
            switch(operator) {
                case 0:
                    answer = first + second;
                    break;
                case 1:
                    answer = first - second;
                    break;
                case 2:
                    answer = first * second;
                    break;
                default:
                    break;
            }
            const question = {
                first: first,
                second: second,
                operator: operator,
                answer: answer
            };
            questions.push(question);
        }
        this.setState({
            questions: questions
        });
    }
    countDown() {
        if(this.state.timeLimit > 0 ) {
            this.setState({ timeLimit: this.state.timeLimit - 1 });
            setTimeout(this.countDown.bind(this), 1000);
        } else if(this.state.timeLimit === 0) {
            this.setState({
                gameOver: true
            });
        }
    }
    answer(e, i) {
        e.preventDefault();
        if(parseInt(e.target.value, 10) === this.state.questions[i].answer) {
            if(ReactDOM.findDOMNode(this.nextComponent[i + 1]) === null) {
                this.nextComponent.forEach(nc => {nc.value = '';});
                this.makeQuestions();
                ReactDOM.findDOMNode(this.nextComponent[0]).focus();
            } else {
                ReactDOM.findDOMNode(this.nextComponent[i + 1]).focus();
            }
            this.setState({
                score: this.state.score + this.state.level + 1
            });
        }
    }
    render() {
        const main = (
          <div>
            <h1>Hello PlusMinus!</h1>
            <h1>Score: {this.state.score}</h1>
            <h1>Time Left: {this.state.timeLimit}</h1>
            <ol>
              {
                this.state.questions.map((question, i) => {
                    return (<h3 key={i}>{question.first} {this.operators[question.operator]} {question.second} =
                      <input className="input-field" ref={c => {this.nextComponent[i] = c;}} key={i} onChange={e => this.answer(e, i)}/></h3>);
                })
              }
            </ol>
          </div>
        );
        const level = <Level setLevel={v => this.setLevel(v)} />;
        const score = <Score spectator={this.isSpectator} score={this.state.score} />;
        let response;
        if(this.state.gameOver) {
            response = score;
            this.socket.emit('gameOver', this.state.user.username + "PlusMinus");
        } else if(this.state.level === null) {
            response = level;
        } else {
            response = main;
        }
        return response;
    }
}


export default PlusMinus;
