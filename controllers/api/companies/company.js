const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CompanyController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.CompanyModel.getById(req.params.companyId, req.user)
            .then( (company) => {
                res.json(company);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CompanyController;
};
