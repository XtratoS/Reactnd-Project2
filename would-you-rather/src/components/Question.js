import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
    render() {
        const { question } = this.props
        return (
            <li>
                <h3>Would You Rather?</h3>
                <div className="row">
                    <div className="col">
                        {question.optionOne.text}
                    </div>
                    <div className="col">
                        {question.optionTwo.text}
                    </div>
                </div>
            </li>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        question: state.questions[ownProps.id]
    };
}

export default connect(mapStateToProps)(Question);