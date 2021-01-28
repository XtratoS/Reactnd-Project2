import React from 'react';

const UserLabelOption = ({ user }) => (
    <div className="text-start">
        <img
            className="small-avatar-image"
            src={user.avatarURL}
            alt={user.name}
        />
        <span className="ms-2">{user.name}</span>
    </div>
)

export default UserLabelOption;