module.exports = (app) => {
    const routes = require('express').Router();
    const api = require('./api');
    const dashboard = require('./dashboard');
    const twilio = require('./twilio');

    routes.use('/api', api(app));
    routes.use('/dashboard', dashboard(app));
    routes.use('/twilio', twilio(app));

    return routes;
};