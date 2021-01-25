import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleAddUser } from '../actions/users';

export class CreateUser extends Component {
    state = {
        registerationError: null,
        newUserId: '',
        newUserName: '',
        newAvatarURL: '',
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
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
        const { registerationError, newUserId, newUserName, newAvatarURL } = this.state;
        return (
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
        )
    }
}

function mapStateToProps(state) {
    const { users } = state;
    let userIds = [];
    let userNames = [];
    for (let userId in users) {
        let user = users[userId]
        userIds.push(userId);
        userNames.push(user.name.toLowerCase().replace(/\s+/g, ''));
    }
    return {
        userIds,
        userNames
    }
}

export default connect(mapStateToProps)(CreateUser);
