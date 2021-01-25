import React, { Component } from 'react'

export class LeaderboardRow extends Component {
    render() {
        const { user } = this.props
        console.log(this.props)
        return (
            <div className="row m-3 border border-secondary rounded">
                <div className="col-3 p-2 border-end border-2 border-secondary">
                    <div className="pos">
                        #{user.pos}
                    </div>
                    <img
                        src={user.avatarURL}
                        alt="avatar"
                        className="large-avatar-image m-auto"
                    />
                </div>
                <div className="col-6 lb-row-mid border-end border-2 border-secondary">
                    <div className="fw-bold h5 m-0 mt-1">{user.name}</div>
                    <div className="row m-0">
                        <div className="col-8 m-0 p-0 text-start">
                            Asked:
                        </div>
                        <div className="col-4 m-0 ps-2 text-start">
                            {user.asked}
                        </div>
                    </div>
                    <div className="row m-0">
                        <div className="col-8 m-0 p-0 text-start">
                            Answered:
                        </div>
                        <div className="col-4 m-0 ps-2 text-start">
                            {user.answered}
                        </div>
                    </div>
                </div>
                <div className="col-3 lb-row-end">
                    <div className="fw-bold border rounded">
                        <div className="border rounded-top">
                            Points
                        </div>
                        <div className="border rounded-bottom p-2">
                            <div className="rounded-circle m-auto square pts">
                                {user.total}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LeaderboardRow
