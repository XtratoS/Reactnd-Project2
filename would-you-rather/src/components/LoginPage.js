import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { handleLogin } from '../actions/loggedInUser';
import { handleAddUser } from '../actions/users';
import UserLabelOption from './UserLabelOption';

export class LoginPage extends Component {
    state = {
        selectedId: null,
        loginError: null,
        registerationError: null,
        newUserId: '',
        newUserName: '',
        newAvatarURL: '',
    }

    handleOptionChange = (option) => {
        this.setState({selectedId: option.value});
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
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

    submitCreateUser = () => {
        const { newUserId, newUserName, newAvatarURL } = this.state;
        const { dispatch, userIds, userNames } = this.props
        if (userIds.includes(newUserId)) {
            this.setState({registerationError: "A user with this ID already exists"});
        } else if (userNames.includes(newUserName)) {
            this.setState({registerationError: "A user with this Name already exists"});
        } else {
            this.setState({
                newUserId: '',
                newUserName: '',
                newAvatarURL: '',
            });
            dispatch(handleAddUser({
                id: newUserId,
                name: newUserName,
                avatarURL: newAvatarURL,
            }));
        }
    }

    render() {
        const { loginUsers } = this.props;
        const { loginError, registerationError, newUserId, newUserName, newAvatarURL } = this.state;
        return (
            <div className="text-center my-4 small-container">
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
                <div className="m-1">
                    OR<hr className="my-1" />
                </div>
                <div className="m-2">
                    {registerationError && <div className="alert alert-danger p-1">{registerationError}</div>}
                    <div className="m-3">Create a new user:</div>
                    <div className="input-group">
                        <input
                            required
                            name="newUserId"
                            value={newUserId}
                            className="form-control m-2"
                            type="text"
                            placeholder="User ID"
                            onChange={(e) => {e.target.value = e.target.value.toLowerCase().replace(/\s+/g, '');this.handleInputChange(e)}}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            required
                            name="newUserName"
                            value={newUserName}
                            className="form-control m-2"
                            type="text"
                            placeholder="User Name"
                            onChange={(e) => {this.handleInputChange(e)}}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            required
                            name="newAvatarURL"
                            value={newAvatarURL}
                            className="form-control m-2"
                            type="url"
                            placeholder="Avatar Image URL"
                            onChange={(e) => {this.handleInputChange(e)}}
                        />
                    </div>
                    <button
                        className="m-2 btn btn-success"
                        onClick={this.submitCreateUser}
                    >
                        Create User
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { users } = state;
    let loginUsers = [];
    let userIds = [];
    let userNames = [];
    for (let userId in users) {
        let user = users[userId]
        let userLabel = <UserLabelOption user={user} />
        let loginUser = {
            value: user.id,
            label: userLabel
        };
        loginUsers.push(loginUser);
        userIds.push(userId);
        userNames.push(user.name.toLowerCase().replace(/\s+/g, ''));
    }
    return {
        userIds,
        userNames,
        loginUsers
    }
}

export default connect(mapStateToProps)(LoginPage);