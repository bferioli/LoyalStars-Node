const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CreateSubscriptionController = (req, res) => {

        const model = new app.SubscriptionModel(req.body);

        // Create stripe customer and subscription

        app.LocationModel.getById(req.params.locationId)
            .then( (location) => {
                model.set({ location: location._id, name: req.params.planId });
                return app.SubscriptionModel.savePromise(model);
            })
            .then( (subscription) => {
                res.json(subscription);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CreateSubscriptionController;
};
