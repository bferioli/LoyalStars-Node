const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CreateCompanyRoute = (req, res) => {

        const model = new app.CompanyModel(req.body);

        app.CompanyModel.savePromise(model)
            .then( (company) => {
                res.json(company);
            })
            .catch(ErrorHelpers.notFound(res))
            .done();
    };

    return CreateCompanyRoute;
};
