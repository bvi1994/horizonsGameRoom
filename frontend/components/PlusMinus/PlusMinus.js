import React, { Component } from "react";
import ReactDOM from "react-dom";
import TextField from 'material-ui/TextField';
import axios from 'axios';
import '../../assets/stylesheets/Chatbox.css';
const BASE_URL = 'https://horizonsplayground.herokuapp.com';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
class PlusMinus extends Component {
    constructor(props) {
        super(props);
        this.operators = ["+", "-", "*"];
        this.nextComponent = [];
        this.state = {
            timeLimit: 30,
            questions: [],
            level: 0, // 0: easy, 1: medium, 2: hard
            score: 0,
            value: ''
        };
        this.countDown();
    }
    componentWillMount() {
        this.makeQuestions(this.state.level);
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
        this.setState({ value: this.state.timeLimit - 1 });
        setTimeout(this.countDown.bind(this), 1000);
    }
    answer(e, i) {
        e.preventDefault();
        console.log(parseInt(e.target.value), this.state.questions[i].answer);
        if(parseInt(e.target.value) === this.state.questions[i].answer) {
            ReactDOM.findDOMNode(this.nextComponent[i + 1]).focus();
            const score = Number(this.state.score);
            this.setState({
                score: score + this.state.level
            });
        }
    }
    render() {
        return (
          <div>
            <h1>Hello PlusMinus!</h1>
            <h1>Score: {this.state.score}</h1>
            <h1>Time Left: {this.state.timeLimit}</h1>
            <ol>
              {
                this.state.questions.map((question, i) => {
                    return (<h1 key={i}>{question.first} {this.operators[question.operator]} {question.second} =
                      <input className="inputField" ref={c => {this.nextComponent[i] = c;}} key={i} onChange={e => this.answer(e, i)}/></h1>);
                })
              }
            </ol>
          </div>


        );
    }
}


export default PlusMinus;
