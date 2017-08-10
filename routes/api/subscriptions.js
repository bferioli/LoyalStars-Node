module.exports = (app, passport) => {
    const subscriptions = require('express').Router();

    // Reward query routes

    const SubscriptionsByLocationController = require('../../controllers/api/subscriptions/subscriptionsByLocation')(app);
    const CreateSubscriptionController = require('../../controllers/api/subscriptions/createSubscription')(app);

    subscriptions.get("/:locationId", passport.authenticate('jwt-verify'), SubscriptionsByLocationController);
    subscriptions.post("/:locationId/:planId", passport.authenticate('jwt-verify'), CreateSubscriptionController);

    return subscriptions;
};