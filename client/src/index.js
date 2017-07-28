import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './index.css';
import App from './components/App';
import Checkin from './components/Checkin';
import Login from './components/Login';
import Reward from './components/Reward';
import Signup from './components/Signup';
import registerServiceWorker from './registerServiceWorker';

render((
    <Router>
        <App>
            <Route path="/checkin" component={Checkin} />
            <Route path="/login" component={Login} />
            <Route path="/reward" component={Reward} />
            <Route path="/signup" component={Signup} />
        </App>
    </Router>
), document.getElementById('root'));
registerServiceWorker();
