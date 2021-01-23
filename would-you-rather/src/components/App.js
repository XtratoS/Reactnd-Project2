import React, { Component, Fragment } from 'react';
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
        return (
            <Router>
                <LoadingBar style={{position: "fixed", zIndex: 5}} />
                <NavBar />
                {this.props.loaded &&
                    <div className="container">
                        <Home />
                    </div>
                }
            </Router>
        )
    }
}

function mapStateToProps({initialized}) {
    return {
        loaded: initialized
    }
}

export default connect(mapStateToProps)(App);