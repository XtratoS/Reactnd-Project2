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
        const selectedStyle = 'btn-teal';
        const notSelectedStyle = 'btn-outline-teal';
        return (
            <div className="text-center my-4 small-container">
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
                    {this.props[this.state.visibleSection].map((id) => {
                        return (
                            <MiniQuestion
                                key={id}
                                id={id}
                            />
                        )
                    })}
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
            answered.push(questionId);
        } else {
            unanswered.push(questionId);
        }
    }

    return {
        answered,
        unanswered
    }
}

export default connect(mapStateToProps)(Home);