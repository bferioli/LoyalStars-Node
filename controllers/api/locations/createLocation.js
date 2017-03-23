const ErrorHelpers = require('../../../helpers/error.js');

module.exports = (app) => {
    const CreateLocationController = (req, res) => {

        const model = new app.LocationModel(req.body);

        app.CompanyModel.getById(req.params.companyId)
            .then( (company) => {
                model.set({company: company._id});
                return app.LocationModel.savePromise(model);
            })
            .then( (location) => {
                res.json(location);
            })
            .catch(ErrorHelpers.notFound(res));
    };

    return CreateLocationController;
};
