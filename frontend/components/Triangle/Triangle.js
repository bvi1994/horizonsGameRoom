import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import {SOCKET, BASE_URL} from "../general";
import '../../assets/stylesheets/Triangle.css';

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
            {this.props.spectator ? <p>Thank you for watching ;)</p> : <a href="/game/triangle">Play again</a>}
          </div>
        );
    }
}

class Triangle extends Component {
    constructor(props) {
        super(props);
        this.operators = ["+", "-", "*"];
        this.nextComponent = [];
        this.socket = SOCKET;
        this.state = {
            timeLimit: 120,
            question: {},
            userAnswers: ["", "", ""],
            level: null,
            score: 0,
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
                        game: "Triangle",
                        state: this.state,
                    });
                });
            } else if(this.state.user.username !== user.username) {
                this.isSpectator = true;
                this.socket.emit('watch', this.state.user.username + "Triangle");
                this.socket.on('gameMove', move => {
                    this.setState(move);
                });
            }
        })
        .catch(e => {
            console.log(e);
        });
        this.makeQuestions();
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
        // var questions = [];
        let randomize = 0;
        let first;
        let second;
        let third;
        var operators = [];
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
        // for(let i = 0; i < 10; i++) {
            first = ~~(Math.random() * randomize);
            second = ~~(Math.random() * randomize);
            third = ~~(Math.random() * randomize);
            // firstOperator = this.state.level === 2 ? ~~(Math.random() * 3) : ~~(Math.random() * 2);
            for(let j = 0; j < 3; j++) {
                operators.push(~~(Math.random() * 2));
            }
            // See: https://stackoverflow.com/questions/7959910/javascript-arithmetic-operators-in-string-array
            const sign = {
                "0": function(a, b) { return a + b; },
                "1": function(a, b) { return a - b; },
                "2": function(a, b) { return a * b; }
            };
            const firstProblem = sign[operators[0]](first, second);
            const secondProblem = sign[operators[2]](second, third);
            answer = sign[operators[1]](firstProblem, secondProblem);
            const question = {
                first: first,
                second: second,
                third: third,
                operator: operators,
                answer: answer
            };
            // questions.push(question);
        // }
        this.setState({
            question: question,
            userAnswers: ["", "", ""]
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
    answer(e, i, j) {
        let operator;
        switch(i) {
            case 0:
                operator = '+';
                break;
            case 1:
                operator = "-";
                break;
            case 2:
                operator = "*";
                break;
            default:
                break;
        }
        // e.preventDefault();
        let ans = this.state.userAnswers;
        ans[j] = e;
        this.setState({
            userAnswers: ans
        }, () => {console.log("Userinput " ,this.state.userAnswers)});
        if(operator === e) {
            console.log("Correct");
            if(j === 2) {
                // The last operation of the problem
                this.setState({
                    score: this.state.score + this.state.level + 1
                });
                this.makeQuestions();
            }
            // if(ReactDOM.findDOMNode(this.nextComponent[i + 1]) === null) {
            //     this.nextComponent.forEach(nc => {nc.value = '';});
            //     this.makeQuestions();
            //     ReactDOM.findDOMNode(this.nextComponent[0]).focus();
            // } else {
            //     ReactDOM.findDOMNode(this.nextComponent[i + 1]).focus();
            // }
            // this.setState({
            //     score: this.state.score + this.state.level + 1
            // });
        }
    }
    render() {
         // console.log(this.state.questions);
        const main = (
            <div>
                <h1>Hello Triangle!</h1>
                <h1>Score: {this.state.score}</h1>
                <h1>Time Left: {this.state.timeLimit}</h1>
                                <div className="problem">
                                    <div className="firstRow">
                                        <div className="circle">{this.state.question.first}</div>
                                        <div className="circle">{this.state.question.second}</div>
                                        <div className="circle">{this.state.question.third}</div>
                                    </div>
                                    <div className="secondRow">
                                        <div className="branch">\</div>
                                        <div className="operation"><input className="operationField" type="text" name="firstOperation" value={this.state.userAnswers[0]} maxLength="1" onChange={ (event) => this.answer(event.target.value, this.state.question.operator[0], 0)} /></div>
                                        <div className="branch">/</div>
                                        <div className="branch">\</div>
                                        <div className="operation"><input className="operationField" type="text" name="secondOperation" value={this.state.userAnswers[1]} maxLength="1" onChange={ (event) => this.answer(event.target.value, this.state.question.operator[2], 1)} /></div>
                                        <div className="branch">/</div>
                                    </div>
                                    <div className="thirdRow">
                                        <div className="circle" />
                                        <div className="circle" style={{marginLeft: "40px"}} />
                                    </div>
                                    <div className="fourthRow">
                                        <div className="branch">\</div>
                                        <div className="operation"><input className="operationField" type="text" name="thirdOperation" value={this.state.userAnswers[2]} maxLength="1" onChange={ (event) => this.answer(event.target.value, this.state.question.operator[1], 2)} /></div>
                                        <div className="branch">/</div>
                                    </div>
                                    <div className="fifthRow">
                                        <div className="circle">{this.state.question.answer}</div>
                                    </div>
                                </div>
            </div>
        );
        const level = <Level setLevel={v => this.setLevel(v)} />;
        const score = <Score spectator={this.isSpectator} score={this.state.score} />;
        let response;
        if(this.state.gameOver) {
            response = score;
            this.socket.emit('gameOver', this.state.user.username + "Triangle");
        } else if(this.state.level === null) {
            response = level;
        } else {
            response = main;
        }
        return response;
    }
}

export default Triangle;
