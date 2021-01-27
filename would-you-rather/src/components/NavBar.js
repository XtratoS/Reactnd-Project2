import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../actions/loggedInUser';

class NavBar extends Component {
    state = {
        nameHidden: true
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    showName = () => {
        this.setState({nameHidden: false});
    }

    hideName = () => {
        this.setState({nameHidden: true});
    }

    render() {
        const { loggedInUser } = this.props
        return (
            <Fragment>
            <div className="sidebar-name-label" style={{
                opacity: this.state.nameHidden ? 0 : 1,
                visibility: this.state.nameHidden ? 'hidden' : 'visible'
            }}>{loggedInUser ? loggedInUser.name : "Not logged in"}</div>
            <nav className="side-nav">
                <div className="sidebar-nav-link nav-link logout-btn"
                    onMouseEnter={this.showName}
                    onMouseLeave={this.hideName}
                >
                    {loggedInUser ? <img
                        className="side-nav-item"
                        src={loggedInUser.avatarURL}
                        alt={loggedInUser.id}
                    /> : <div className="side-nav-item dummy"></div>}
                </div>
                <NavLink className="sidebar-nav-link nav-link" exact to="/" activeClassName="active">
                    <div className="side-nav-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Home">
                        <i className="fa fa-home fa-15x"></i>
                    </div>
                </NavLink>
                <NavLink className="sidebar-nav-link nav-link" exact to="/new" activeClassName="active">
                    <div
                        className="side-nav-item"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Add New Question"
                    >
                        <i className="fa fa-plus-square fa-15x"></i>
                    </div>
                </NavLink>
                <NavLink className="sidebar-nav-link nav-link" exact to="/leaderboard" activeClassName="active">
                    <div className="side-nav-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Leaderboard">
                        <i className="fa fa-trophy fa-15x"></i>
                    </div>
                </NavLink>
                {loggedInUser &&
                    (<div className="sidebar-nav-link nav-link logout-btn"
                        onClick={(e) => {this.props.dispatch(logout())}}
                    >
                        <div
                            className="side-nav-item text-danger"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Log Out"
                        >
                            <i className="fa fa-sign-out-alt fa-15x"></i>
                        </div>
                    </div>)
                }
            </nav></Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.users[state.loggedInUser]
    }
}

export default connect(mapStateToProps)(NavBar)
