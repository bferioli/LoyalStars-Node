const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CompanyRoute = (req, res) => {

        app.CompanyModel.getById(req.params.companyId)
            .then( (company) => {
                res.json(company);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CompanyRoute;
};
