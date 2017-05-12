const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const UpdateCompanyController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        app.CompanyModel.updateById(req.params.companyId, req.body, req.user)
            .then( (company) => {
                res.json(company);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return UpdateCompanyController;
};
