module.exports = (app, passport) => {
    const routes = require('express').Router();
    const api = require('./api');
    const dashboard = require('./dashboard');
    const twilio = require('./twilio');
    const path = require('path');

    routes.use('/api', api(app));
    routes.use('/dashboard', dashboard(app, passport));
    routes.use('/twilio', twilio(app));

    if (app.get('env') === 'production') {
        // Direct all unhandled requests to React client
        routes.get('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/../client/build/index.html'));
        });
    }

    return routes;
};