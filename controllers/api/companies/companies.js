const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CompaniesController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.CompanyModel.getAll(req.user)
            .then( (companies) => {
                res.json(companies);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CompaniesController;
};
