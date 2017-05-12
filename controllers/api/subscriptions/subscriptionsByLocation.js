const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const SubscriptionsByLocationController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.SubscriptionModel.getByLocation(req.params.locationId, req.user)
            .then( (subscriptions) => {
                res.json(subscriptions);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return SubscriptionsByLocationController;
};
