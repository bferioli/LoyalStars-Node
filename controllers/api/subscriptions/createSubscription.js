const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CreateSubscriptionController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.LocationModel.getById(req.params.locationId)
            .then( (location) => {
                if (!req.user.superUser && !location.company.adminUser.equals(req.user._id))
                    return Promise.reject('You are not an admin for this company.');

                // Create stripe customer and subscription

                const model = new app.SubscriptionModel(req.body);
                model.set({ company: location.company._id, location: location._id, name: req.params.planId });
                return app.SubscriptionModel.savePromise(model);
            })
            .then( (subscription) => {
                res.json(subscription);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CreateSubscriptionController;
};
