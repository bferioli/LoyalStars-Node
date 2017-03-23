const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const UpdateCompanyRoute = (req, res) => {

        app.CompanyModel.updateById(req.params.companyId, req.body)
            .then( (company) => {
                res.json(company);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return UpdateCompanyRoute;
};
