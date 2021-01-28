import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home';
import { handleInitialData } from '../actions/shared';
import LoadingBar from 'react-redux-loading';
import NavBar from './NavBar';
import LoginPage from './LoginPage';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import Question from './Question';

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const { loaded, loggedInUser } = this.props
        return (
            <Router>
                <LoadingBar style={{position: "fixed", height: "5px", zIndex: 999}} />
                <NavBar />
                {(loaded && <div className="mx-128 py-4">
                    {(loggedInUser &&
                    <Fragment>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/add" component={NewQuestion} />
                        <Route exact path="/leaderboard" component={Leaderboard} />
                        <Route exact path="/questions/:id" component={Question} />
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