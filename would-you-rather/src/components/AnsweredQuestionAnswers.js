import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';

class AnsweredQuestionAnswers extends Component {
    render() {
        const { question, answer } = this.props;
        const optionOneVotes = question.optionOne.votes.length;
        const optionTwoVotes = question.optionTwo.votes.length;
        const optionOneVotesPercentage = Math.round( (optionOneVotes / (optionOneVotes + optionTwoVotes)) * 1000) / 10;
        const optionTwoVotesPercentage = Math.round( (optionTwoVotes / (optionOneVotes + optionTwoVotes)) * 1000) / 10;
        return (
            <Fragment>
                <div className="h5 mb-3">Result:</div>
                <div className="row g-0 mt-2">
                    <div className={"mb-2 col-12 question-answer answered " + (answer === "optionOne" ? "answer-selected-light" : "")}>
                        <div className="text-start fw-bold">{question.optionOne.text}</div>
                        <ProgressBar progress={optionOneVotesPercentage}/>
                        <div className="small"> {optionOneVotes} vote{optionOneVotes === 1 || 's'} </div>
                    </div>
                    <div className={"col-12 question-answer answered " + (answer === "optionTwo" ? "answer-selected-light" : "")}>
                        <div className="text-start fw-bold">{question.optionTwo.text}</div>
                        <ProgressBar progress={optionTwoVotesPercentage}/>
                        <div className="small"> {optionTwoVotes} vote{optionTwoVotes === 1 || 's'} </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const question = state.questions[ownProps.id];
    const user = state.users[state.loggedInUser];
    const answer = question ? user.answers[question.id] ? user.answers[question.id] : null : null;
    return {
        question,
        answer
    };
}

export default connect(mapStateToProps)(AnsweredQuestionAnswers);
