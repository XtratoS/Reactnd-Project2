import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import Home from './Home';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import NavBar from './NavBar';

export class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const { loaded, loggedInUser } = this.props
        return (
            <Router>
                <LoadingBar style={{position: "fixed", zIndex: 5}} />
                <NavBar />
                {loaded && (
                    (loggedInUser && (
                        <div className="container">
                            <Home />
                        </div>))
                    || (
                        <div>
                            LOGIN
                        </div>
                    )
                )}
            </Router>
        )
    }
}

function mapStateToProps({initialized, loggedInUser}) {
    return {
        loaded: initialized,
        loggedInUser
    }
}

export default connect(mapStateToProps)(App);