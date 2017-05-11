const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const UpdateCompanyController = (req, res) => {

        app.CompanyModel.updateById(req.params.companyId, req.body, req.user)
            .then( (company) => {
                res.json(company);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return UpdateCompanyController;
};
