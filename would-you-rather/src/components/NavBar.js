import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../actions/loggedInUser';

export class NavBar extends Component {
    render() {
        return (
            <nav className="side-nav">
                <NavLink className="nav-link" exact to="/" activeClassName="active">
                    <div className="side-nav-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Home">
                        <i className="fa fa-home fa-15x"></i>
                    </div>
                </NavLink>
                <NavLink className="nav-link" exact to="/new" activeClassName="active">
                    <div
                        className="side-nav-item"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Add New Question"
                    >
                        <i className="fa fa-plus-square fa-15x"></i>
                    </div>
                </NavLink>
                <NavLink className="nav-link" exact to="/leaderboard" activeClassName="active">
                    <div className="side-nav-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Leaderboard">
                        <i className="fa fa-trophy fa-15x"></i>
                    </div>
                </NavLink>
                {(this.props.loggedIn === true) &&
                    (<div className="nav-link logout-btn"
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
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedInUser === null ? false : true
    }
}

export default connect(mapStateToProps)(NavBar)
