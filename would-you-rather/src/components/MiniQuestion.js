import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timestampToText } from '../utils/helpers';

class MiniQuestion extends Component {
    render() {
        const { question, author } = this.props;
        return (
            <div className="question row m-2">
                <div className="col-4 m-auto question-extradata">
                    <div className="author">{author.name}</div>
                    <div className="avatar">
                        <img
                            src={author.avatarURL}
                            alt="avatar"
                            className="avatar-image"
                        />
                    </div>
                    <div className="date">{timestampToText(question.timestamp)}</div>
                </div>
                <div className="col-8 m-auto">
                    <div className="h5 m-0">Would You Rather?</div>
                    <div className="hint">{question.hint || ''}</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        question: state.questions[ownProps.id],
        author: state.users[state.questions[ownProps.id].author]
    };
}

export default connect(mapStateToProps)(MiniQuestion);