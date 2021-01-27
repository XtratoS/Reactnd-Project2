import React, { Component } from 'react'
import { connect } from 'react-redux'
import { timestampToText } from '../utils/helpers'
import AnsweredQuestionAnswers from './AnsweredQuestionAnswers'
import UnansweredQuestionAnswers from './UnansweredQuestionAnswers'

class Question extends Component {
    render() {
        const { question, answer, author } = this.props;
        if (question) {
            return (
                <div className="row g-0 text-center p-2 small-container">
                    <div className="question-full-start">
                        <div className="author fw-bold">{author.name}</div>
                        <div className="text-center"><img src={author.avatarURL} alt="avatar" className="large-avatar-image" /></div>
                        <div className="date">{timestampToText(question.timestamp)}</div>
                    </div>
                    <div className="col-7">
                        {answer ? 
                        <AnsweredQuestionAnswers id={question.id} /> : 
                        <UnansweredQuestionAnswers id={question.id} />}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row g-0 text-center my-4 p-3 small-container">
                    <div className="my-4">404, Question not found...</div>
                </div>
            )
        }
    }
}

function mapStateToProps(state, ownProps) {
    const question = ownProps.match && ownProps.match.params ?
        state.questions[ownProps.match.params.id] :
        null;
    const user = state.users[state.loggedInUser];
    const answer = question ? user.answers[question.id] ? user.answers[question.id] : null : null;
    const author = question ? state.users[question.author] : null;
    return {
        question: question,
        answer,
        author
    };
}

export default connect(mapStateToProps)(Question);