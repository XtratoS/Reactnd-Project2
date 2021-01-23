import React, { Component, Fragment } from 'react'
import MiniQuestion from './MiniQuestion'

export class QuestionsList extends Component {
    render() {
        return (
            <Fragment>
                {this.props.questions.map((id) => {
                    return (
                        <MiniQuestion
                            key={id}
                            id={id}
                        />
                    )
                })}
            </Fragment>
        )
    }
}

export default QuestionsList;