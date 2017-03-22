const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CompaniesRoute = (req, res) => {

        app.CompanyModel.getAll()
            .then( (companies) => {
                res.json(companies);
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return CompaniesRoute;
};
