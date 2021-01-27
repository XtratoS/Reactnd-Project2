import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/shared';

export class UnansweredQuestionAnswers extends Component {
    state = {
        selectedOption: null
    }

    selectOption = (option) => {
        this.setState({selectedOption: option})
    }

    submitAnswer = () => {
        const { dispatch, loggedInUser, question } = this.props;
        const { selectedOption } = this.state;
        dispatch(handleAddAnswer({
            userId: loggedInUser,
            questionId: question.id,
            answer: selectedOption,
        }));
    }

    render() {
        const { question } = this.props;
        const { selectedOption } = this.state;
        return (
            <Fragment>
                <div className="h5 mb-3">Would You Rather...</div>
                <div className="row g-0 mt-2">
                    <div onClick={() => {this.selectOption("optionOne")}} className={"col-12 question-answer unanswered p-2" + (selectedOption === "optionOne" ? " answer-selected" : "")}>{question.optionOne.text}</div>
                    <div className="my-2">OR</div>
                    <div onClick={() => {this.selectOption("optionTwo")}} className={"col-12 question-answer unanswered p-2" + (selectedOption === "optionTwo" ? " answer-selected" : "")}>{question.optionTwo.text}</div>
                </div>
                <button
                    className={"mt-3 btn btn-success m-auto" + (selectedOption || " disabled")}
                    onClick={this.submitAnswer}
                >
                    Submit
                </button>
            </Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const question = state.questions[ownProps.id];
    return {
        loggedInUser: state.loggedInUser,
        question,
    };
}

export default connect(mapStateToProps)(UnansweredQuestionAnswers);