import React, { Component } from 'react'
import { connect } from 'react-redux';
import Select from 'react-select';
import { handleLogin } from '../actions/loggedInUser';
import UserLabelOption from './UserLabelOption';

export class LoginUser extends Component {
    state = {
        selectedId: null,
        loginError: null,
    }

    handleOptionChange = (option) => {
        this.setState({selectedId: option.value});
    }

    submitLogin = () => {
        const { dispatch } = this.props;
        const loginId = this.state.selectedId;
        if (loginId === null) {
            this.setState({error: "Please select a User to login as"})
        } else {
            if (this.props.userIds.includes(loginId)) {
                dispatch(handleLogin(loginId));
            } else {
                this.setState({error: "Invalid User, please select an existing user to login as, or create a new user"})
            }
        }
    }

    render() {
        const { loginUsers } = this.props;
        const { loginError } = this.state;
        return (
            <div className="m-2">
                {loginError && <div className="alert alert-danger p-1">{loginError}</div>}
                <div className="m-3">Login as an existing user:</div>
                <Select
                    className="m-2"
                    placeholder="Choose User..."
                    options={loginUsers}
                    onChange={this.handleOptionChange}
                />
                <button
                    className="m-2 btn btn-success"
                    onClick={this.submitLogin}
                >
                    Login
                </button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { users } = state;
    let loginUsers = [];
    let userIds = [];
    for (let userId in users) {
        let user = users[userId]
        let userLabel = <UserLabelOption user={user} />
        let loginUser = {
            value: user.id,
            label: userLabel
        };
        loginUsers.push(loginUser);
        userIds.push(userId);
    }
    return {
        userIds,
        loginUsers
    }
}

export default connect(mapStateToProps)(LoginUser)
