const ErrorHelpers = require('../../helpers/error.js');

module.exports = (app) => {
    const DashboardIndexController = (req, res) => {

        app.CompanyModel.getAll()
            .then( (companies) => {
                res.render('dashboard/index', { companies });
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return DashboardIndexController;
};