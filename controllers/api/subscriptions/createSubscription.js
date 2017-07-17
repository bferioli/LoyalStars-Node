const ErrorHelpers = require('../../../helpers/error.js');
const StripeHelpers = require('../../../helpers/stripe.js');

module.exports = (app) => {
    const CreateSubscriptionController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        let redirUrl;
        const model = new app.SubscriptionModel();

        app.LocationModel.getById(req.params.locationId)
            .then( (location) => {
                if (!req.user.superUser && !location.company.adminUser.equals(req.user._id))
                    return Promise.reject('You are not an admin for this company.');

                redirUrl = `/dashboard/company/${location.company.slug}`;
                model.set({ company: location.company._id, location: location._id, name: req.params.planId });
                return StripeHelpers.subscribeNewCustomer({ email: req.body.stripeEmail, source: req.body.stripeToken, plan: req.params.planId });
            })
            .then( (customer) => {
                model.set({ stripeCustomerID: customer.id });
                return app.SubscriptionModel.savePromise(model);
            })
            .then( (subscription) => {
                return app.LocationModel.updateById(req.params.locationId, { subscription: subscription._id }, req.user);
            })
            .then( () => {
                res.redirect(redirUrl);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CreateSubscriptionController;
};
