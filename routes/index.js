module.exports = (app, passport) => {
    const routes = require('express').Router();
    const api = require('./api');
    const twilio = require('./twilio');
    const express = require('express');
    const path = require('path');

    routes.use('/api', api(app, passport));
    routes.use('/twilio', twilio(app));

    // if (app.get('env') === 'production') {
        // Direct all unhandled requests to React client
        routes.use(express.static(path.join(__dirname + '/../client/build')));
    // }

    return routes;
};