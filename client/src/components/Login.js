import React, { Component } from 'react';
import rightArrow from '../images/right-arrow.svg';

class Login extends Component {
    render() {
        return (
            <div className="Login">

                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="PIN" />
                <button type="submit"><img src={rightArrow} alt="Submit" /></button>

            </div>
        );
    }
}

export default Login;
