const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CompaniesController = (req, res) => {

        app.CompanyModel.getAll()
            .then( (companies) => {
                res.json(companies);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CompaniesController;
};
