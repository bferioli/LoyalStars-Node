module.exports = (app) => {
    const api = require('express').Router();
    const checkins = require('./checkins');
    const companies = require('./companies');
    const earnedRewards = require('./earnedRewards');
    const locations = require('./locations');
    const nearby = require('./nearby');
    const rewards = require('./rewards');

    api.use('/checkins', checkins(app));
    api.use('/companies', companies(app));
    api.use('/earned-rewards', earnedRewards(app));
    api.use('/locations', locations(app));
    api.use('/nearby', nearby(app));
    api.use('/rewards', rewards(app));

    return api;
};