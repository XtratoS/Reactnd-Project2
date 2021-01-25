import React, { Component } from 'react';
import { connect } from 'react-redux';
import MiniQuestion from './MiniQuestion';

export class Home extends Component {
    state = {
        show: 'show',
        visibleSection: 'unanswered'
    }

    switchSection(section) {
        if (section !== this.state.visibleSection) {
            this.setState({show: ''}, () => {
                setTimeout(() => {
                    this.setState({visibleSection: section}, () => {
                        setTimeout(() => {
                            this.setState({show: 'show'});
                        }, 150);
                    });
                }, 150);
            });
        }
    }

    render() {

        const selected = this.state.visibleSection;
        const selectedStyle = 'btn-success';
        const notSelectedStyle = 'btn-outline-success';
        const visibleQuestions = this.props[this.state.visibleSection];
        return (
            <div className="text-center small-container my-4">
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
                <div
                    className={`fade ${this.state.show}`}
                >
                    {(visibleQuestions.length > 0 && visibleQuestions.map((id) => {
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