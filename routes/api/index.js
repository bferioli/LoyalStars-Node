module.exports = (app, passport) => {
    const api = require('express').Router();
    const checkins = require('./checkins');
    const companies = require('./companies');
    const earnedRewards = require('./earnedRewards');
    const locations = require('./locations');
    const nearby = require('./nearby');
    const rewards = require('./rewards');
    const subscriptions = require('./subscriptions');

    api.post("/login", passport.authenticate('local-login'), function(req, res) {
        res.json(req.user);
    });

    api.post("/signup", passport.authenticate('local-signup'), function(req, res) {
        res.json(req.user);
    });

    api.use('/checkins', checkins(app));
    api.use('/companies', companies(app));
    api.use('/earned-rewards', earnedRewards(app));
    api.use('/locations', locations(app));
    api.use('/nearby', nearby(app));
    api.use('/rewards', rewards(app));
    api.use('/subscriptions', subscriptions(app));

    return api;
};