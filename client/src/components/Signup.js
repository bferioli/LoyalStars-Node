import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AccountForm from './signup/AccountForm';
import LocationForm from './signup/LocationForm';
import RewardForm from './signup/RewardForm';
import SubscriptionForm from './signup/SubscriptionForm';

class Signup extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/signup" component={AccountForm} />
                    <Route path="/signup/location" component={LocationForm} />
                    <Route path="/signup/reward/:locationId" component={RewardForm} />
                    <Route path="/signup/subscription/:locationId" component={SubscriptionForm} />
                </div>
            </Router>
        );
    }
}

export default Signup;
