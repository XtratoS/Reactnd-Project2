import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuesionsList from './QuestionsList';

export class Home extends Component {
    state = {
        visibleSection: 'unanswered'
    }

    switchSection(section) {
        if (section !== this.state.section) {
            this.setState({visibleSection: section});
        }
    }

    render() {
        const {answered, unanswered} = this.props;

        let questions = {}
        if (this.state.visibleSection === 'answered') {
            questions = answered
        } else {
            questions = unanswered
        }

        const selected = this.state.visibleSection;
        const selectedStyle = 'btn-primary';
        const notSelectedStyle = 'btn-outline-primary'
        return (
            <div className="text-center my-4 questions-container">
                <div className="m-1 p-1">
                    <button
                        className={`m-1 btn ${selected === 'unanswered' ? selectedStyle : notSelectedStyle}`}
                        onClick={() => {this.switchSection('unanswered')}}
                    >
                        Unanswered
                    </button>
                    <button
                        className={`m-1 btn ${selected === 'answered' ? selectedStyle : notSelectedStyle}`}
                        onClick={() => {this.switchSection('answered')}}
                    >
                        Answered
                    </button>
                </div>
                <QuesionsList
                    questions={this.props[this.state.visibleSection]}
                />
            </div>
        )
    }
}

function mapStateToProps({loggedInUser, questions}) {
    let unanswered = [];
    let answered = [];

    for (let questionId in questions) {
        let question = questions[questionId];

        console.log([...question.optionOne.votes, ...question.optionTwo.votes].includes(loggedInUser));
        if ( ([...question.optionOne.votes, ...question.optionTwo.votes].includes(loggedInUser)) === false ) {
            answered.push(questionId);
        } else {
            unanswered.push(questionId);
        }
    }

    console.log(answered, unanswered)

    return {
        answered,
        unanswered
    }
}

export default connect(mapStateToProps)(Home);