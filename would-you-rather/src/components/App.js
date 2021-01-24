import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import NavBar from './NavBar';
import LoginPage from './LoginPage';
import NewQuestion from './NewQuestion';

export class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const { loaded, loggedInUser } = this.props
        return (
            <Router>
                <LoadingBar style={{position: "fixed", zIndex: 999}} />
                <NavBar />
                {(loaded && <div className="container py-4">
                    {(loggedInUser &&
                    <Fragment>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/new" component={NewQuestion} />
                        {/* <Route exact path="/leaderboard" component={Leaderboard} /> */}
                    </Fragment>) ||
                        <LoginPage />
                    }
                </div>)}
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