module.exports = (app) => {
    const subscriptions = require('express').Router();

    // Reward query routes

    const SubscriptionsByLocationController = require('../../controllers/api/subscriptions/subscriptionsByLocation')(app);
    const CreateSubscriptionController = require('../../controllers/api/subscriptions/createSubscription')(app);

    subscriptions.get("/:locationId", SubscriptionsByLocationController);
    subscriptions.post("/:locationId/:planId", CreateSubscriptionController);

    return subscriptions;
};