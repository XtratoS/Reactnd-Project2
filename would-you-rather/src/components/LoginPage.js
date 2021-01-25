import React, { Component } from 'react';
import CreateUser from './CreateUser';
import LoginUser from './LoginUser';

class LoginPage extends Component {
    render() {
        return (
            <div className="text-center my-4 small-container">
                <LoginUser />
                <div className="m-1">
                    OR<hr className="my-1" />
                </div>
                <CreateUser />
            </div>
        )
    }
}

export default LoginPage;