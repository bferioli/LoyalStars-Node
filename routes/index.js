module.exports = (app) => {
    const routes = require('express').Router();
    const api = require('./api');
    const twilio = require('./twilio');

    routes.use('/api', api(app));
    routes.use('/twilio', twilio(app));

    return routes;
};