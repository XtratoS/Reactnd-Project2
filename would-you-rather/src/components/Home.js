import React, { Component } from 'react';
import { connect } from 'react-redux';
import MiniQuestion from './MiniQuestion';

class Home extends Component {
    render() {
        const { answered, unanswered } = this.props
        return (
            <div className="text-center small-container p-2">
                <ul className="nav nav-pills nav-questions" id="questions" role="tablist">
                    <li className="nav-item col-4 me-1" role="presentation">
                        <a className="nav-link-success active" id="unanswered-tab" data-bs-toggle="tab" href="#unanswered" role="tab" aria-controls="unanswered" aria-selected="true">Unanswered</a>
                    </li>
                    <li className="nav-item col-4 ms-1" role="presentation">
                        <a className="nav-link-success" id="answered-tab" data-bs-toggle="tab" href="#answered" role="tab" aria-controls="answered" aria-selected="false">Answered</a>
                    </li>
                </ul>
                <div className="tab-content" id="questionsContent">
                    <div className="tab-pane fade show active" id="unanswered" role="tabpanel" aria-labelledby="unanswered-tab">
                        {(unanswered.length > 0 && unanswered.map((id) => {
                            return (
                                <MiniQuestion
                                    key={id}
                                    id={id}
                                />
                            )
                        })) ||
                        <div className="m-4">No questions to show...</div>
                        }
                    </div>
                    <div className="tab-pane fade" id="answered" role="tabpanel" aria-labelledby="answered-tab">
                        {(answered.length > 0 && answered.map((id) => {
                            return (
                                <MiniQuestion
                                    key={id}
                                    id={id}
                                />
                            )
                        })) ||
                        <div className="mt-2 mb-4">No questions to show...</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({loggedInUser, questions}) {
    let unanswered = [];
    let answered = [];

    for (let questionId in questions) {
        let question = questions[questionId];

        if ( ([...question.optionOne.votes, ...question.optionTwo.votes].includes(loggedInUser)) === false ) {
            unanswered.push(questionId);
        } else {
            answered.push(questionId);
        }
    }

    const sortQuestions = (a, b) => (
        questions[b].timestamp - questions[a].timestamp
    )

    return {
        answered: answered.sort(sortQuestions),
        unanswered: unanswered.sort(sortQuestions)
    }
}

export default connect(mapStateToProps)(Home);