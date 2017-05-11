const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CreateCompanyController = (req, res) => {

        if (!req.user)
            return ErrorHelpers.notFound(res)('You must be logged in to access this endpoint.');

        const model = new app.CompanyModel(req.body);
        model.adminUser = req.user._id;

        app.CompanyModel.savePromise(model, req.user)
            .then( (company) => {
                res.json(company);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CreateCompanyController;
};
