const ErrorHelpers = require('../../helpers/error.js');

module.exports = (app, passport) => {
    const DashboardIndexController = (req, res) => {

        if (!req.user)
            Promise.reject(ErrorHelpers.notFound(res));

        app.CompanyModel.getAll(req.user)
            .then( (companies) => {
                res.render('dashboard/index', { companies, stripeKey: process.env.STRIPE_PUBLIC_KEY });
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return DashboardIndexController;
};