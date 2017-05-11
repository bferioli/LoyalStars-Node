const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {

    const SubscriptionsByLocationController = (req, res) => {

        app.SubscriptionModel.getByLocation(req.params.locationId)
            .then( (subscriptions) => {
                res.json(subscriptions);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return SubscriptionsByLocationController;
};
