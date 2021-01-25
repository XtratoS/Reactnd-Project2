import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/shared'
import { timestampToText } from '../utils/helpers'
import ProgressBar from './ProgressBar'

class Question extends Component {
    state = {
        selectedOption: null
    }

    selectOption = (option) => {
        this.setState({selectedOption: option})
    }

    submitAnswer = () => {
        this.props.dispatch(handleAddAnswer({
            userId: this.props.loggedInUser,
            questionId: this.props.question.id,
            answer: this.state.selectedOption,
        }));
    }

    render() {
        const { question, answer, author } = this.props;
        const { selectedOption } = this.state;
        const optionOneVotes = question.optionOne.votes.length;
        const optionTwoVotes = question.optionTwo.votes.length;
        const optionOneVotesPercentage = Math.round( (optionOneVotes / (optionOneVotes + optionTwoVotes)) * 100);
        const optionTwoVotesPercentage = Math.round( (optionTwoVotes / (optionOneVotes + optionTwoVotes)) * 100);
        if (question) {
            return (
                <div className="row g-0 text-center my-4 p-3 small-container">
                    <div className="col-4 border-end border-2 pe-3 d-flex flex-column justify-content-between">
                        <div className="border border-2 rounded-top">Author</div>
                        <div className="author fw-bold">{author.name}</div>
                        <div className="text-center"><img src={author.avatarURL} alt="avatar" className="large-avatar-image" /></div>
                        <div className="date">{timestampToText(question.timestamp)}</div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-7">
                        {answer ? <Fragment>
                            <div className="h4 mb-2">Result:</div>
                            <div className="row g-0 mt-2">
                                <div className={"mb-2 col-12 answered-question-answer " + (answer === "optionOne" ? "answer-selected-light" : "")}>
                                    <div>{question.optionOne.text}</div>
                                    <div className="row g-0 m-0">
                                        <div className="col-8 ps-4 text-start">Votes:</div>
                                        <div className="col-4 m-0 ps-2">{question.optionOne.votes.length}</div>
                                    </div>
                                    <ProgressBar progress={optionOneVotesPercentage}/>
                                </div>
                                <div className={"col-12 answered-question-answer " + (answer === "optionTwo" ? "answer-selected-light" : "")}>
                                    <div>{question.optionTwo.text}</div>
                                    <div className="row g-0 m-0">
                                        <div className="col-8 ps-4 text-start">Votes:</div>
                                        <div className="col-4 m-0 ps-2">{question.optionTwo.votes.length}</div>
                                    </div>
                                    <ProgressBar progress={optionTwoVotesPercentage}/>
                                </div>
                            </div>
                        </Fragment> : <Fragment>
                            <div className="h4 mb-2">Would You Rather...</div>
                            <div className="row g-0 mt-2">
                                <div onClick={() => {this.selectOption("optionOne")}} className={"col-12 unanswered-question-answer p-2" + (selectedOption === "optionOne" ? " answer-selected" : "")}>{question.optionOne.text}</div>
                                <div className="my-2">OR</div>
                                <div onClick={() => {this.selectOption("optionTwo")}} className={"col-12 unanswered-question-answer p-2" + (selectedOption === "optionTwo" ? " answer-selected" : "")}>{question.optionTwo.text}</div>
                            </div>
                            <button
                                className={"mt-3 btn btn-success m-auto" + (selectedOption || " disabled")}
                                onClick={this.submitAnswer}
                            >
                                Submit
                            </button>
                        </Fragment>}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row g-0 text-center my-4 p-3 small-container">
                    <div className="mt-2 mb-4">Question not found...</div>
                </div>
            )
        }
    }
}

function mapStateToProps(state, ownProps) {
    const question = ownProps.match && ownProps.match.params ?
        state.questions[ownProps.match.params.id] :
        null
    const user = state.users[state.loggedInUser];
    const answer = question ? user.answers[question.id] ? user.answers[question.id] : null : null;
    const author = question ? state.users[question.author] : null;
    return {
        loggedInUser: state.loggedInUser,
        question: question,
        answer,
        author
    };
}

export default connect(mapStateToProps)(Question);