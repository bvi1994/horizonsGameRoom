import React, { Component } from "react";
import ReactDOM from "react-dom";
import TextField from 'material-ui/TextField';
import axios from 'axios';
import '../../assets/stylesheets/PlusMinus.css';
const BASE_URL = 'https://horizonsplayground.herokuapp.com';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'

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
          <div>Your score: {this.props.score}</div>
        );
    }
}

class PlusMinus extends Component {
    constructor(props) {
        super(props);
        this.operators = ["+", "-", "*"];
        this.nextComponent = [];
        this.state = {
            timeLimit: 30,
            questions: [],
            level: null, // 0: easy, 1: medium, 2: hard
            score: 0,
            value: '',
            gameOver: false,
        };
        this.countDown();
    }
    componentWillMount() {
        this.makeQuestions(this.state.level);
    }
    setLevel(val) {
        this.setState({
            level: val
        });
    }
    makeQuestions(level) {
        var questions = [];
        let randomize = 0;
        let first;
        let second;
        let operator;
        let answer;
        switch(level) {
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
            operator = level === 2 ? ~~(Math.random() * 3) : ~~(Math.random() * 2);
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
        console.log(parseInt(e.target.value), this.state.questions[i].answer);
        if(parseInt(e.target.value) === this.state.questions[i].answer) {
            if(ReactDOM.findDOMNode(this.nextComponent[i + 1]) === null) {
                this.nextComponent.forEach(nc => {nc.value = '';});
                this.makeQuestions(this.state.level);
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
                    return (<h1 key={i}>{question.first} {this.operators[question.operator]} {question.second} =
                      <input className="input-field" ref={c => {this.nextComponent[i] = c;}} key={i} onChange={e => this.answer(e, i)}/></h1>);
                })
              }
            </ol>
          </div>
        );
        const level = <Level setLevel={v => this.setLevel(v)} />;
        const score = <Score score={this.state.score} />;
        let response;
        if(this.state.gameOver) {
            response = score;
        } else if(this.state.level === null) {
            response = level;
        } else {
            response = main;
        }
        return response;
    }
}


export default PlusMinus;
