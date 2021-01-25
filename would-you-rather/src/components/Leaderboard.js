import React, { Component } from 'react'
import { connect } from 'react-redux'
import LeaderboardRow from './LeaderboardRow'

export class Leaderboard extends Component {
    render() {
        const { users } = this.props
        return (
            <div className="small-container my-4">
                <div className="h3 m-3 text-center">Leaderboard</div>
                {users.map((user) => (
                    <LeaderboardRow
                        key={user.id}
                        user={user}
                    />
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
    let usersPoints = [];
    for (let userId in state.users) {
        const user = state.users[userId]
        const asked = user.questions.length;
        const answered = Object.keys(user.answers).length;
        let userPoints = {
            id: userId,
            name: user.name,
            avatarURL: user.avatarURL,
            asked,
            answered,
            total: asked + answered
        }
        usersPoints.push(userPoints);
    }
    usersPoints.sort((a, b) => b.total - a.total);
    let pos = 1;
    let lastP = 0;
    usersPoints = usersPoints.map((user) => {
        if (user.total < lastP) {
            pos++;
        }
        lastP = user.total
        return {
            ...user, pos
        }
    })
    return {users: usersPoints};
}

export default connect(mapStateToProps)(Leaderboard);
