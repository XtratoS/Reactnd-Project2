import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';

export class NewQuestion extends Component {
    state = {
        error: null,
        text: '',
        hint: '',
        optionOne: '',
        optionTwo: '',
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    submitQuestion = () => {
        const { hint, optionOne, optionTwo } = this.state;
        if (hint === '' || optionOne === '' || optionTwo === '') {
            this.setState({error: "Please fill in all the fields"});
        } else {
            const { dispatch, loggedInUser, history } = this.props
            dispatch(handleAddQuestion({
                hint,
                optionOneText: optionOne,
                optionTwoText: optionTwo,
                author: loggedInUser,
            }, ()=>{history.push("/");}));
        }
    }

    render() {
        const { error, hint, optionOne, optionTwo } = this.state;
        return (
            <div className="text-center my-4 small-container">
                {error && (<div className="alert alert-danger p-1">{error}</div>)}
                <div className="m-2">
                    <div className="h3 m-3">Would you rather</div>
                    <div className="input-group">
                        <textarea
                            name="optionOne"
                            value={optionOne}
                            className="form-control m-2"
                            type="text"
                            placeholder="First Option"
                            onChange={(e) => {this.handleInputChange(e)}}
                        />
                        <div className="d-flex align-items-center">
                            OR
                        </div>
                        <textarea
                            name="optionTwo"
                            value={optionTwo}
                            className="form-control m-2"
                            type="text"
                            placeholder="Second Option"
                            onChange={(e) => {this.handleInputChange(e)}}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            name="hint"
                            value={hint}
                            className="form-control m-2"
                            type="text"
                            placeholder="Hint"
                            onChange={(e) => {this.handleInputChange(e)}}
                            maxLength={12}
                        />
                    </div>
                    <button
                        className="m-2 btn btn-success"
                        onClick={this.submitQuestion}
                    >
                        Submit Question
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps({loggedInUser}) {
    return {
        loggedInUser
    }
}

export default connect(mapStateToProps)(NewQuestion);