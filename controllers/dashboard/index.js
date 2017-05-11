const ErrorHelpers = require('../../helpers/error.js');

module.exports = (app) => {
    const DashboardIndexController = (req, res) => {

        app.CompanyModel.getAll()
            .then( (companies) => {
                res.render('dashboard/index', { companies, stripeKey: process.env.STRIPE_PUBLIC_KEY });
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return DashboardIndexController;
};