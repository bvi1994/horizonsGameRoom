import React, { Component } from "react";
import ReactDOM from "react-dom";
import TextField from 'material-ui/TextField';
import axios from 'axios';
const BASE_URL = 'https://horizonsplayground.herokuapp.com';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
class PlusMinus extends Component {
    constructor(props) {
        super(props);
        this.operators = ["+", "-", "*"];
        this.nextComponent = null;
        this.state = {
            timeLimit: 30,
            questions: [],
            level: 0, // 0: easy, 1: medium, 2: hard
            score: 0,
            value: ''
        };
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
    answer(e, i) {
        e.preventDefault();
        console.log(parseInt(e.target.value), this.state.questions[i].answer);
        if(parseInt(e.target.value) === this.state.questions[i].answer) {
            console.log("Inside if statement");
            ReactDOM.findDOMNode(this.nextComponent).focus();
        }
    }
    render() {
        return (
          <div>Hello PlusMinus!
            <ol>
              {
                this.state.questions.map((question, i) => {
                    return <h1 key={i}>{question.first} {this.operators[question.operator]} {question.second} = <input ref={c => {return this.nextComponent = c;}} key={i} onChange={e => this.answer(e, i)}/></h1>;
                })
              }
            </ol>
          </div>


        );
    }
}


export default PlusMinus;
