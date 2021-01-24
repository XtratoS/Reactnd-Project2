import React, { Component } from 'react'

export class UserLabelOption extends Component {
    render() {
        const { user } = this.props
        return (
            <div className="text-start">
                <img
                    className="small-avatar-image"
                    src={user.avatarURL}
                    alt={user.name}
                />
                <span className="ms-2">{user.name}</span>
            </div>
        )
    }
}

export default UserLabelOption
