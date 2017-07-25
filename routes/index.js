module.exports = (app, passport) => {
    const routes = require('express').Router();
    const api = require('./api');
    const dashboard = require('./dashboard');
    const twilio = require('./twilio');
    const express = require('express');

    routes.use('/api', api(app));
    routes.use('/dashboard', dashboard(app, passport));
    routes.use('/twilio', twilio(app));

    if (app.get('env') === 'production') {
        // Direct all unhandled requests to React client
        routes.use(express.static('client/build'));
    }

    return routes;
};