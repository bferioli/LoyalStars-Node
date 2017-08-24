import React, { Component } from 'react';
import Auth from '../helpers/Auth';

class App extends Component {
    componentWillMount() {
        Auth.checkSession()
            .then( user => this.setState({ user }) );
    }

    render() {
        return (
            <div className="App">

                {this.props.children}
            </div>
        );
    }
}

export default App;
